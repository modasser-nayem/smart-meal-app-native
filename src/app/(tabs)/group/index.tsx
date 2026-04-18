import { useState, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { CustomAlert } from "@/components/ui/CustomAlert";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

import { GroupInfoCard } from "@/components/screens/group/GroupInfoCard";
import { GroupQuickActions } from "@/components/screens/group/GroupQuickActions";
import { GroupNoticeSection, Notice } from "@/components/screens/group/GroupNoticeSection";
import { PostNoticeSheet, NewNotice } from "@/components/screens/group/PostNoticeSheet";
import { GroupMembersSection, Member } from "@/components/screens/group/GroupMembersSection";
import { GroupRequestsSection, PendingItem } from "@/components/screens/group/GroupRequestsSection";
import { Colors } from "@/constants/colors";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_NOTICES: Notice[] = [
   {
      id: "n1",
      title: "🛒 Grocery Day Reminder",
      body: "Everyone please contribute ৳800 for groceries before 6 PM today. Karim will collect from each room.",
      timeAgo: "2h ago",
      pinColor: "warning",
      postedBy: "Ali Nayem",
      isPinned: true,
   },
   {
      id: "n2",
      title: "📊 March Billing Closed",
      body: "March billing is now finalized. Total: ৳42,560. Please settle any outstanding dues within 3 days.",
      timeAgo: "Yesterday",
      pinColor: "info",
      postedBy: "Ali Nayem",
   },
   {
      id: "n3",
      title: "✅ Internet Bill Paid",
      body: "This month's internet bill of ৳1,000 has been paid. It will be included in the shared expenses.",
      timeAgo: "2 days ago",
      pinColor: "success",
      postedBy: "Karim Hossain",
   },
];

const MOCK_MEMBERS: Member[] = [
   {
      id: "m1",
      name: "Ali Modasser Nayem",
      email: "ali.nayem@email.com",
      role: "Owner",
      isActive: true,
      initials: "AN",
      avatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuBO3jdD-poSuSANiPR7VgxC9B5ccrozavF_CsDqU_hz9pgdLErGMIjcY7oU1_wM2iqXC14693hLM0pu_ieHOtK9G4pzPT1ZaDeK8N_5RdShmxU2AhBcJGr7VCQWqI-HLJYLTAl9hl6fUyLR8PcgLpOLisTYV4_i1TcX87m3yjXGNCMN7ZIT0jeSRA6JTpZpJCvC66y6yYX98Vwgc9-TQw_MePrtLN8p-c3Lf7WWIoq9Iv59PBV_AjExIUSMhn7VW29vPgNnRtNfxSA",
   },
   {
      id: "m2",
      name: "Karim Hossain",
      email: "karim@email.com",
      role: "Manager",
      isActive: true,
      initials: "KH",
      avatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuCmnaGLcUymCqtbhNMsybCsB1NEtlNmcbPQbTSWPa5VIzEqJv3cb2qbQWxjcmiT5zlLm0Vnjg7lVem1dWwGqa7ltQ8QWGbdF07SND3u7oYE7flB8Y2SL2PE8OquFyPC242FBNEJLvf2oeBU1K4AWzVXhXiPCmfGct_X6Wy4avYaMIYTD5BWEjOiAIFhbnK8mlSLmQRk7UFyZ0Gxuq7jOUjHWYb5oPVsOrsDFFXJf32tWNLPDqaUEn7wyN5YEzk0kHUef5DMnw7zqqg",
   },
   {
      id: "m3",
      name: "Rahim Uddin",
      email: "rahim@email.com",
      role: "Member",
      isActive: false,
      initials: "RU",
      avatar:
         "https://lh3.googleusercontent.com/aida-public/AB6AXuDl711jqMydNZDs9MR4r5IU6X6tIkdXRkpdJGhw9FW7wC5aaXCIz0htr_Z6xfeyFQPjgNPnVad97EMKT7l_jF_KUlroc0U7QixBHDYHKl8gfL15L1flf_DlC50nIhkofmARXCCgwJU1IQw5aIW6vFToIt95VxFoNGIYoRoKn1YGgqf6hOwqDnqxp1z3KXOLCw0FB_MXveGot-scuFK6-dpecNXscA2Kd0QfvV3auR2S-JOaYPLlcvbDmS1yAa6lUlv46QB23e0dfsw",
   },
];

const MOCK_REQUESTS: PendingItem[] = [
   {
      id: "r1",
      name: "Jalal Ahmed",
      email: "jalal@email.com",
      timeAgo: "2h ago",
      type: "join_request",
      initials: "JA",
      isActive: true,
   },
   {
      id: "r2",
      name: "Priya Das",
      email: "priya@email.com",
      timeAgo: "1 day ago",
      type: "join_request",
      initials: "PD",
      isActive: false,
   },
   {
      id: "r3",
      name: "Tanvir Rahman",
      email: "tanvir@email.com",
      timeAgo: "3h ago",
      type: "invitation",
      initials: "TR",
   },
];

const IS_OWNER = true;
const TOTAL_MEMBERS = 12;
const TOTAL_JOIN_REQUESTS = 2;
const TOTAL_INVITATIONS = 1;
const GROUP_CODE = "BCHH-4821";
const GROUP_NAME = "Bachelor House";

// ─── Alert state ──────────────────────────────────────────────────────────────

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

export default function GroupScreen() {
   const { t } = useTranslation("group");
   const [requests, setRequests] = useState<PendingItem[]>(MOCK_REQUESTS);
   const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
   const [postNoticeVisible, setPostNoticeVisible] = useState(false);
   const [alert, setAlert] = useState<AlertConfig>(ALERT_CLOSED);
   const closeAlert = () => setAlert(ALERT_CLOSED);

   const handleCopyCode = useCallback(async () => {
      await Clipboard.setStringAsync(GROUP_CODE);
      setAlert({
         visible: true,
         icon: "check-circle-outline",
         iconVariant: "success",
         title: t("header.codeCopied"),
         message: t("header.codeCopiedDesc", { code: GROUP_CODE }),
         actions: [{ label: t("actions.done"), onPress: closeAlert }],
      });
   }, [t]);

   const handleAccept = useCallback(
      (id: string, includeMonth: boolean) => {
         setRequests((prev) => prev.filter((r) => r.id !== id));
         setAlert({
            visible: true,
            icon: "account-check-outline",
            iconVariant: "success",
            title: t("requests.memberAccepted"),
            message: includeMonth
               ? t("requests.memberAcceptedThisMonth")
               : t("requests.memberAcceptedNextMonth"),
            actions: [{ label: t("actions.great"), onPress: closeAlert }],
         });
      },
      [t],
   );

   const handleReject = useCallback(
      (id: string) => {
         const item = requests.find((r) => r.id === id);
         setAlert({
            visible: true,
            icon: "account-remove-outline",
            iconVariant: "danger",
            title: t("requests.rejectRequest"),
            message: t("requests.rejectRequestDesc", { name: item?.name }),
            actions: [
               {
                  label: t("requests.reject"),
                  variant: "danger",
                  onPress: () => {
                     setRequests((prev) => prev.filter((r) => r.id !== id));
                     closeAlert();
                  },
               },
               { label: t("actions.cancel"), onPress: closeAlert },
            ],
         });
      },
      [requests, t],
   );

   const handleRevoke = useCallback(
      (id: string) => {
         const item = requests.find((r) => r.id === id);
         setAlert({
            visible: true,
            icon: "email-remove-outline",
            iconVariant: "warning",
            title: t("requests.revokeInvitation"),
            message: t("requests.revokeInvitationDesc", { name: item?.name }),
            actions: [
               {
                  label: t("requests.revoke"),
                  variant: "danger",
                  onPress: () => {
                     setRequests((prev) => prev.filter((r) => r.id !== id));
                     closeAlert();
                  },
               },
               { label: t("actions.cancel"), onPress: closeAlert },
            ],
         });
      },
      [requests, t],
   );

   const handlePostNotice = useCallback((notice: NewNotice) => {
      const newNotice: Notice = {
         id: `n${Date.now()}`,
         title: notice.title,
         body: notice.body,
         pinColor: notice.pinColor,
         timeAgo: "Just now",
         postedBy: "You",
      };
      setNotices((prev) => [newNotice, ...prev]);
   }, []);

   const handleDeleteNotice = useCallback((id: string) => {
      setNotices((prev) => prev.filter((n) => n.id !== id));
   }, []);

   return (
      <View className="flex-1 bg-background">
         <Container scrollable withSafeArea padding={false} className="bg-background">
            {/* ── Header ── */}
            <View className="flex-row items-center justify-between px-5 pt-5 pb-4">
               <View>
                  <Typography className="text-[10px] text-secondary-300 uppercase font-bold tracking-widest mb-0.5">
                     Active Group
                  </Typography>
                  <Typography className="text-on-surface text-2xl font-extrabold tracking-tight">
                     {GROUP_NAME}
                  </Typography>
               </View>
               <TouchableOpacity
                  activeOpacity={0.75}
                  className="w-10 h-10 rounded-full bg-surface-container items-center justify-center active:scale-95"
               >
                  <MaterialCommunityIcons
                     name="bell-outline"
                     size={22}
                     color={Colors.icon.onDark}
                  />
                  <View className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary border border-background" />
               </TouchableOpacity>
            </View>

            {/* ── Sections ── */}
            <View className="px-5 gap-6 pb-10">
               {/* 1. Group Info */}
               <GroupInfoCard
                  groupName={GROUP_NAME}
                  location="Dhaka, Bangladesh"
                  groupCode={GROUP_CODE}
                  memberCount={TOTAL_MEMBERS}
                  activeCount={9}
                  pendingCount={TOTAL_JOIN_REQUESTS + TOTAL_INVITATIONS}
                  billingMonth="April 2026"
                  isOwner={IS_OWNER}
                  isMonthOpen
                  onEditGroup={() => {}}
                  onCopyCode={handleCopyCode}
               />

               {/* 2. Quick Actions */}
               <GroupQuickActions
                  isOwner={IS_OWNER}
                  pendingRequests={TOTAL_JOIN_REQUESTS + TOTAL_INVITATIONS}
                  onInviteMember={() => {}}
                  onPostNotice={() => setPostNoticeVisible(true)}
                  onViewBilling={() => {}}
                  onManageRequests={() => {}}
               />

               {/* 3. Notices */}
               <GroupNoticeSection
                  notices={notices}
                  isOwner={IS_OWNER}
                  onNoticePress={() => {}}
                  onSeeAll={() => {}}
                  onPostNotice={handlePostNotice}
                  onDeleteNotice={handleDeleteNotice}
               />

               {/* 4. Members */}
               <GroupMembersSection
                  members={MOCK_MEMBERS}
                  totalCount={TOTAL_MEMBERS}
                  isOwner={IS_OWNER}
                  onSeeAll={() => {}}
                  onRemoveMember={(id) => {
                     setAlert({
                        visible: true,
                        icon: "account-remove-outline",
                        iconVariant: "danger",
                        title: t("members.memberRemoved"),
                        message: t("members.memberRemovedDesc"),
                        actions: [{ label: t("actions.ok"), onPress: closeAlert }],
                     });
                  }}
                  onChangeRole={() => {}}
               />

               {/* 5. Requests & Invitations */}
               <GroupRequestsSection
                  items={requests}
                  totalJoinRequests={TOTAL_JOIN_REQUESTS}
                  totalInvitations={TOTAL_INVITATIONS}
                  isOwner={IS_OWNER}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onRevoke={handleRevoke}
                  onSeeAll={() => {}}
               />
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

         {/* Post Notice Sheet — triggered from Quick Actions */}
         <PostNoticeSheet
            visible={postNoticeVisible}
            onClose={() => setPostNoticeVisible(false)}
            onSubmit={(notice) => {
               handlePostNotice(notice);
               setPostNoticeVisible(false);
            }}
         />
      </View>
   );
}
