import { Tabs, Stack, router, useFocusEffect } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AppwriteContextProvider } from "@/services/AppwriteContext";
import AppwriteService from "@/services/appwrite";
import { RecoilRoot } from "recoil";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isLogin, setIsLogin] = useState<boolean>(false);



  return (
    <RecoilRoot>
      <Stack
        screenOptions={{
          headerShown: false,
        }}

      >
        <Stack.Screen
          initialParams={AppwriteService}
          name="init"
          options={{
            title: "Explore",
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="otpVerification"
          options={{
            title: "verify OTP",
          }}
        />
      </Stack>
    </RecoilRoot>
  );
}
