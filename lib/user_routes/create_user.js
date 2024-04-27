import { ID } from "react-native-appwrite";
import { account, appWriteConfig, avatars, databases } from "../appwrite";

export const createUser = async ({ username, email, password }) => {
  // Register User
  try {
    const response = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    const avatarURL = avatars.getInitials(username);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        email,
        username,
        avatar: avatarURL,
        account_id: response?.$id,
      }
    );

    return {
      response: newUser,
      statusCode: 200,
    };
  } catch (error) {
    return {
      response: error?.response?.message,
      statusCode: error?.response?.code,
    };
  }
};
