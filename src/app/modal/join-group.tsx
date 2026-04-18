import { useState, useCallback } from "react";
import {
   View,
   TouchableOpacity,
   ScrollView,
   TextInput,
   ActivityIndicator,
   Switch,
   KeyboardAvoidingView,
   Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";

import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Group, useSearchGroupsQuery, useSendJoinRequestMutation } from "@/api/groupApi";
import { Colors } from "@/constants/colors";

// ─── Mock search results (replace with real API) ──────────────────────────────

const MOCK_RESULTS: Group[] = [
   {
      id: "g1",
      name: "Bachelor House",
      description:
         "A shared meal group for 12 bachelors living together in Dhaka. We track daily meals and split costs fairly every month.",
      location: "Dhaka, Bangladesh",
      membersCount: 12,
      inviteCode: "BCHH-4821",
      ownerName: "Ali Nayem",
   },
   {
      id: "g2",
      name: "Bachelor Mess Mirpur",
      description: "Mirpur-based mess group. Monthly billing, transparent tracking.",
      location: "Mirpur, Dhaka",
      membersCount: 8,
      inviteCode: "BMMR-1234",
      ownerName: "Karim Hossain",
   },
   {
      id: "g3",
      name: "Office Lunch Club",
      description: "Daily office lunch group. Pay per meal, no monthly commitment.",
      location: "Motijheel, Dhaka",
      membersCount: 20,
      inviteCode: "OLCB-9900",
      ownerName: "Rahim Uddin",
   },
];

// ─── Search mode tabs ─────────────────────────────────────────────────────────

type SearchMode = "name" | "code";

// ─── Group Result Card ────────────────────────────────────────────────────────

interface GroupCardProps {
   group: Group;
   isSelected: boolean;
   isExpanded: boolean;
   onSelect: () => void;
   onToggleExpand: () => void;
}

