import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { View, TextInput, Text, TextInputProps } from "react-native";
import { cn } from "@/lib/utils";
import { Colors } from "@/constants/colors";

interface FormInputProps<T extends FieldValues> extends TextInputProps {
   control: Control<T>;
   name: Path<T>;
   label: string;
   error?: string;
}

export const FormInput = <T extends FieldValues>({
   control,
   name,
   label,
   error,
   ...props
}: FormInputProps<T>) => (
   <View className="mb-4">
      <Text className="text-secondary-300 text-xs mb-1 font-medium">{label}</Text>
      <Controller
         control={control}
         name={name}
         render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
               value={value}
               onChangeText={onChange}
               onBlur={onBlur}
               className={cn(
                  "h-12 bg-surface border rounded-lg px-4 text-on-surface",
                  error ? "border-error" : "border-outline",
               )}
               placeholderTextColor={Colors.placeholder}
               {...props}
            />
         )}
      />
      {error && <Text className="text-error text-xs mt-1">{error}</Text>}
   </View>
);
