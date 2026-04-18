import { View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Typography } from "@/components/ui/Typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function NotFoundScreen() {
   const router = useRouter();

   return (
      <>
         <Stack.Screen options={{ title: "Oops!" }} />
         <View className="flex-1 bg-background items-center justify-center p-5">
            <MaterialCommunityIcons
               name="alert-circle-outline"
               size={64}
               color={Colors.icon.error}
            />
            <Typography variant="h1" className="text-on-surface text-2xl font-bold mt-5">
               Screen Not Found
            </Typography>
            <Typography className="text-secondary-300 text-center mt-2.5 mb-7">
               The screen you are looking for doesn't exist or was moved.
            </Typography>

            <TouchableOpacity
               className="bg-primary py-3 px-6 rounded-lg active:bg-primary-dark"
               onPress={() => router.replace("/(tabs)/home")}
            >
               <Typography className="text-on-primary font-semibold">Go to Home</Typography>
            </TouchableOpacity>
         </View>
      </>
   );
}
