import { Query } from "react-native-appwrite";
import { appWriteConfig, databases } from "../appwrite";

export const getUserVideos = async (userId) => {
  console.log("called");
  try {
    console.log("called 2");
    const all_videos = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    console.log("video", all_videos);
    console.log("called 2.0");

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
    console.log("called 3");
    console.log("error", JSON.stringify(error, 0, 2));
    return {
      response: [],
      statusCode: error?.response?.code,
    };
  }
};
