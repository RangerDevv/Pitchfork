<script lang="ts">

  import { bind } from "svelte/internal";
import { appwriteStorage,appwriteDatabases,appwriteUser } from "../lib/appwrite";

import { ID , Role, Permission } from "appwrite";

export let userID = '';
let IconUpload  = document.getElementById('IconFile') as HTMLInputElement;
let ThumbnailUpload  = document.getElementById('ThumbnailFile') as HTMLInputElement;


let PostTitle = '';
let PostTagline = '';
let PostDescription = '';
let PostLink = '';
let Icon = [] as any;
let Thumbnail = [] as any;
let IsFree = true;
let PostLaunchDate = Date.now();

async function UploadIcon() {
    try {
      if (IconUpload !== null && IconUpload.files) {
          Icon = await appwriteStorage.createFile('646547f5019189c8092b',ID.unique(),IconUpload.files[0]);
      }
    } catch (e) {
        console.log(e);
    }
}

async function UploadThumbnail() {
    try {
      if (ThumbnailUpload !== null && ThumbnailUpload.files) {
          Thumbnail = await appwriteStorage.createFile('646547f5019189c8092b',ID.unique(),ThumbnailUpload.files[0]);
      }
    } catch (e) {
        console.log(e);
    }
}

async function CreatePost() {
    appwriteDatabases.createDocument(
        '646538e35dd17306c589',
        '646538eeeface7a4cd39',
        ID.unique(),
        {
            'Name': PostTitle,
            'Tagline': PostTagline,
            'Description': PostDescription,
            'Link': PostLink,
            'Free': IsFree,
            'LaunchDate': PostLaunchDate,
            'Author': userID,
            'Icon': Icon.$id,
            'Thumbnail': Thumbnail.$id,
        },
    ).then((response) => {
        console.log(response);
        UploadIcon();
        UploadThumbnail();
    }, (error) => {
        console.log(error);
    });
}

</script>

<main>
    <input type="file" id="IconFile" />
    <input type="file" id="ThumbnailFile" />
    <input type="text" bind:value={PostTitle} placeholder="Title" />
    <input type="text" bind:value={PostTagline} placeholder="Tagline" />
    <input type="text" bind:value={PostDescription} placeholder="Description" />
    <input type="text" bind:value={PostLink} placeholder="Link" />
    <input type="checkbox" bind:checked={IsFree} />
    <input type="date" bind:value={PostLaunchDate} />
    <button on:click={CreatePost}>Create Post</button>
</main>