const GroupCard = ({ group, isSelected, isExpanded, onSelect, onToggleExpand }: GroupCardProps) => (
   <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.85}
      className={`rounded-2xl border overflow-hidden mb-3 ${
         isSelected ? "border-primary bg-primary/5" : "border-outline/15 bg-surface-container"
      }`}
   >
      {/* Main row */}
      <View className="flex-row items-center px-4 py-4 gap-3">
         {/* Selection indicator */}
         <View
            className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
               isSelected ? "border-primary bg-primary" : "border-outline"
            }`}
         >
            {isSelected && <MaterialCommunityIcons name="check" size={12} color={Colors.icon.onPrimary} />}
         </View>

         {/* Group icon */}
         <View
            className={`w-11 h-11 rounded-xl items-center justify-center ${
               isSelected ? "bg-primary/15" : "bg-surface"
            }`}
         >
            <MaterialCommunityIcons
               name="account-group"
               size={22}
               color={isSelected ? Colors.icon.primary : Colors.icon.subtle}
            />
         </View>

         {/* Info */}
         <View className="flex-1">
            <Typography className="text-on-surface font-bold text-[15px] leading-tight">
               {group.name}
            </Typography>
            <View className="flex-row items-center gap-2 mt-0.5 flex-wrap">
               {group.location && (
                  <View className="flex-row items-center gap-1">
                     <MaterialCommunityIcons name="map-marker-outline" size={11} color={Colors.icon.dim} />
                     <Typography className="text-secondary-400 text-xs">
                        {group.location}
                     </Typography>
                  </View>
               )}
               <View className="flex-row items-center gap-1">
                  <MaterialCommunityIcons name="account-multiple" size={11} color={Colors.icon.dim} />
                  <Typography className="text-secondary-400 text-xs">
                     {group.membersCount} members
                  </Typography>
               </View>
            </View>
         </View>

         {/* Expand toggle */}
         <TouchableOpacity
            onPress={onToggleExpand}
            activeOpacity={0.7}
            className="w-8 h-8 rounded-full bg-surface items-center justify-center"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
         >
            <MaterialCommunityIcons
               name={isExpanded ? "chevron-up" : "chevron-down"}
               size={18}
               color={Colors.icon.dim}
            />
         </TouchableOpacity>
      </View>

      {/* Expanded details */}
      {isExpanded && (
         <View className="px-4 pb-4 border-t border-outline/10 pt-3 gap-3">
            {group.description && (
               <View>
                  <Typography className="text-secondary-400 text-[10px] uppercase font-bold tracking-widest mb-1">
                     About
                  </Typography>
                  <Typography className="text-secondary-100 text-sm leading-relaxed">
                     {group.description}
                  </Typography>
               </View>
            )}
            <View className="flex-row gap-4">
               {group.ownerName && (
                  <View className="flex-1">
                     <Typography className="text-secondary-400 text-[10px] uppercase font-bold tracking-widest mb-1">
                        Owner
                     </Typography>
                     <View className="flex-row items-center gap-1.5">
                        <MaterialCommunityIcons
                           name="account-circle-outline"
                           size={14}
                           color={Colors.icon.subtle}
                        />
                        <Typography className="text-on-surface text-sm font-medium">
                           {group.ownerName}
                        </Typography>
                     </View>
                  </View>
               )}
               {group.inviteCode && (
                  <View className="flex-1">
                     <Typography className="text-secondary-400 text-[10px] uppercase font-bold tracking-widest mb-1">
                        Invite Code
                     </Typography>
                     <Typography className="text-primary font-mono font-bold text-sm tracking-widest">
                        {group.inviteCode}
                     </Typography>
                  </View>
               )}
            </View>
         </View>
      )}
   </TouchableOpacity>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function JoinGroupModal() {
   const router = useRouter();
   const [sendJoinRequest, { isLoading: isSending }] = useSendJoinRequestMutation();

   const [searchMode, setSearchMode] = useState<SearchMode>("name");
   const [query, setQuery] = useState("");
   const [codeQuery, setCodeQuery] = useState("");
   const [selectedId, setSelectedId] = useState<string | null>(null);
   const [expandedId, setExpandedId] = useState<string | null>(null);
   const [isIncludedJoinMonth, setIsIncludedJoinMonth] = useState(false);
   const [hasSearched, setHasSearched] = useState(false);

   // Simulate search results — replace with useSearchGroupsQuery
   const [results, setResults] = useState<Group[]>([]);
   const [isSearching, setIsSearching] = useState(false);

   const handleSearch = useCallback(async () => {
      const q = searchMode === "name" ? query.trim() : codeQuery.trim();
      if (!q) return;
      setIsSearching(true);
      setSelectedId(null);
      setExpandedId(null);
      // TODO: replace with real API call
      await new Promise((r) => setTimeout(r, 600));
      const filtered = MOCK_RESULTS.filter((g) =>
         searchMode === "name"
            ? g.name.toLowerCase().includes(q.toLowerCase())
            : g.inviteCode?.toLowerCase().includes(q.toLowerCase()),
      );
      setResults(filtered);
      setHasSearched(true);
      setIsSearching(false);
   }, [searchMode, query, codeQuery]);

   const handleSelect = (id: string) => {
      setSelectedId((prev) => (prev === id ? null : id));
   };

   const handleToggleExpand = (id: string) => {
      setExpandedId((prev) => (prev === id ? null : id));
   };

   const selectedGroup = results.find((g) => g.id === selectedId);

   const handleSendRequest = async () => {
      if (!selectedId) return;
      try {
         await sendJoinRequest({
            groupId: selectedId,
            isIncludedJoinMonth,
         }).unwrap();
         Toast.success(`Join request sent to "${selectedGroup?.name}"!`);
         router.back();
      } catch (error: any) {
         Toast.error(error?.data?.message || "Failed to send join request");
      }
   };

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         className="flex-1 bg-background"
      >
         <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 48 }}
            keyboardShouldPersistTaps="handled"
         >
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pt-14 pb-6 border-b border-outline/10">
               <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.7}
                  className="w-10 h-10 rounded-full bg-surface items-center justify-center active:scale-90"
               >
                  <MaterialCommunityIcons name="arrow-left" size={22} color={Colors.icon.onDark} />
               </TouchableOpacity>
               <View className="items-center">
                  <Typography className="text-on-surface text-lg font-extrabold tracking-tight">
                     Join a Group
                  </Typography>
                  <Typography className="text-secondary-400 text-[10px] uppercase tracking-widest font-bold">
                     Find & request to join
                  </Typography>
               </View>
               <View className="w-10" />
            </View>

            <View className="px-6 pt-6 gap-5">
               {/* Search mode tabs */}
               <View className="flex-row bg-surface rounded-2xl p-1 border border-outline/15">
                  <TouchableOpacity
                     onPress={() => {
                        setSearchMode("name");
                        setResults([]);
                        setHasSearched(false);
                        setSelectedId(null);
                     }}
                     activeOpacity={0.8}
                     className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl ${
                        searchMode === "name" ? "bg-primary" : ""
                     }`}
                  >
                     <MaterialCommunityIcons
                        name="magnify"
                        size={16}
                        color={searchMode === "name" ? "#0F172A" : Colors.icon.subtle}
                     />
                     <Typography
                        className={`text-sm font-bold ${searchMode === "name" ? "text-background" : "text-secondary-300"}`}
                     >
                        Search by Name
                     </Typography>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={() => {
                        setSearchMode("code");
                        setResults([]);
                        setHasSearched(false);
                        setSelectedId(null);
                     }}
                     activeOpacity={0.8}
                     className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl ${
                        searchMode === "code" ? "bg-primary" : ""
                     }`}
                  >
                     <MaterialCommunityIcons
                        name="pound"
                        size={16}
                        color={searchMode === "code" ? "#0F172A" : Colors.icon.subtle}
                     />
                     <Typography
                        className={`text-sm font-bold ${searchMode === "code" ? "text-background" : "text-secondary-300"}`}
                     >
                        Search by Code
                     </Typography>
                  </TouchableOpacity>
               </View>

               {/* Search input */}
               {searchMode === "name" ? (
                  <View className="flex-row items-center gap-3">
                     <View className="flex-1 flex-row items-center bg-surface-container border border-outline/20 rounded-2xl px-4 h-14 gap-3">
                        <MaterialCommunityIcons name="magnify" size={20} color={Colors.icon.dim} />
                        <TextInput
                           value={query}
                           onChangeText={setQuery}
                           placeholder="Search group name..."
                           placeholderTextColor={Colors.placeholder}
                           returnKeyType="search"
                           onSubmitEditing={handleSearch}
                           className="flex-1 text-on-surface text-base"
                        />
                        {query.length > 0 && (
                           <TouchableOpacity
                              onPress={() => {
                                 setQuery("");
                                 setResults([]);
                                 setHasSearched(false);
                              }}
                           >
                              <MaterialCommunityIcons
                                 name="close-circle"
                                 size={18}
                                 color={Colors.icon.muted}
                              />
                           </TouchableOpacity>
                        )}
                     </View>
                     <TouchableOpacity
                        onPress={handleSearch}
                        activeOpacity={0.8}
                        disabled={!query.trim() || isSearching}
                        className={`w-14 h-14 rounded-2xl items-center justify-center ${
                           query.trim() ? "bg-primary active:scale-95" : "bg-surface"
                        }`}
                     >
                        {isSearching ? (
                           <ActivityIndicator size="small" color={Colors.icon.onPrimary} />
                        ) : (
                           <MaterialCommunityIcons
                              name="arrow-right"
                              size={22}
                              color={query.trim() ? "#0F172A" : "#334155"}
                           />
                        )}
                     </TouchableOpacity>
                  </View>
               ) : (
                  <View>
                     <View className="flex-row items-center gap-3">
                        <View className="flex-1 flex-row items-center bg-surface-container border border-outline/20 rounded-2xl px-4 h-14 gap-3">
                           <MaterialCommunityIcons name="pound" size={20} color={Colors.icon.primary} />
                           <TextInput
                              value={codeQuery}
                              onChangeText={(t) => setCodeQuery(t.toUpperCase())}
                              placeholder="e.g. BCHH-4821"
                              placeholderTextColor={Colors.placeholder}
                              autoCapitalize="characters"
                              autoCorrect={false}
                              returnKeyType="search"
                              onSubmitEditing={handleSearch}
                              maxLength={12}
                              className="flex-1 text-on-surface text-base font-mono font-bold tracking-widest"
                           />
                           {codeQuery.length > 0 && (
                              <TouchableOpacity
                                 onPress={() => {
                                    setCodeQuery("");
                                    setResults([]);
                                    setHasSearched(false);
                                 }}
                              >
                                 <MaterialCommunityIcons
                                    name="close-circle"
                                    size={18}
                                    color={Colors.icon.muted}
                                 />
                              </TouchableOpacity>
                           )}
                        </View>
                        <TouchableOpacity
                           onPress={handleSearch}
                           activeOpacity={0.8}
                           disabled={codeQuery.trim().length < 4 || isSearching}
                           className={`w-14 h-14 rounded-2xl items-center justify-center ${
                              codeQuery.trim().length >= 4
                                 ? "bg-primary active:scale-95"
                                 : "bg-surface"
                           }`}
                        >
                           {isSearching ? (
                              <ActivityIndicator size="small" color={Colors.icon.onPrimary} />
                           ) : (
                              <MaterialCommunityIcons
                                 name="arrow-right"
                                 size={22}
                                 color={codeQuery.trim().length >= 4 ? "#0F172A" : "#334155"}
                              />
                           )}
                        </TouchableOpacity>
                     </View>
                     <Typography className="text-secondary-400 text-xs mt-2 ml-1">
                        Enter the exact invite code shared by the group owner
                     </Typography>
                  </View>
               )}

               {/* Results */}
               {isSearching ? (
                  <View className="items-center py-12 gap-3">
                     <ActivityIndicator size="large" color={Colors.icon.primary} />
                     <Typography className="text-secondary-400 text-sm">Searching...</Typography>
                  </View>
               ) : hasSearched && results.length === 0 ? (
                  <View className="items-center py-12 gap-3">
                     <View className="w-16 h-16 rounded-full bg-surface items-center justify-center">
                        <MaterialCommunityIcons
                           name="account-search-outline"
                           size={32}
                           color={Colors.icon.muted}
                        />
                     </View>
                     <Typography className="text-on-surface font-bold text-base">
                        No groups found
                     </Typography>
                     <Typography className="text-secondary-400 text-sm text-center px-8">
                        Try a different name or check the invite code
                     </Typography>
                  </View>
               ) : results.length > 0 ? (
                  <View>
                     <Typography className="text-secondary-300 text-[10px] uppercase font-black tracking-widest mb-3 ml-1">
                        {results.length} result{results.length !== 1 ? "s" : ""} found — tap to
                        select
                     </Typography>
                     {results.map((group) => (
                        <GroupCard
                           key={group.id}
                           group={group}
                           isSelected={selectedId === group.id}
                           isExpanded={expandedId === group.id}
                           onSelect={() => handleSelect(group.id)}
                           onToggleExpand={() => handleToggleExpand(group.id)}
                        />
                     ))}
                  </View>
               ) : null}

               {/* Join options — only shown when a group is selected */}
               {selectedGroup && (
                  <View className="bg-surface-container rounded-3xl border border-primary/20 overflow-hidden">
                     {/* Selected group summary */}
                     <View className="px-4 py-4 border-b border-outline/10 flex-row items-center gap-3">
                        <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center">
                           <MaterialCommunityIcons name="account-group" size={20} color={Colors.icon.primary} />
                        </View>
                        <View className="flex-1">
                           <Typography className="text-on-surface font-bold text-[15px]">
                              {selectedGroup.name}
                           </Typography>
                           <Typography className="text-secondary-400 text-xs">
                              Selected to join
                           </Typography>
                        </View>
                        <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                           <MaterialCommunityIcons name="check" size={14} color={Colors.icon.onPrimary} />
                        </View>
                     </View>

                     {/* isIncludedJoinMonth toggle */}
                     <View className="px-4 py-4">
                        <View className="flex-row items-center justify-between">
                           <View className="flex-1 pr-4">
                              <Typography className="text-on-surface font-semibold text-[15px]">
                                 Include current month
                              </Typography>
                              <Typography className="text-secondary-400 text-xs mt-0.5 leading-relaxed">
                                 Count meals from this month in your billing. Turn off if joining
                                 from next month.
                              </Typography>
                           </View>
                           <Switch
                              value={isIncludedJoinMonth}
                              onValueChange={setIsIncludedJoinMonth}
                              trackColor={{ false: "#334155", true: Colors.icon.primary }}
                              thumbColor={isIncludedJoinMonth ? "#0F172A" : Colors.icon.subtle}
                           />
                        </View>

                        {/* Month indicator */}
                        <View
                           className={`mt-3 px-3 py-2 rounded-xl flex-row items-center gap-2 ${
                              isIncludedJoinMonth
                                 ? "bg-primary/10 border border-primary/20"
                                 : "bg-surface border border-outline/15"
                           }`}
                        >
                           <MaterialCommunityIcons
                              name="calendar-month-outline"
                              size={14}
                              color={isIncludedJoinMonth ? Colors.icon.primary : "#64748B"}
                           />
                           <Typography
                              className={`text-xs font-bold ${isIncludedJoinMonth ? "text-primary" : "text-secondary-400"}`}
                           >
                              {isIncludedJoinMonth
                                 ? "Billing starts from this month"
                                 : "Billing starts from next month"}
                           </Typography>
                        </View>
                     </View>
                  </View>
               )}

               {/* Send Request button */}
               <Button
                  onPress={handleSendRequest}
                  loading={isSending}
                  disabled={!selectedId}
                  fullWidth
                  size="lg"
                  className="rounded-2xl"
               >
                  Send Join Request
               </Button>

               <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.7}
                  className="items-center py-3"
               >
                  <Typography className="text-secondary-300 font-medium text-sm">Cancel</Typography>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}
