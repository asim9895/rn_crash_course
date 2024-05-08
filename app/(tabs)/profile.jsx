import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import EmptyState from "../components/EmptyState";
import useAppwrite from "../../lib/useAppWrite";
import VideoCard from "../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserVideos } from "../../lib/video_routes/get_user_videos";
import { signOut } from "../../lib/user_routes/sign_out";

const Profile = () => {
  const { user, setuser, setisLoggedIn } = useGlobalContext();
  const {
    data: posts,
    refetch,
    isLoading,
  } = useAppwrite(() => getUserVideos(user.$id));

  const [refreshing, setRefreshing] = useState(false);
  const logout = async () => {
    await signOut();
    setuser(null);
    setisLoggedIn(false);

    router.replace("/sign-in");
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return (
            <VideoCard
              title={item.title}
              thumbnail={item.thumbnail}
              video={item.video}
              creator={item.creator.username}
              avatar={item.creator.avatar}
            />
          );
        }}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <View className={"mt-5"}>
              <Text className={`text-white text-center font-psemibold text-lg`}>
                {user.username}
              </Text>
            </View>

            <View className="mt-5 flex flex-row">
              <View className={"mr-10"}>
                <Text
                  className={`text-white text-center font-psemibold text-xl`}
                >
                  {posts.length || 0}
                </Text>
                <Text className="text-sm text-gray-100 text-center font-pregular">
                  Posts
                </Text>
              </View>
              <View className={"ml-10"}>
                <Text
                  className={`text-white text-center font-psemibold text-xl`}
                >
                  1.2k
                </Text>
                <Text className="text-sm text-gray-100 text-center font-pregular">
                  Followers
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No videos found"}
            subtitle={"Be the first one to upload a video"}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
