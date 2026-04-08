import { Redirect } from "expo-router";

export default function Index() {
   // In a real app, you would check the authentication state from Redux here.
   // For now, we redirect to login to start the user flow.
   return <Redirect href="/(startup)/splash" />;
}
