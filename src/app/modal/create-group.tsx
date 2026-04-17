import { useState, useRef } from "react";
import {
   View,
   TouchableOpacity,
   ScrollView,
   KeyboardAvoidingView,
   Platform,
   TextInput,
   Text,
   Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";

import { Typography } from "@/components/ui/Typography";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCreateGroupMutation } from "@/api/groupApi";
import { createGroupSchema, CreateGroupFormData } from "@/schemas/group.schema";

// ─── Markdown toolbar actions ─────────────────────────────────────────────────

type ToolbarAction = {
   icon: string;
   label: string;
   wrap?: [string, string]; // wrap selection with prefix/suffix
   line?: string; // prepend to line
};

const TOOLBAR: ToolbarAction[] = [
   { icon: "format-bold", label: "Bold", wrap: ["**", "**"] },
   { icon: "format-italic", label: "Italic", wrap: ["_", "_"] },
   { icon: "format-header-1", label: "H1", line: "# " },
   { icon: "format-header-2", label: "H2", line: "## " },
   { icon: "format-list-bulleted", label: "List", line: "- " },
   { icon: "format-list-numbered", label: "Numbered", line: "1. " },
   { icon: "code-tags", label: "Code", wrap: ["`", "`"] },
   { icon: "minus", label: "Divider", line: "\n---\n" },
];

// ─── Markdown preview renderer (simple) ──────────────────────────────────────

