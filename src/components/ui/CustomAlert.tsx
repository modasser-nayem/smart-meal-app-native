import { Modal, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Typography } from "@/components/ui/Typography";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertVariant = "default" | "danger" | "success" | "warning";

export interface AlertAction {
   label: string;
   onPress: () => void;
   variant?: AlertVariant;
}

interface CustomAlertProps {
   visible: boolean;
   onClose: () => void;
   icon?: string;
   iconVariant?: AlertVariant;
   title: string;
   message: string;
   actions: AlertAction[];
}

// ─── Variant styles ───────────────────────────────────────────────────────────

const ICON_BG: Record<AlertVariant, string> = {
   default: "bg-primary/10",
   danger: "bg-error/10",
   success: "bg-success/10",
   warning: "bg-warning/10",
};

const ICON_COLOR: Record<AlertVariant, string> = {
   default: "#F59E0B",
   danger: "#EF4444",
   success: "#22C55E",
   warning: "#F59E0B",
};

const BTN_STYLE: Record<AlertVariant, string> = {
   default: "bg-primary",
   danger: "bg-error",
   success: "bg-success",
   warning: "bg-warning",
};

const BTN_TEXT: Record<AlertVariant, string> = {
   default: "text-background",
   danger: "text-white",
   success: "text-background",
   warning: "text-background",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const CustomAlert = ({
   visible,
   onClose,
   icon = "information-outline",
   iconVariant = "default",
   title,
   message,
   actions,
}: CustomAlertProps) => {
   return (
      <Modal
         visible={visible}
         transparent
         animationType="fade"
         statusBarTranslucent
         onRequestClose={onClose}
      >
         {/* Backdrop */}
         <TouchableWithoutFeedback onPress={onClose}>
            <View className="flex-1 bg-black/60 items-center justify-center px-6" />
         </TouchableWithoutFeedback>

         {/* Card — absolutely centered */}
         <View className="absolute inset-0 items-center justify-center px-6 pointer-events-none">
            <View className="w-full bg-surface-container rounded-3xl overflow-hidden border border-outline/15 pointer-events-auto">
               {/* Top accent line */}
               <View
                  className="h-[3px] w-full"
                  style={{ backgroundColor: ICON_COLOR[iconVariant] }}
               />

               <View className="px-6 pt-6 pb-5 items-center gap-4">
                  {/* Icon */}
                  <View
                     className={`w-14 h-14 rounded-2xl items-center justify-center ${ICON_BG[iconVariant]}`}
                  >
                     <MaterialCommunityIcons
                        name={icon as any}
                        size={28}
                        color={ICON_COLOR[iconVariant]}
                     />
                  </View>

                  {/* Text */}
                  <View className="items-center gap-1.5">
                     <Typography className="text-on-surface text-lg font-extrabold tracking-tight text-center">
                        {title}
                     </Typography>
                     <Typography className="text-secondary-300 text-sm text-center leading-relaxed">
                        {message}
                     </Typography>
                  </View>

                  {/* Actions */}
                  <View className="w-full gap-2.5 mt-1">
                     {actions.map((action, i) => {
                        const variant = action.variant ?? "default";
                        const isGhost = variant === "default" && i > 0;

                        return isGhost ? (
                           <TouchableOpacity
                              key={action.label}
                              onPress={action.onPress}
                              activeOpacity={0.7}
                              className="w-full h-12 items-center justify-center rounded-2xl border border-outline/20 active:bg-surface"
                           >
                              <Typography className="text-secondary-300 font-semibold text-sm">
                                 {action.label}
                              </Typography>
                           </TouchableOpacity>
                        ) : (
                           <TouchableOpacity
                              key={action.label}
                              onPress={action.onPress}
                              activeOpacity={0.8}
                              className={`w-full h-12 items-center justify-center rounded-2xl active:opacity-80 ${BTN_STYLE[variant]}`}
                           >
                              <Typography className={`font-bold text-sm ${BTN_TEXT[variant]}`}>
                                 {action.label}
                              </Typography>
                           </TouchableOpacity>
                        );
                     })}
                  </View>
               </View>
            </View>
         </View>
      </Modal>
   );
};
