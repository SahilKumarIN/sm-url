import { Client, Account, Databases } from "appwrite";

const client = new Client();

const PROJECT_ID = import.meta.env.VITE_APP_PROJECT_ID;

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID);

export const account = new Account(client);

export const databases = new Databases(client);
