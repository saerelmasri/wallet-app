import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ModalNotification from "@/components/ProfileComponents/NotificationModal";

import OptionButtons from "@/components/ProfileComponents/OptionButtons";
import { getAuth, signOut } from "firebase/auth";
import {
  getUserFromDB,
  updateNotificationSettings,
} from "@/api/database/userFunctions";

const Profile = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    notificationSettings: "Off",
  });
  const [modalNotificationVisible, setModalNotificationVisible] =
    useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await getUserFromDB(userId as string);

      if (result instanceof Error) {
        setError(result.message);
      } else if (result) {
        setProfile({
          email: result.email || "",
          name: result.name || "",
          notificationSettings: result.notificationSettings || "Off",
        });
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const handleNotificationChange = async (notificationType: string) => {
    const updateSettings = await updateNotificationSettings(
      userId as string,
      notificationType
    );

    if (updateSettings instanceof Error) {
      Alert.alert("Something happens");
      return;
    }
    setProfile((prev) => ({ ...prev, notificationSettings: notificationType }));
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
            <View className="h-[60px] border flex-row items-center p-2 rounded-md space-x-5">
              <Text className="font-psemibold text-sm w-[50px]">Name</Text>
              <Text className="w-full font-psemibold text-sm text-[#A9A9A9]">
                {profile.name}
              </Text>
            </View>
            <View className="h-[60px] border flex-row items-center p-2 rounded-md space-x-5">
              <Text className="font-psemibold text-sm w-[50px]">Email</Text>
              <Text className="font-psemibold text-sm w-full text-[#A9A9A9]">
                {profile.email}
              </Text>
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
              <Text className="font-pregular text-base text-gray-400 mr-4">
                {profile.notificationSettings}
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
                signOut(auth);
              }}
            />
          </View>
        </ScrollView>
      </View>

      <ModalNotification
        modalNotificationVisible={modalNotificationVisible}
        setModalNotificationVisible={setModalNotificationVisible}
        handleNotificationChange={handleNotificationChange}
        currentNotification={profile.notificationSettings}
      />
    </SafeAreaView>
  );
};

export default Profile;
