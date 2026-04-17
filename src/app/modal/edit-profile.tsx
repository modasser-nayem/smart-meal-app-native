import { useState } from "react";
import {
   View,
   TouchableOpacity,
   Image,
   ScrollView,
   KeyboardAvoidingView,
   Platform,
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
import { useGetProfileQuery, useUpdateProfileMutation } from "@/api/userApi";
import { editProfileSchema, EditProfileFormData } from "@/schemas/profile.schema";

const DEFAULT_AVATAR =
   "https://lh3.googleusercontent.com/aida-public/AB6AXuBO3jdD-poSuSANiPR7VgxC9B5ccrozavF_CsDqU_hz9pgdLErGMIjcY7oU1_wM2iqXC14693hLM0pu_ieHOtK9G4pzPT1ZaDeK8N_5RdShmxU2AhBcJGr7VCQWqI-HLJYLTAl9hl6fUyLR8PcgLpOLisTYV4_i1TcX87m3yjXGNCMN7ZIT0jeSRA6JTpZpJCvC66y6yYX98Vwgc9-TQw_MePrtLN8p-c3Lf7WWIoq9Iv59PBV_AjExIUSMhn7VW29vPgNnRtNfxSA";

export default function EditProfileModal() {
   const router = useRouter();
   const { data: profile } = useGetProfileQuery();
   const [updateProfile, { isLoading }] = useUpdateProfileMutation();

   // Local picked image — uri for preview, asset for upload
   const [pickedImage, setPickedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

   const {
      control,
      handleSubmit,
      formState: { errors, isDirty },
   } = useForm<EditProfileFormData>({
      resolver: yupResolver(editProfileSchema),
      defaultValues: {
         username: profile?.username || "",
      },
   });

   const handlePickImage = async () => {
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
         setPickedImage(result.assets[0]);
      }
   };

   const handleTakePhoto = async () => {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
         Toast.error("Permission to use camera is required");
         return;
      }
      const result = await ImagePicker.launchCameraAsync({
         allowsEditing: true,
         aspect: [1, 1],
         quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
         setPickedImage(result.assets[0]);
      }
   };

   const onSubmit = async (data: EditProfileFormData) => {
      try {
         const formData = new FormData();
         formData.append("username", data.username);

         if (pickedImage) {
            const filename = pickedImage.uri.split("/").pop() ?? "photo.jpg";
            const ext = filename.split(".").pop() ?? "jpg";
            formData.append("photo", {
               uri: pickedImage.uri,
               name: filename,
               type: `image/${ext}`,
            } as any);
         }

         await updateProfile(formData).unwrap();
         Toast.success("Profile updated successfully");
         router.back();
      } catch (error: any) {
         Toast.error(error?.data?.message || "Failed to update profile");
      }
   };

   const avatarUri = pickedImage?.uri || profile?.photoUrl || DEFAULT_AVATAR;
   const hasChanges = isDirty || !!pickedImage;

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         className="flex-1 bg-background"
      >
         <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 40 }}
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
               <Typography className="text-on-surface text-lg font-extrabold tracking-tight">
                  Edit Profile
               </Typography>
               <View className="w-10" />
            </View>

            <View className="px-6 pt-8">
               {/* Avatar picker */}
               <View className="items-center mb-10">
                  <View className="relative mb-4">
                     <View className="w-28 h-28 rounded-full border-[3px] border-primary/40 overflow-hidden bg-surface-container">
                        <Image
                           source={{ uri: avatarUri }}
                           className="w-full h-full"
                           resizeMode="cover"
                        />
                     </View>
                     {pickedImage && (
                        <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-success items-center justify-center border-2 border-background">
                           <MaterialCommunityIcons name="check" size={11} color="#0F172A" />
                        </View>
                     )}
                  </View>

                  {/* Pick actions */}
                  <View className="flex-row gap-3">
                     <TouchableOpacity
                        onPress={handlePickImage}
                        activeOpacity={0.8}
                        className="flex-row items-center gap-2 bg-surface-container border border-outline/20 px-4 py-2.5 rounded-xl active:scale-95"
                     >
                        <MaterialCommunityIcons name="image-outline" size={18} color="#F59E0B" />
                        <Typography className="text-primary text-sm font-bold">Gallery</Typography>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={handleTakePhoto}
                        activeOpacity={0.8}
                        className="flex-row items-center gap-2 bg-surface-container border border-outline/20 px-4 py-2.5 rounded-xl active:scale-95"
                     >
                        <MaterialCommunityIcons name="camera-outline" size={18} color="#F59E0B" />
                        <Typography className="text-primary text-sm font-bold">Camera</Typography>
                     </TouchableOpacity>
                  </View>

                  {pickedImage && (
                     <TouchableOpacity
                        onPress={() => setPickedImage(null)}
                        className="mt-2"
                        activeOpacity={0.7}
                     >
                        <Typography className="text-error text-xs font-medium">
                           Remove selected photo
                        </Typography>
                     </TouchableOpacity>
                  )}
               </View>

               {/* Form */}
               <View>
                  {/* Username */}
                  <Controller
                     control={control}
                     name="username"
                     render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                           label="Username"
                           placeholder="your_username"
                           autoCapitalize="none"
                           autoCorrect={false}
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                           error={errors.username?.message}
                           leftIcon={
                              <MaterialCommunityIcons
                                 name="account-outline"
                                 size={20}
                                 color="#94A3B8"
                              />
                           }
                        />
                     )}
                  />

                  {/* Email — read only */}
                  <Input
                     label="Email Address"
                     value={profile?.email || ""}
                     editable={false}
                     containerClassName="opacity-50"
                     leftIcon={
                        <MaterialCommunityIcons name="email-outline" size={20} color="#94A3B8" />
                     }
                     rightIcon={
                        <MaterialCommunityIcons name="lock-outline" size={16} color="#94A3B8" />
                     }
                  />
                  <Typography className="text-secondary-400 text-xs -mt-3 mb-5 ml-1">
                     Email cannot be changed
                  </Typography>
               </View>

               {/* Save Button */}
               <Button
                  onPress={handleSubmit(onSubmit)}
                  loading={isLoading}
                  disabled={!hasChanges}
                  fullWidth
                  size="lg"
                  className="mt-4 rounded-2xl"
               >
                  Save Changes
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
