import { Client, Account, TablesDB } from 'appwrite';

const API_ENDPOINT = import.meta.env.VITE_APPWRITE_API_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

export const client = new Client()
  .setEndpoint(API_ENDPOINT)
  .setProject(PROJECT_ID);

export const tablesDB = new TablesDB(client);
export const account = new Account(client);
export { ID } from 'appwrite';