const MarkdownPreview = ({ text }: { text: string }) => {
   if (!text.trim()) {
      return (
         <Typography className="text-secondary-400 text-sm italic">
            Nothing to preview yet...
         </Typography>
      );
   }

   const lines = text.split("\n");

   return (
      <View className="gap-1">
         {lines.map((line, i) => {
            if (line.startsWith("# "))
               return (
                  <Text key={i} className="text-on-surface text-xl font-extrabold mt-2">
                     {line.slice(2)}
                  </Text>
               );
            if (line.startsWith("## "))
               return (
                  <Text key={i} className="text-on-surface text-lg font-bold mt-1">
                     {line.slice(3)}
                  </Text>
               );
            if (line.startsWith("- "))
               return (
                  <View key={i} className="flex-row items-start gap-2">
                     <Text className="text-primary mt-1">•</Text>
                     <Text className="text-secondary-100 text-sm flex-1">{line.slice(2)}</Text>
                  </View>
               );
            if (/^\d+\.\s/.test(line)) {
               const match = line.match(/^(\d+)\.\s(.*)$/);
               return (
                  <View key={i} className="flex-row items-start gap-2">
                     <Text className="text-primary text-sm font-bold">{match?.[1]}.</Text>
                     <Text className="text-secondary-100 text-sm flex-1">{match?.[2]}</Text>
                  </View>
               );
            }
            if (line === "---") return <View key={i} className="h-px bg-outline/30 my-2" />;
            if (!line.trim()) return <View key={i} className="h-2" />;

            // inline bold/italic/code
            const rendered = line
               .replace(/\*\*(.*?)\*\*/g, "**$1**")
               .replace(/_(.*?)_/g, "_$1_")
               .replace(/`(.*?)`/g, "`$1`");

            return (
               <Text key={i} className="text-secondary-100 text-sm leading-relaxed">
                  {line}
               </Text>
            );
         })}
      </View>
   );
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function CreateGroupModal() {
   const router = useRouter();
   const [createGroup, { isLoading }] = useCreateGroupMutation();
   const [descTab, setDescTab] = useState<"write" | "preview">("write");
   const descRef = useRef<TextInput>(null);
   const [selection, setSelection] = useState({ start: 0, end: 0 });
   const [groupPhoto, setGroupPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);

   const {
      control,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
   } = useForm<CreateGroupFormData>({
      resolver: yupResolver(createGroupSchema),
      defaultValues: { name: "", description: "", location: "" },
   });

   const descValue = watch("description") || "";

   const handlePickGroupPhoto = async () => {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
         Toast.error("Permission to access photos is required");
         return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [1, 1],
         quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
         setGroupPhoto(result.assets[0]);
      }
   };

   const applyToolbar = (action: ToolbarAction) => {
      const { start, end } = selection;
      const selected = descValue.slice(start, end);

      let newText = descValue;
      let newCursor = end;

      if (action.wrap) {
         const [pre, suf] = action.wrap;
         const replacement = `${pre}${selected || "text"}${suf}`;
         newText = descValue.slice(0, start) + replacement + descValue.slice(end);
         newCursor = start + replacement.length;
      } else if (action.line) {
         const lineStart = descValue.lastIndexOf("\n", start - 1) + 1;
         newText = descValue.slice(0, lineStart) + action.line + descValue.slice(lineStart);
         newCursor = start + action.line.length;
      }

      setValue("description", newText, { shouldDirty: true });
      setTimeout(() => descRef.current?.focus(), 50);
   };

   const onSubmit = async (data: CreateGroupFormData) => {
      try {
         const formData = new FormData();
         formData.append("name", data.name);
         if (data.description) formData.append("description", data.description);
         if (data.location) formData.append("location", data.location);

         if (groupPhoto) {
            const filename = groupPhoto.uri.split("/").pop() ?? "photo.jpg";
            const ext = filename.split(".").pop() ?? "jpg";
            formData.append("photo", {
               uri: groupPhoto.uri,
               name: filename,
               type: `image/${ext}`,
            } as any);
         }

         await createGroup(formData).unwrap();
         Toast.success("Group created successfully!");
         router.back();
      } catch (error: any) {
         Toast.error(error?.data?.message || "Failed to create group");
      }
   };

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         className="flex-1 bg-background"
      >
         <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 48 }}
            keyboardShouldPersistTaps="handled"
         >
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pt-14 pb-6 border-b border-outline/10">
               <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.7}
                  className="w-10 h-10 rounded-full bg-surface items-center justify-center active:scale-90"
               >
                  <MaterialCommunityIcons name="arrow-left" size={22} color="#F8FAFC" />
               </TouchableOpacity>
               <View className="items-center">
                  <Typography className="text-on-surface text-lg font-extrabold tracking-tight">
                     Create Group
                  </Typography>
                  <Typography className="text-secondary-400 text-[10px] uppercase tracking-widest font-bold">
                     New meal group
                  </Typography>
               </View>
               <View className="w-10" />
            </View>

            <View className="px-6 pt-8 gap-1">
               {/* Group Name */}
               <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <Input
                        label="Group Name"
                        placeholder="e.g. Bachelor House"
                        autoCorrect={false}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.name?.message}
                        leftIcon={
                           <MaterialCommunityIcons
                              name="account-group-outline"
                              size={20}
                              color="#94A3B8"
                           />
                        }
                     />
                  )}
               />

               {/* Location */}
               <Controller
                  control={control}
                  name="location"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <Input
                        label="Location"
                        placeholder="e.g. Dhaka, Bangladesh"
                        autoCorrect={false}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.location?.message}
                        leftIcon={
                           <MaterialCommunityIcons
                              name="map-marker-outline"
                              size={20}
                              color="#94A3B8"
                           />
                        }
                     />
                  )}
               />

               {/* Group Photo */}
               <View className="mb-5">
                  <Text className="text-primary text-[11px] uppercase tracking-widest font-bold mb-2 ml-1">
                     Group Photo
                  </Text>
                  <TouchableOpacity
                     onPress={handlePickGroupPhoto}
                     activeOpacity={0.8}
                     className="flex-row items-center gap-4 bg-surface-container border border-outline/20 rounded-2xl px-4 py-4 active:scale-[0.99]"
                  >
                     {/* Preview or placeholder */}
                     <View className="w-16 h-16 rounded-xl overflow-hidden bg-surface border border-outline/20 items-center justify-center">
                        {groupPhoto ? (
                           <Image
                              source={{ uri: groupPhoto.uri }}
                              className="w-full h-full"
                              resizeMode="cover"
                           />
                        ) : (
                           <MaterialCommunityIcons name="image-plus" size={28} color="#334155" />
                        )}
                     </View>
                     <View className="flex-1">
                        <Typography className="text-on-surface font-semibold text-[15px]">
                           {groupPhoto ? "Photo selected" : "Choose a photo"}
                        </Typography>
                        <Typography className="text-secondary-400 text-xs mt-0.5">
                           {groupPhoto
                              ? groupPhoto.uri.split("/").pop()
                              : "Tap to pick from gallery"}
                        </Typography>
                     </View>
                     {groupPhoto ? (
                        <TouchableOpacity
                           onPress={() => setGroupPhoto(null)}
                           hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                           <MaterialCommunityIcons name="close-circle" size={20} color="#EF4444" />
                        </TouchableOpacity>
                     ) : (
                        <MaterialCommunityIcons name="chevron-right" size={20} color="#334155" />
                     )}
                  </TouchableOpacity>
               </View>

               {/* Description — Markdown Editor */}
               <View className="mb-5">
                  {/* Label + tab switcher */}
                  <View className="flex-row items-center justify-between mb-2 ml-1">
                     <Text className="text-primary text-[11px] uppercase tracking-widest font-bold">
                        Description
                     </Text>
                     <View className="flex-row bg-surface rounded-xl overflow-hidden border border-outline/20">
                        <TouchableOpacity
                           onPress={() => setDescTab("write")}
                           className={`px-4 py-1.5 ${descTab === "write" ? "bg-primary" : ""}`}
                        >
                           <Typography
                              className={`text-xs font-bold ${descTab === "write" ? "text-background" : "text-secondary-300"}`}
                           >
                              Write
                           </Typography>
                        </TouchableOpacity>
                        <TouchableOpacity
                           onPress={() => setDescTab("preview")}
                           className={`px-4 py-1.5 ${descTab === "preview" ? "bg-primary" : ""}`}
                        >
                           <Typography
                              className={`text-xs font-bold ${descTab === "preview" ? "text-background" : "text-secondary-300"}`}
                           >
                              Preview
                           </Typography>
                        </TouchableOpacity>
                     </View>
                  </View>

                  {descTab === "write" ? (
                     <View className="rounded-2xl border border-outline/20 overflow-hidden bg-surface-container">
                        {/* Toolbar */}
                        <ScrollView
                           horizontal
                           showsHorizontalScrollIndicator={false}
                           className="border-b border-outline/15 bg-surface"
                           contentContainerStyle={{
                              paddingHorizontal: 8,
                              paddingVertical: 6,
                              gap: 4,
                           }}
                        >
                           {TOOLBAR.map((action) => (
                              <TouchableOpacity
                                 key={action.label}
                                 onPress={() => applyToolbar(action)}
                                 activeOpacity={0.7}
                                 className="w-9 h-9 rounded-lg bg-surface-container items-center justify-center active:bg-primary/20"
                              >
                                 <MaterialCommunityIcons
                                    name={action.icon as any}
                                    size={18}
                                    color="#94A3B8"
                                 />
                              </TouchableOpacity>
                           ))}
                        </ScrollView>

                        {/* Text area */}
                        <Controller
                           control={control}
                           name="description"
                           render={({ field: { onChange, onBlur, value } }) => (
                              <TextInput
                                 ref={descRef}
                                 value={value}
                                 onChangeText={onChange}
                                 onBlur={onBlur}
                                 onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
                                 placeholder="Describe your group... supports **bold**, _italic_, # headings, - lists"
                                 placeholderTextColor="#334155"
                                 multiline
                                 textAlignVertical="top"
                                 className="text-on-surface text-sm px-4 py-3 min-h-[140px] font-mono"
                                 style={{
                                    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
                                 }}
                              />
                           )}
                        />

                        {/* Char count */}
                        <View className="flex-row justify-between items-center px-4 py-2 border-t border-outline/10">
                           <Typography className="text-secondary-400 text-[10px]">
                              Markdown supported
                           </Typography>
                           <Typography
                              className={`text-[10px] font-bold ${descValue.length > 450 ? "text-warning" : "text-secondary-400"}`}
                           >
                              {descValue.length}/500
                           </Typography>
                        </View>
                     </View>
                  ) : (
                     <View className="rounded-2xl border border-outline/20 bg-surface-container px-4 py-4 min-h-[180px]">
                        <MarkdownPreview text={descValue} />
                     </View>
                  )}

                  {errors.description && (
                     <Text className="text-error text-xs font-medium mt-1.5 ml-1">
                        {errors.description.message}
                     </Text>
                  )}
               </View>

               {/* Info note */}
               <View className="flex-row items-start gap-3 bg-primary/5 border border-primary/15 rounded-2xl px-4 py-3 mb-6">
                  <MaterialCommunityIcons name="information-outline" size={18} color="#F59E0B" />
                  <Typography className="text-secondary-200 text-xs flex-1 leading-relaxed">
                     An invite code will be auto-generated after creation. Share it with members to
                     let them join.
                  </Typography>
               </View>

               {/* Submit */}
               <Button
                  onPress={handleSubmit(onSubmit)}
                  loading={isLoading}
                  fullWidth
                  size="lg"
                  className="rounded-2xl"
               >
                  Create Group
               </Button>

               <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.7}
                  className="items-center mt-4 py-3"
               >
                  <Typography className="text-secondary-300 font-medium text-sm">Cancel</Typography>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}
