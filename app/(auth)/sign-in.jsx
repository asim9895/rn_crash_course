import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/index";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { loginUser } from "../../lib/user_routes/login_user";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);

  const submitLoginForm = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please fill in all the fields");
    }
    setisLoading(true);
    const result = await loginUser(form);

    if (result?.statusCode === 200) {
      Alert.alert("Success", "User logged in successfully");
      setisLoading(false);
      router.replace("/home");
    } else {
      console.log(result.response);
      setisLoading(false);

      return Alert.alert("Error", result.response);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image source={images.logo} className="w-[115px] h-[35px]" />
          <Text className="text-2xl mt-10 text-white text-semibold font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            placeholder={"Enter your email address"}
            value={form.email}
            handleChangeText={(value) => setform({ ...form, email: value })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder={"Enter your password"}
            value={form.password}
            handleChangeText={(value) => setform({ ...form, password: value })}
            otherStyles="mt-7"
          />
          <CustomButton
            title={"Sign In"}
            handlePress={submitLoginForm}
            containerStyles={"mt-7"}
            isLoading={isLoading}
          />
          <View className="justify-center pt-6 flex-row gap-2">
            <Text className="text-md text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-md font-psemibold text-secondary-100"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
