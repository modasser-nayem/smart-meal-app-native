import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { useLoginMutation } from "../../../api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import { Colors } from "@/constants/colors";

export const LoginForm = () => {
   const router = useRouter();
   const dispatch = useDispatch();
   const [login, { isLoading }] = useLoginMutation();
   const [showPassword, setShowPassword] = useState(false);

   const {
      control,
      handleSubmit,
      formState: { errors },
      setError,
   } = useForm({
      defaultValues: {
         email: "[EMAIL_ADDRESS]",
         password: "[PASSWORD]",
      },
   });

   const onSubmit = async (data: any) => {
      try {
         // const result = await login(data).unwrap();
         // console.log(result);

         dispatch(
            setCredentials({
               user: {
                  id: "69a96a03e083e478064aa3bd",
                  name: "Ali Modasser Nayem",
                  email: "modassernayem@gmail.com",
                  avatar: null,
                  createdAt: "2026-03-05T11:33:23.090Z",
                  updatedAt: "2026-03-29T08:23:24.558Z",
               },
               accessToken:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTk2YTAzZTA4M2U0NzgwNjRhYTNiZCIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NjQxMTkwLCJleHAiOjE3NzU3Mjc1OTB9.Q3DwGdjIm0zulFHMG7LmxBPZX9cdB3Dg2Cdo2CFy0vA",
               refreshToken:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTk2YTAzZTA4M2U0NzgwNjRhYTNiZCIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NjQxMTkwLCJleHAiOjE3NzgyMzMxOTB9.Hx-oQdTUqtoTNqx3RRjnpyv-bTpR3pqK_pipjgNVlHs",
               isEmailVerified: true,
            }),
         );
         router.replace("/(tabs)/home");
      } catch (error: any) {
         console.error("Login failed", JSON.stringify(error));

         if (error.data.message === "ValidationError" && error.data.errors) {
            error.data.errors.forEach((error: any) => {
               setError(error.path, {
                  type: "manual",
                  message: error.message,
               });
            });
         } else if (error.status === 400 && error.data.success === false) {
            Toast.error(error.data.message);
         } else {
            Toast.error("Something went wrong");
         }
      }
   };

   return (
      <View className="w-full px-6 py-12">
         {/* Brand Section */}
         <View className="items-center mb-12">
            <View className="flex-row items-center gap-2 mb-8">
               <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={36}
                  color={Colors.icon.primary}
               />
               <Typography className="text-xl font-bold tracking-tight text-primary">
                  Smart Meal
               </Typography>
            </View>
            <View className="items-center space-y-3">
               <Typography
                  variant="h1"
                  className="text-[44px] font-bold leading-tight text-on-surface text-center"
               >
                  Welcome Back 👋
               </Typography>
               <Typography className="text-secondary text-base font-medium tracking-wide text-center mt-2">
                  Sign in to your account
               </Typography>
            </View>
         </View>

         {/* Form Section */}
         <View className="space-y-6">
            <Controller
               control={control}
               name="email"
               rules={{ required: "Email Address is required" }}
               render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                     label="Email Address"
                     placeholder="name@example.com"
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                     error={errors.email?.message}
                     keyboardType="email-address"
                     autoCapitalize="none"
                     leftIcon={
                        <MaterialCommunityIcons
                           name="email-outline"
                           size={20}
                           color={Colors.icon.subtle}
                        />
                     }
                  />
               )}
            />

            <View>
               <View className="flex-row justify-between items-end mb-1 px-1">
                  <Typography className="text-[11px] uppercase tracking-widest font-bold text-primary">
                     Password
                  </Typography>
                  <TouchableOpacity onPress={() => {}}>
                     <Typography className="text-[14px] text-primary font-medium">
                        Forgot Password?
                     </Typography>
                  </TouchableOpacity>
               </View>
               <Controller
                  control={control}
                  name="password"
                  rules={{ required: "Password is required" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                     <Input
                        placeholder="••••••••"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.password?.message}
                        secureTextEntry={!showPassword}
                        leftIcon={
                           <MaterialCommunityIcons
                              name="lock-outline"
                              size={20}
                              color={Colors.icon.subtle}
                           />
                        }
                        rightIcon={
                           <TouchableOpacity
                              onPress={() => setShowPassword(!showPassword)}
                           >
                              <MaterialCommunityIcons
                                 name={
                                    showPassword
                                       ? "eye-outline"
                                       : "eye-off-outline"
                                 }
                                 size={20}
                                 color={Colors.icon.subtle}
                              />
                           </TouchableOpacity>
                        }
                     />
                  )}
               />
            </View>

            <Button
               onPress={handleSubmit(onSubmit)}
               loading={isLoading}
               fullWidth
               size="lg"
               className="mt-4 bg-primary rounded-xl shadow-lg shadow-primary/40 elevation-md"
            >
               Sign In
            </Button>

            {/* Divider */}
            <View className="relative flex-row items-center py-8">
               <View className="flex-1 h-[1px] bg-outline" />
               <Typography className="mx-4 text-[11px] uppercase tracking-widest text-outline font-bold">
                  OR
               </Typography>
               <View className="flex-1 h-[1px] bg-outline" />
            </View>

            {/* Social Login */}
            <TouchableOpacity className="w-full flex-row items-center justify-center gap-2 bg-surface-container border border-outline h-14 rounded-xl active:opacity-80">
               <MaterialCommunityIcons
                  name="google-plus"
                  size={28}
                  color={Colors.icon.subtle}
               />
               <Typography className="font-semibold text-on-surface">
                  Continue with Google
               </Typography>
            </TouchableOpacity>
         </View>

         {/* Footer */}
         <View className="flex-row justify-center mt-12 pb-8">
            <Typography className="text-on-surface text-base">
               Don't have an account?
            </Typography>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
               <Typography className="text-primary font-bold ml-1 text-base">
                  Sign Up
               </Typography>
            </TouchableOpacity>
         </View>
      </View>
   );
};
