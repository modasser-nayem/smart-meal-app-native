import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";

import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { CustomAlert } from "@/components/ui/CustomAlert";

import { ProfileHeader } from "@/components/screens/profile/ProfileHeader";
import { MyGroupsList, GroupItem } from "@/components/screens/profile/MyGroupsList";
import { ProfileSettings } from "@/components/screens/profile/ProfileSettings";

import { useGetProfileQuery } from "@/api/userApi";
import { logout } from "@/store/authSlice";

// ─── Mock data (replace with real API hooks) ──────────────────────────────────

const MOCK_GROUPS: GroupItem[] = [
   {
      id: "g1",
      name: "Bachelor House",
      role: "Owner",
      memberCount: 12,
      isActive: true,
      emoji: "🏠",
   },
   {
      id: "g2",
      name: "Family Table",
      role: "Member",
      memberCount: 4,
      isActive: false,
      emoji: "🍽️",
   },
];

// ─── Alert state shape ────────────────────────────────────────────────────────

type AlertConfig = {
   visible: boolean;
   icon: string;
   iconVariant: "default" | "danger" | "success" | "warning";
   title: string;
   message: string;
   actions: {
      label: string;
      onPress: () => void;
      variant?: "default" | "danger" | "success" | "warning";
   }[];
};

const ALERT_CLOSED: AlertConfig = {
   visible: false,
   icon: "information-outline",
   iconVariant: "default",
   title: "",
   message: "",
   actions: [],
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ProfileScreen() {
   const router = useRouter();
   const dispatch = useDispatch();
   const { data: profile } = useGetProfileQuery();

   const [notificationsEnabled, setNotificationsEnabled] = useState(true);
   const [groups, setGroups] = useState<GroupItem[]>(MOCK_GROUPS);
   const [alert, setAlert] = useState<AlertConfig>(ALERT_CLOSED);

   const closeAlert = () => setAlert(ALERT_CLOSED);

   // ── Switch group ──────────────────────────────────────────────────────────

   const handleSwitchGroup = (id: string) => {
      const target = groups.find((g) => g.id === id);
      if (!target || target.isActive) return;

      setAlert({
         visible: true,
         icon: "swap-horizontal",
         iconVariant: "default",
         title: "Switch Group",
         message: `Switch to "${target.name}"? You'll be taken to the Group tab to see it.`,
         actions: [
            {
               label: `Switch to ${target.emoji ?? ""} ${target.name}`,
               variant: "default",
               onPress: () => {
                  setGroups((prev) => prev.map((g) => ({ ...g, isActive: g.id === id })));
                  closeAlert();
                  // Small delay so the user sees the active state update before navigating
                  setTimeout(() => router.push("/(tabs)/group"), 250);
               },
            },
            { label: "Cancel", onPress: closeAlert },
         ],
      });
   };

   // ── Logout ────────────────────────────────────────────────────────────────

   const handleLogout = () => {
      setAlert({
         visible: true,
         icon: "logout",
         iconVariant: "danger",
         title: "Log Out",
         message: "Are you sure you want to log out of your account?",
         actions: [
            {
               label: "Log Out",
               variant: "danger",
               onPress: () => {
                  closeAlert();
                  dispatch(logout());
                  router.replace("/(auth)/login");
               },
            },
            { label: "Cancel", onPress: closeAlert },
         ],
      });
   };

   // ── Delete account ────────────────────────────────────────────────────────

   const handleDeleteAccount = () => {
      setAlert({
         visible: true,
         icon: "delete-forever-outline",
         iconVariant: "danger",
         title: "Delete Account",
         message: "This will permanently delete your account and all data. This cannot be undone.",
         actions: [
            {
               label: "Delete Permanently",
               variant: "danger",
               onPress: () => {
                  closeAlert();
                  // TODO: call delete API
               },
            },
            { label: "Cancel", onPress: closeAlert },
         ],
      });
   };

   // ─────────────────────────────────────────────────────────────────────────

   return (
      <View className="flex-1 bg-background">
         <Container scrollable withSafeArea padding={false} className="bg-background">
            {/* ① Profile Header */}
            <ProfileHeader
               username={profile?.username || "Nayem Hossain"}
               email={profile?.email || "nayem@email.com"}
               photoUrl={profile?.photoUrl}
               groupCount={groups.length}
               totalMeals={142}
               memberSince="Mar 2025"
               onEditPhoto={() => router.push("/modal/edit-profile")}
               onEditProfile={() => router.push("/modal/edit-profile")}
            />

            <View className="gap-6 pb-12">
               {/* ② My Groups */}
               <MyGroupsList
                  groups={groups}
                  onGroupPress={handleSwitchGroup}
                  onCreateGroup={() => router.push("/modal/create-group")}
                  onJoinGroup={() => router.push("/modal/join-group")}
               />

               {/* ③ Settings */}
               <ProfileSettings
                  notificationsEnabled={notificationsEnabled}
                  onToggleNotifications={setNotificationsEnabled}
                  onEditProfile={() => router.push("/modal/edit-profile")}
                  onChangePassword={() => router.push("/modal/security")}
                  onLanguage={() => {}}
                  onHelpCenter={() => {}}
                  onPrivacyPolicy={() => {}}
                  onLogout={handleLogout}
                  onDeleteAccount={handleDeleteAccount}
               />

               {/* Version footer */}
               <View className="items-center py-4">
                  <Typography className="text-secondary-500 text-[10px] uppercase font-bold tracking-[0.2em]">
                     Smart Meal v1.0.4 · Built with ❤️
                  </Typography>
               </View>
            </View>
         </Container>

         {/* Custom Alert */}
         <CustomAlert
            visible={alert.visible}
            onClose={closeAlert}
            icon={alert.icon}
            iconVariant={alert.iconVariant}
            title={alert.title}
            message={alert.message}
            actions={alert.actions}
         />
      </View>
   );
}
