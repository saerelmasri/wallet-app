import { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/CustomButton";

type NumpadItem = { label: any; action?: string };

const numPadData: NumpadItem[] = [
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "4" },
  { label: "5" },
  { label: "6" },
  { label: "7" },
  { label: "8" },
  { label: "9" },
  { label: "0" },
  { label: ".", action: "decimal" },
  {
    label: <Ionicons name="backspace-outline" size={45} color="white" />,
    action: "backspace",
  },
];

const NumPad = () => {
  const [input, setInput] = useState<string>("");

  const handlePress = (item: NumpadItem) => {
    if (item.action === "backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else {
      setInput((prev) => prev + item.label);
    }
  };

  const renderButton: ListRenderItem<NumpadItem> = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={{
        width: "33.33%", // Width for 3 columns
        height: 100, // Increased button height
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Text className="text-3xl font-pmedium text-white">{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#32D74B" }}>
      <SafeAreaView className="flex-1 h-full items-center">
        <View className="w-full h-full items-center">
          {/* Display area for input */}
          <View className="w-full h-[20%] justify-center items-center flex-row space-x-1">
            <Text className="text-white font-bold text-6xl">$</Text>
            <Text className="text-white font-bold text-6xl">
              {input || "00.00"}
            </Text>
          </View>

          <View className="h-[8%]" />

          {/* Numpad area */}
          <View className="w-full h-[55%] justify-center items-center">
            <FlatList
              data={numPadData}
              renderItem={renderButton}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
            />
          </View>

          {/* Custom Button at the bottom */}
          <View className="w-full h-[15%] p-3 justify-center items-center">
            <CustomButton
              title="Create"
              handlePress={() => {}}
              containerStyle="w-[90%] bg-white"
              textStyle={"text-black"}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default NumPad;
