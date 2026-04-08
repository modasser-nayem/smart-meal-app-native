import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
   const colorScheme = useColorScheme();
   
   return (
      <Tabs
         screenOptions={{
            headerShown: false,
            tabBarStyle: {
               backgroundColor: "#0F172A",
               borderTopWidth: 0,
               elevation: 0,
               height: 60,
               paddingBottom: 10,
            },
            tabBarActiveTintColor: "#F59E0B",
            tabBarInactiveTintColor: "#94A3B8",
            tabBarLabelStyle: {
               fontSize: 10,
               fontFamily: "Inter_500Medium",
               textTransform: "uppercase",
            },
         }}
      >
         <Tabs.Screen
            name="home/index"
            options={{
               title: "Home",
               tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons 
                     name={focused ? "home" : "home-outline"} 
                     size={size} 
                     color={color} 
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="meals/index"
            options={{
               title: "Meals",
               tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons 
                     name={focused ? "silverware-fork-knife" : "silverware-fork-knife"} 
                     size={size} 
                     color={color} 
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="group/index"
            options={{
               title: "Group",
               tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons 
                     name={focused ? "account-group" : "account-group-outline"} 
                     size={size} 
                     color={color} 
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="expense/index"
            options={{
               title: "Expense",
               tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons 
                     name={focused ? "wallet" : "wallet-outline"} 
                     size={size} 
                     color={color} 
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="profile/index"
            options={{
               title: "Profile",
               tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons 
                     name={focused ? "account" : "account-outline"} 
                     size={size} 
                     color={color} 
                  />
               ),
            }}
         />
      </Tabs>
   );
}
