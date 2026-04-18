import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Platform } from "react-native";

export default function TabsLayout() {
   return (
      <Tabs
         screenOptions={{
            headerShown: false,
            tabBarStyle: {
               backgroundColor: Colors.background,
               borderTopWidth: 0,
               elevation: 0,
               height: Platform.OS === "ios" ? 80 : 60,
               paddingTop: 8,
               paddingBottom: Platform.OS === "ios" ? 24 : 8,
            },
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textSubtle,
            tabBarLabelStyle: {
               fontSize: 10,
               fontFamily: "Inter_500Medium",
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
                  <MaterialCommunityIcons name="silverware-fork-knife" size={size} color={color} />
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
