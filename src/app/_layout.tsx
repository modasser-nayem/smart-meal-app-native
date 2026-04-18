import "@/styles/global.css";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
   useFonts,
   Inter_400Regular,
   Inter_500Medium,
   Inter_700Bold,
} from "@expo-google-fonts/inter";
import { store } from "@/store";
import ToastManager from "toastify-react-native";
import { Colors } from "@/constants/colors";

export default function RootLayout() {
   const [fontsLoaded] = useFonts({
      Inter_400Regular,
      Inter_500Medium,
      Inter_700Bold,
   });
   if (!fontsLoaded) return null;

   return (
      <GestureHandlerRootView className="flex-1">
         <Provider store={store}>
            <Stack
               screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: Colors.background },
               }}
            >
               <Stack.Screen name="(startup)" />
               <Stack.Screen name="(auth)" />
               <Stack.Screen name="(tabs)" />
               <Stack.Screen
                  name="modal/edit-profile"
                  options={{ presentation: "modal", animation: "slide_from_bottom" }}
               />
               <Stack.Screen
                  name="modal/security"
                  options={{ presentation: "modal", animation: "slide_from_bottom" }}
               />
               <Stack.Screen
                  name="modal/create-group"
                  options={{ presentation: "modal", animation: "slide_from_bottom" }}
               />
               <Stack.Screen
                  name="modal/join-group"
                  options={{ presentation: "modal", animation: "slide_from_bottom" }}
               />
            </Stack>
         </Provider>
         <ToastManager />
      </GestureHandlerRootView>
   );
}
