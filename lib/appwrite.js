import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.orraa",
  projectId: "662b7aa748478d893fb3",
  databaseId: "662b930c54cba5278a1c",
  userCollectionId: "662b933795d5880f44bc",
  videoCollectionId: "662b93585cfcb38e6e95",
  storageId: "662b94963b988f88a406",
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId) // Your project ID
  .setPlatform(appWriteConfig.platform); // Your application ID or bundle ID.

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
