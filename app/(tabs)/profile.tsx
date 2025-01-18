import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import ModalNotification from "../../components/ProfileComponents/NotificationModal";

import OptionButtons from "../../components/ProfileComponents/OptionButtons";
import { getAuth, signOut } from "firebase/auth";
import {
  getUserFromDB,
  updateNotificationSettings,
} from "../../api/database/userFunctions";
import Skeleton from "../../components/SkeletonLoader";
import { showAlert } from "../../helpers/common-helper";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid as string;

  const openEmailDraft = () => {
    const email = "saer1890@example.com";
    const subject = "Feedback/bug report";
    const body = "";
    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoURL).catch((err) => {
      Alert.alert(
        "Error",
        "Unable to open email app. Please check if you have an email app installed."
      );
      console.error("Error opening email app: ", err);
    });
  };

  // State Variable
  const [profile, setProfile] = useState({
    email: "",
    notificationSettings: "Off",
  });

  // Modal Variables
  const [modalNotificationVisible, setModalNotificationVisible] =
    useState(false);

  // Error Variables
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's info
  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const result = await getUserFromDB(userId as string);
        if (result instanceof Error) {
          return result;
        }
        setProfile({
          email: result?.email || "",
          notificationSettings: result?.notificationSettings || "Off",
        });
      } catch (error) {
        showAlert("Error", "Unable to fetch user profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  // Handle notification setting change
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
        backgroundColor: "white",
      }}
    >
      <StatusBar style="dark" backgroundColor="white" />

      <View className="justify-start w-full h-full">
        <ScrollView>
          <View className="w-full justify-center items-center p-3">
            <View className="w-[70px] h-[70px] rounded-full justify-center items-center bg-[#50C878]">
              <Text className="text-3xl">🤑</Text>
            </View>
          </View>

          <View className="w-full p-6 space-y-4">
            <Text className="font-pmedium text-sm">Account Settings</Text>
            <View className="h-[60px] border flex-row items-center p-2 rounded-md space-x-5">
              <Text className="font-psemibold text-sm w-[100px]">Email</Text>
              {isLoading ? (
                <Skeleton height={30} width="60%" />
              ) : (
                <Text className="font-pmedium text-sm w-full text-[#A9A9A9]">
                  {profile.email}
                </Text>
              )}
            </View>
          </View>

          <View className="w-full p-6 space-y-4">
            <Text className="font-pmedium text-sm">App Settings</Text>
            <TouchableOpacity
              onPress={() => {
                setModalNotificationVisible(true);
              }}
              className="h-[60px] border flex-row items-center p-2 rounded-md space-x-5"
            >
              <Text className="font-psemibold text-sm w-[100px]">
                Notifications
              </Text>
              {isLoading ? (
                <Skeleton height={30} width="60%" />
              ) : (
                <Text className="font-pmedium text-base text-gray-400 mr-4">
                  {profile.notificationSettings}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="w-full p-6 space-y-4">
            <Text className="font-pmedium text-sm mb-3">Help & Support</Text>
            <OptionButtons
              emoji=""
              icon={true}
              title="Contact Support"
              onPress={openEmailDraft}
            />
            <OptionButtons
              emoji="❤️‍🔥"
              title="About"
              onPress={() => {
                router.push("/about");
              }}
            />
            <OptionButtons
              emoji="🗑️"
              title="Delete all"
              onPress={() => {
                showAlert("Careful!", "You are about to delete everything!");
              }}
            />
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
