import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, Alert, Clipboard } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";

import { GroupInfoCard } from "@/components/screens/group/GroupInfoCard";
import { GroupNoticeSection } from "@/components/screens/group/GroupNoticeSection";
import { GroupMembersSection } from "@/components/screens/group/GroupMembersSection";
import { GroupRequestsSection } from "@/components/screens/group/GroupRequestsSection";

// ─── Mock data (replace with real API hooks) ──────────────────────────────────

const MOCK_NOTICES = [
   {
      id: "n1",
      title: "🛒 Grocery Day Reminder",
      body: "Everyone please contribute ৳800 for groceries before 6 PM today. Karim will collect from each room.",
      timeAgo: "2h ago",
      pinColor: "amber",
   },
   {
      id: "n2",
      title: "📊 March Billing Closed",
      body: "March billing is now finalized. Total: ৳42,560. Please settle any outstanding dues within 3 days.",
      timeAgo: "Yesterday",
      pinColor: "blue",
   },
];

const MOCK_MEMBERS = [
   {
      id: "m1",
      name: "Ali Modasser Nayem",
      email: "ali.nayem@email.com",
      role: "Owner" as const,
      isActive: true,
      initials: "AN",
      avatarColor: "bg-amber-900",
   },
   {
      id: "m2",
      name: "Karim Hossain",
      email: "karim@email.com",
      role: "Manager" as const,
      isActive: true,
      initials: "KH",
      avatarColor: "bg-blue-900",
   },
   {
      id: "m3",
      name: "Rahim Uddin",
      email: "rahim@email.com",
      role: "Member" as const,
      isActive: false,
      initials: "RU",
      avatarColor: "bg-teal-900",
   },
];

const MOCK_REQUESTS = [
   {
      id: "r1",
      name: "Jalal Ahmed",
      email: "jalal@email.com",
      timeAgo: "2h ago",
      type: "join_request" as const,
      initials: "JA",
      avatarColor: "bg-slate-800",
      isActive: true,
   },
   {
      id: "r2",
      name: "Priya Das",
      email: "priya@email.com",
      timeAgo: "1 day ago",
      type: "join_request" as const,
      initials: "PD",
      avatarColor: "bg-violet-900",
      isActive: false,
   },
   {
      id: "r3",
      name: "Tanvir Rahman",
      email: "tanvir@email.com",
      timeAgo: "3h ago",
      type: "invitation" as const,
      initials: "TR",
      avatarColor: "bg-cyan-900",
   },
];

const IS_OWNER = true; // Replace with real auth/role check
const TOTAL_MEMBERS = 12;
const TOTAL_JOIN_REQUESTS = 3;
const TOTAL_INVITATIONS = 2;
const INVITE_CODE = "BCHH-4821";

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function GroupScreen() {
   const [requests, setRequests] = useState(MOCK_REQUESTS);

   /* ── handlers ── */
   const handleCopyCode = useCallback(() => {
      Clipboard.setString(INVITE_CODE);
      Alert.alert("Copied!", "Invite code copied to clipboard.");
   }, []);

   const handleSwitchGroup = useCallback(() => {
      // router.push("/(modal)/switch-group");
      Alert.alert("Switch Group", "Opens the group-switching modal.");
   }, []);

   const handleEditGroup = useCallback(() => {
      // router.push("/(modal)/edit-group");
      Alert.alert("Edit Group", "Opens group edit form.");
   }, []);

   const handleAccept = useCallback((id: string) => {
      setRequests((prev) => prev.filter((r) => r.id !== id));
   }, []);

   const handleReject = useCallback((id: string) => {
      setRequests((prev) => prev.filter((r) => r.id !== id));
   }, []);

   const handleRevoke = useCallback((id: string) => {
      setRequests((prev) => prev.filter((r) => r.id !== id));
   }, []);

   return (
      <Container
         scrollable
         withSafeArea
         padding={false}
         className="bg-background"
      >
         {/* ── Header bar ── */}
         <View className="flex-row items-center justify-between px-5 pt-4 pb-3">
            <View>
               <Typography className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">
                  Your Group
               </Typography>
               <Typography className="text-on-surface text-2xl font-extrabold tracking-tight">
                  Group Hub
               </Typography>
            </View>
            {/* Notification bell */}
            <TouchableOpacity
               activeOpacity={0.75}
               className="w-10 h-10 rounded-full bg-surface-container items-center justify-center active:scale-95"
            >
               <MaterialCommunityIcons
                  name="bell-outline"
                  size={22}
                  color="#dae2fd"
               />
               {/* Unread badge */}
               <View className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary border border-background" />
            </TouchableOpacity>
         </View>

         {/* ── Sections ── */}
         <View className="px-4 gap-6 pb-8">
            {/* 1. Group Info */}
            <GroupInfoCard
               groupName="Bachelor House"
               location="Dhaka, Bangladesh"
               memberCount={TOTAL_MEMBERS}
               activeCount={9}
               pendingCount={TOTAL_JOIN_REQUESTS + TOTAL_INVITATIONS}
               inviteCode={INVITE_CODE}
               billingMonth="April 2026"
               isOwner={IS_OWNER}
               onSwitchGroup={handleSwitchGroup}
               onEditGroup={handleEditGroup}
               onCopyCode={handleCopyCode}
            />

            {/* 2. Notices */}
            <GroupNoticeSection
               notices={MOCK_NOTICES}
               isOwner={IS_OWNER}
               onNoticePress={(id) => {
                  // router.push(`/group/notice/${id}`);
               }}
               onSeeAll={() => {
                  // router.push("/group/notices");
               }}
               onPostNotice={() => {
                  // router.push("/group/notices/new");
               }}
            />

            {/* 3. Members */}
            <GroupMembersSection
               members={MOCK_MEMBERS}
               totalCount={TOTAL_MEMBERS}
               onMemberPress={(id) => {
                  // router.push(`/group/member/${id}`);
               }}
               onSeeAll={() => {
                  // router.push("/group/members");
               }}
            />

            {/* 4. Requests & Invitations */}
            <GroupRequestsSection
               items={requests}
               totalJoinRequests={TOTAL_JOIN_REQUESTS}
               totalInvitations={TOTAL_INVITATIONS}
               isOwner={IS_OWNER}
               onAccept={handleAccept}
               onReject={handleReject}
               onRevoke={handleRevoke}
               onSeeAll={() => {
                  // router.push("/group/requests");
               }}
            />
         </View>
      </Container>
   );
}
