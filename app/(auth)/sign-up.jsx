import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/index";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/user_routes/create_user";

const SignUp = () => {
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);

  const submitRegisterForm = async () => {
    if (!form.username || !form.email || !form.password) {
      return Alert.alert("Error", "Please fill in all the fields");
    }
    setisLoading(true);
    const result = await createUser(form);

    if (result?.statusCode === 200) {
      Alert.alert("Success", "User created successfully");
      setisLoading(false);
      router.replace("/sign-in");
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
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            placeholder={"Enter your username"}
            value={form.username}
            handleChangeText={(value) => setform({ ...form, username: value })}
            otherStyles="mt-7"
            keyboardType="username"
          />
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
            title={"Sign Up"}
            handlePress={submitRegisterForm}
            containerStyles={"mt-7"}
            isLoading={isLoading}
          />
          <View className="justify-center pt-6 flex-row gap-2">
            <Text className="text-md text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-md font-psemibold text-secondary-100"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
