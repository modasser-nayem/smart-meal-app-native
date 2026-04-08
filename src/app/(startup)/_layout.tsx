import { Stack } from "expo-router";

export default function StartupLayout() {
   return (
      <Stack
         screenOptions={{
            headerShown: false,
            animation: "fade",
         }}
      >
         <Stack.Screen name="splash" />
         <Stack.Screen name="onboarding" />
      </Stack>
   );
}
