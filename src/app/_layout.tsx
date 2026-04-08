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
                  contentStyle: { backgroundColor: "#0F172A" },
               }}
            >
               <Stack.Screen name="(startup)" />
               <Stack.Screen name="(auth)" />
               <Stack.Screen name="(tabs)" />
            </Stack>
         </Provider>
         <ToastManager />
      </GestureHandlerRootView>
   );
}
