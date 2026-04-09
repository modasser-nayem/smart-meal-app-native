import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface MealFABProps {
   onPress: () => void;
}

export const MealFAB = ({ onPress }: MealFABProps) => {
   return (
      <TouchableOpacity
         onPress={onPress}
         className="absolute bottom-[5%] right-6 w-16 h-16 rounded-full bg-primary shadow-2xl shadow-orange-500/40 items-center justify-center active:scale-95"
      >
         <MaterialCommunityIcons
            name="plus"
            size={32}
            color="#0F172A"
         />
      </TouchableOpacity>
   );
};
