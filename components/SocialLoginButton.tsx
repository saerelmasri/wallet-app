import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

type SocialLoginButton = {
  loginType: "Google" | "Apple";
  handleLogin: () => void;
  isLoading?: boolean;
  extraStyle?: string;
};

import images from "@/constants/images";

const SocialLoginButton = ({
  loginType,
  handleLogin,
  isLoading,
  extraStyle,
}: SocialLoginButton) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleLogin}
      className={`w-[60px] h-[60px] rounded-full justify-center items-center bg-[#EEE5FF] ${extraStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Image
        source={loginType == "Google" ? images.google : images.apple}
        resizeMode="contain"
        className="w-[30px] h-[30px]"
      />
    </TouchableOpacity>
  );
};

export default SocialLoginButton;
