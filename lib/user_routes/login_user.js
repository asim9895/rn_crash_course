import { account } from "../appwrite";

export const loginUser = async ({ email, password }) => {
  // Register User
  try {
    const response = await account.createEmailSession(email, password);
    // await account.deleteSessions();\
    console.log(response);

    return {
      response: response,
      statusCode: 200,
    };
  } catch (error) {
    console.log(JSON.stringify(error, 0, 2));
    if (
      error?.response?.message ===
      "Creation of a session is prohibited when a session is active."
    ) {
      return {
        response: "Login Successfull",
        statusCode: 200,
      };
    }
    return {
      response: error?.response?.message,
      statusCode: error?.response?.code,
    };
  }
};
