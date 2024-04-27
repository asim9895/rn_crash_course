import { Query } from "react-native-appwrite";
import { appWriteConfig, databases } from "../appwrite";

export const getLatestVideos = async () => {
  try {
    const all_videos = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    if (!all_videos) {
      return {
        response: [],
        statusCode: 400,
      };
    }

    return {
      response: all_videos.documents,
      statusCode: 200,
    };
  } catch (error) {
    console.log("error", JSON.stringify(error, 0, 2));
    return {
      response: [],
      statusCode: error?.response?.code,
    };
  }
};
