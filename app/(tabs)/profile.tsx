import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ModalNotification from "@/components/ProfileComponents/NotificationModal";

import OptionButtons from "@/components/ProfileComponents/OptionButtons";
import auth from "@react-native-firebase/auth";

const Profile = () => {
  const [name, setName] = useState("");
  const [notification, setNotification] = useState("Off");

  const [modalNotificationVisible, setModalNotificationVisible] =
    useState(false);

  const handleNotificationChange = (notificationType: string) => {
    setNotification(notificationType);
    setModalNotificationVisible(false);
  };

  return (
    <SafeAreaView
      className="flex-1 h-full"
      style={{
        paddingBottom: 20,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: modalNotificationVisible
          ? "rgba(0, 0, 0, 0.5)"
          : "white",
      }}
    >
      <View className="justify-start w-full h-full">
        <Text className="text-black font-psemibold text-2xl p-6">Settings</Text>
        <ScrollView>
          <View className="w-full justify-center items-center p-3">
            <View className="w-[70px] h-[70px] rounded-full justify-center items-center bg-[#50C878]">
              <Text className="text-3xl">🤑</Text>
            </View>
          </View>

          <View className="w-full p-6 space-y-4">
            <Text className="font-pmedium text-sm">Account Settings</Text>
            <View className="border flex-row items-center p-2 rounded-md space-x-5">
              <Text className="font-psemibold text-sm w-[50px]">Name</Text>
              <TextInput
                className="w-[200px] h-12 text-black font-pregular text-base pr-3"
                value={name}
                placeholder={"Saer"}
                placeholderTextColor="#A9A9A9"
                onChangeText={(value) => {
                  setName(value);
                }}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View className="border flex-row items-center p-2 rounded-md space-x-5">
              <Text className="font-psemibold text-sm w-[50px]">Email</Text>
              <TextInput
                className="w-[200px] h-12 text-black font-pregular text-base pr-3"
                value={name}
                placeholder={"saer@gmail.com"}
                placeholderTextColor="#A9A9A9"
                onChangeText={(value) => {
                  setName(value);
                }}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View className="w-full p-6 space-y-4">
            <Text className="font-pmedium text-sm">App Settings</Text>
            <TouchableOpacity
              onPress={() => {
                setModalNotificationVisible(true);
              }}
              className="border flex-row justify-between items-center p-2 rounded-md space-x-5 h-16"
            >
              <Text className="font-psemibold text-sm">Notifications</Text>
              <Text className="font-pregular text-base text-gray-400">
                {notification}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full p-6 space-y-4">
            <Text className="font-pmedium text-sm mb-3">Help & Support</Text>
            <OptionButtons emoji="" icon={true} title="Contact Support" />
            <OptionButtons emoji="❤️‍🔥" title="About" />
            <OptionButtons emoji="🗑️" title="Delete all" />
            <OptionButtons
              emoji="👋"
              title="Log out"
              onPress={() => {
                auth().signOut();
              }}
            />
          </View>
        </ScrollView>
      </View>

      <ModalNotification
        modalNotificationVisible={modalNotificationVisible}
        setModalNotificationVisible={setModalNotificationVisible}
        handleNotificationChange={handleNotificationChange}
        currentNotification={notification}
      />
    </SafeAreaView>
  );
};

export default Profile;
