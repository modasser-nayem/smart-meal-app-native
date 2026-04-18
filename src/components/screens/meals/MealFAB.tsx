import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface MealFABProps {
   onPress: () => void;
}

export const MealFAB = ({ onPress }: MealFABProps) => {
   return (
      <TouchableOpacity
         onPress={onPress}
         activeOpacity={0.85}
         className="absolute bottom-6 right-5 w-14 h-14 rounded-2xl bg-primary items-center justify-center active:scale-95"
         style={{ elevation: 8 }}
      >
         <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#0F172A" />
      </TouchableOpacity>
   );
};
