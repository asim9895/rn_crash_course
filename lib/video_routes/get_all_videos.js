import { appWriteConfig, databases } from "../appwrite";

export const getAllVideos = async () => {
  try {
    const all_videos = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId
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
