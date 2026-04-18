import "@/styles/global.css";
import "@/i18n/types"; // type augmentation — must be imported
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
import { useEffect, useState } from "react";
import i18n, { resolveInitialLanguage } from "@/i18n";
import { CurrencyProvider } from "@/context/CurrencyContext";

export default function RootLayout() {
   const [fontsLoaded] = useFonts({
      Inter_400Regular,
      Inter_500Medium,
      Inter_700Bold,
   });

   // Resolve saved/device language before first render
   const [i18nReady, setI18nReady] = useState(false);
   useEffect(() => {
      resolveInitialLanguage().then((lang) => {
         i18n.changeLanguage(lang).then(() => setI18nReady(true));
      });
   }, []);

   if (!fontsLoaded || !i18nReady) return null;

   return (
      <GestureHandlerRootView className="flex-1">
         <Provider store={store}>
            <CurrencyProvider>
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
            </CurrencyProvider>
         </Provider>
         <ToastManager />
      </GestureHandlerRootView>
   );
}
