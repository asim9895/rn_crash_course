import { Query } from "react-native-appwrite";
import { account, appWriteConfig, databases } from "../appwrite";

export const getLoggedInUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      return {
        response: "No user found",
        statusCode: 400,
      };
    }

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("account_id", currentAccount.$id)]
    );

    if (!currentUser) {
      return {
        response: "No user found",
        statusCode: 400,
      };
    }

    return {
      response: currentUser.documents[0],
      statusCode: 200,
    };
  } catch (error) {
    return {
      response: error?.response?.message,
      statusCode: error?.response?.code,
    };
  }
};
