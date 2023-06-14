import { Client, Account, ID, Databases, Permission, Role, Teams, Storage, Models } from 'appwrite';

// dotenv
import dotenv from 'dotenv';
dotenv.config();

export const appwriteClient = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // My API Endpoint
    .setProject(process.env.AppwriteProjectKey) // My project ID

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
    Tag: string;
}


export interface ProductList extends Models.DocumentList<Products> {
[x: string]: any;
}

export interface Pitch extends Models.Document {
    Title: string;
    Author: string;
    LaunchDate: string;
    Tagline: string;
    Pitch: string;
    Icon: string;
    Thumbnail: string;
}

export interface PitchList extends Models.DocumentList<Pitch> {
    [x: string]: any;
}