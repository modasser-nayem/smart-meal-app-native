import { useState } from "react";
import {
   View,
   TouchableOpacity,
   Modal,
   KeyboardAvoidingView,
   Platform,
   TextInput,
   ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";
import { Colors } from "@/constants/colors";

export type NoticeType = "primary" | "info" | "success" | "warning";

export interface NewNotice {
   title: string;
   body: string;
   pinColor: NoticeType;
}

interface PostNoticeSheetProps {
   visible: boolean;
   onClose: () => void;
   onSubmit: (notice: NewNotice) => void;
   isLoading?: boolean;
}

const NOTICE_TYPES: {
   key: NoticeType;
   label: string;
   icon: string;
   color: string;
   bg: string;
   description: string;
}[] = [
   {
      key: "primary",
      label: "Announcement",
      icon: "bullhorn-outline",
      color: Colors.icon.primary,
      bg: "bg-primary/10",
      description: "General group update",
   },
   {
      key: "info",
      label: "Info",
      icon: "information-outline",
      color: Colors.icon.info,
      bg: "bg-info/10",
      description: "Informational notice",
   },
   {
      key: "success",
      label: "Update",
      icon: "check-circle-outline",
      color: Colors.icon.success,
      bg: "bg-accent/10",
      description: "Positive update or completion",
   },
   {
      key: "warning",
      label: "Urgent",
      icon: "alert-outline",
      color: Colors.icon.error,
      bg: "bg-error/10",
      description: "Requires immediate attention",
   },
];

export const PostNoticeSheet = ({
   visible,
   onClose,
   onSubmit,
   isLoading = false,
}: PostNoticeSheetProps) => {
   const [title, setTitle] = useState("");
   const [body, setBody] = useState("");
   const [type, setType] = useState<NoticeType>("primary");

   const isValid = title.trim().length > 0 && body.trim().length > 0;

   const handleSubmit = () => {
      if (!isValid) return;
      onSubmit({ title: title.trim(), body: body.trim(), pinColor: type });
      handleClose();
   };

   const handleClose = () => {
      setTitle("");
      setBody("");
      setType("primary");
      onClose();
   };

   const selectedType = NOTICE_TYPES.find((t) => t.key === type)!;

   return (
      <Modal
         visible={visible}
         transparent
         animationType="slide"
         onRequestClose={handleClose}
         statusBarTranslucent
      >
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
         >
            <TouchableOpacity
               className="flex-1 bg-black/60"
               activeOpacity={1}
               onPress={handleClose}
            />

            <View className="bg-surface-container rounded-t-[32px] border-t border-outline/10 max-h-[92%]">
               {/* Handle */}
               <View className="w-10 h-1 rounded-full bg-outline/30 self-center mt-3 mb-1" />

               {/* Header */}
               <View className="flex-row items-center justify-between px-6 py-4 border-b border-outline/10">
                  <View>
                     <Typography className="text-on-surface text-xl font-extrabold tracking-tight">
                        Post Notice
                     </Typography>
                     <Typography className="text-secondary-300 text-xs mt-0.5">
                        Visible to all group members
                     </Typography>
                  </View>
                  <TouchableOpacity
                     onPress={handleClose}
                     className="w-9 h-9 rounded-full bg-surface items-center justify-center active:scale-90"
                  >
                     <MaterialCommunityIcons name="close" size={18} color={Colors.icon.subtle} />
                  </TouchableOpacity>
               </View>

               <ScrollView
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 40 }}
               >
                  <View className="px-6 pt-5 gap-5">
                     {/* Notice type selector */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-3 ml-1">
                           Notice Type
                        </Typography>
                        <View className="flex-row gap-2 flex-wrap">
                           {NOTICE_TYPES.map((t) => {
                              const isSelected = type === t.key;
                              return (
                                 <TouchableOpacity
                                    key={t.key}
                                    onPress={() => setType(t.key)}
                                    activeOpacity={0.8}
                                    className={`flex-row items-center gap-2 px-3 py-2.5 rounded-2xl border ${
                                       isSelected
                                          ? "border-outline/30"
                                          : "border-outline/10 bg-surface"
                                    } ${isSelected ? t.bg : ""}`}
                                 >
                                    <MaterialCommunityIcons
                                       name={t.icon as any}
                                       size={16}
                                       color={isSelected ? t.color : "#64748B"}
                                    />
                                    <Typography
                                       className="text-xs font-bold"
                                       style={{ color: isSelected ? t.color : Colors.icon.subtle }}
                                    >
                                       {t.label}
                                    </Typography>
                                 </TouchableOpacity>
                              );
                           })}
                        </View>
                        <Typography className="text-secondary-400 text-[10px] mt-2 ml-1">
                           {selectedType.description}
                        </Typography>
                     </View>

                     {/* Title */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                           Title
                        </Typography>
                        <View className="bg-surface border border-outline/20 rounded-2xl px-4 h-14 justify-center">
                           <TextInput
                              value={title}
                              onChangeText={setTitle}
                              placeholder="e.g. Grocery Day Reminder"
                              placeholderTextColor={Colors.placeholder}
                              maxLength={80}
                              className="text-on-surface text-base"
                           />
                        </View>
                        <Typography className="text-secondary-400 text-[10px] mt-1 ml-1 text-right">
                           {title.length}/80
                        </Typography>
                     </View>

                     {/* Body */}
                     <View>
                        <Typography className="text-[10px] text-primary uppercase font-black tracking-widest mb-2 ml-1">
                           Message
                        </Typography>
                        <View className="bg-surface border border-outline/20 rounded-2xl px-4 py-3">
                           <TextInput
                              value={body}
                              onChangeText={setBody}
                              placeholder="Write your notice here..."
                              placeholderTextColor={Colors.placeholder}
                              multiline
                              numberOfLines={5}
                              textAlignVertical="top"
                              maxLength={500}
                              className="text-on-surface text-sm min-h-[100px]"
                           />
                        </View>
                        <Typography className="text-secondary-400 text-[10px] mt-1 ml-1 text-right">
                           {body.length}/500
                        </Typography>
                     </View>

                     {/* Preview */}
                     {isValid && (
                        <View>
                           <Typography className="text-[10px] text-secondary-300 uppercase font-black tracking-widest mb-2 ml-1">
                              Preview
                           </Typography>
                           <View className="bg-surface rounded-2xl border border-outline/10 px-4 py-4 flex-row items-start gap-3">
                              <View
                                 className="w-1 self-stretch rounded-full flex-shrink-0"
                                 style={{ backgroundColor: selectedType.color }}
                              />
                              <View className="flex-1">
                                 <View className="flex-row items-start justify-between gap-2 mb-1">
                                    <Typography className="text-on-surface text-sm font-bold flex-1 leading-snug">
                                       {title}
                                    </Typography>
                                    <Typography className="text-secondary-400 text-[10px]">
                                       Just now
                                    </Typography>
                                 </View>
                                 <Typography
                                    className="text-secondary-300 text-xs leading-relaxed"
                                    numberOfLines={2}
                                 >
                                    {body}
                                 </Typography>
                              </View>
                           </View>
                        </View>
                     )}

                     {/* Submit */}
                     <TouchableOpacity
                        onPress={handleSubmit}
                        activeOpacity={0.85}
                        disabled={!isValid || isLoading}
                        className={`h-14 rounded-2xl items-center justify-center flex-row gap-2 ${
                           isValid ? "bg-primary active:opacity-80" : "bg-surface"
                        }`}
                     >
                        <MaterialCommunityIcons
                           name="bullhorn"
                           size={20}
                           color={isValid ? "#0F172A" : "#334155"}
                        />
                        <Typography
                           className={`font-bold text-base ${
                              isValid ? "text-background" : "text-secondary-400"
                           }`}
                        >
                           {isLoading ? "Posting..." : "Post Notice"}
                        </Typography>
                     </TouchableOpacity>
                  </View>
               </ScrollView>
            </View>
         </KeyboardAvoidingView>
      </Modal>
   );
};
