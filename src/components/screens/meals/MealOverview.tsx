import { View, FlatList, ActivityIndicator } from "react-native";
import { useGetMealsQuery } from "../../../api/mealApi";
import { Card } from "@/components/ui/Card";
import { Typography } from "@/components/ui/Typography";

export const MealOverview = () => {
   const { data: meals, isLoading, error } = useGetMealsQuery();

   if (isLoading) {
      return (
         <View className="flex-1 justify-center items-center">
            <ActivityIndicator
               size="large"
               color="#F59E0B"
            />
         </View>
      );
   }

   if (error) {
      return (
         <View className="flex-1 justify-center items-center p-4">
            <Typography
               variant="body"
               className="text-danger text-center"
            >
               Failed to load meals. Please try again.
            </Typography>
         </View>
      );
   }

   return (
      <FlatList
         data={meals}
         keyExtractor={(item) => item.id}
         renderItem={({ item }) => (
            <Card className="mb-4">
               <View className="flex-row justify-between items-center">
                  <View>
                     <Typography variant="h3">{item.date}</Typography>
                     <Typography variant="caption">
                        Quantity: {item.quantity}
                     </Typography>
                  </View>
                  <Typography
                     variant="body"
                     className="text-primary font-bold"
                  >
                     Details
                  </Typography>
               </View>
            </Card>
         )}
         ListEmptyComponent={
            <View className="flex-1 justify-center items-center pt-10">
               <Typography variant="body">No meals recorded yet.</Typography>
            </View>
         }
         contentContainerStyle={{ paddingBottom: 24 }}
      />
   );
};
