import { Client, Account, ID, Databases, Permission, Role, Teams, Storage, Models } from 'appwrite';

export const appwriteClient = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('646538bf8be3792191bd'); // Your project ID

export const appwriteDatabases = new Databases(appwriteClient);
export const appwriteStorage = new Storage(appwriteClient);
export const appwriteUser = new Account(appwriteClient);
export const appwriteTeams = new Teams(appwriteClient);

export interface Products extends Models.Document {
    Name: string;
    Author: string;
    LaunchDate: string;
    Tagline: string;
    Description: string;
    Free: boolean;
    Icon: string;
    Thumbnail: string;
    Link?: string;
}


export interface ProductList extends Models.DocumentList<Products> {
[x: string]: any;
}