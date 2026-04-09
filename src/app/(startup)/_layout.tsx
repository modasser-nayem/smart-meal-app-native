import { Stack } from "expo-router";
import { Container } from "@/components/ui/Container";

export default function StartupLayout() {
   return (
      <Container withSafeArea={true}>
         <Stack
            screenOptions={{
               headerShown: false,
               animation: "fade",
            }}
         >
            <Stack.Screen name="splash" />
            <Stack.Screen name="onboarding" />
         </Stack>
      </Container>
   );
}
