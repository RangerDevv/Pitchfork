<script lang="ts">
import { onMount } from "svelte";

  import { bind } from "svelte/internal";
import { appwriteStorage,appwriteDatabases,appwriteUser } from "../lib/appwrite";

import { ID , Role, Permission } from "appwrite";

export let userID = '';
export let userName = '';
let IconUpload  = document.getElementById('IconFile') as HTMLInputElement;
let ThumbnailUpload  = document.getElementById('ThumbnailFile') as HTMLInputElement;
let ThumbnailUpload2  = document.getElementById('ThumbnailFile2') as HTMLInputElement;
let ThumbnailUpload3  = document.getElementById('ThumbnailFile3') as HTMLInputElement;
let ThumbnailUpload4  = document.getElementById('ThumbnailFile4') as HTMLInputElement;

let isProduct = false;

let PostTitle = '';
let PostTagline = '';
let PostDescription = '';
let PostLink = '';
let Icon = [] as any;
let Thumbnail = [] as any;
let IsFree = true;
let PostLaunchDate = Date.now();

onMount(async () => {
  IconUpload  = document.getElementById('IconFile') as HTMLInputElement;
  ThumbnailUpload  = document.getElementById('ThumbnailFile') as HTMLInputElement;
  ThumbnailUpload2  = document.getElementById('ThumbnailFile2') as HTMLInputElement;
  ThumbnailUpload3  = document.getElementById('ThumbnailFile3') as HTMLInputElement;
  ThumbnailUpload4  = document.getElementById('ThumbnailFile4') as HTMLInputElement;
});

async function UploadIcon() {
    console.log(IconUpload);
    try {
      if (IconUpload !== null && IconUpload.files) {
          Icon = await appwriteStorage.createFile('646547f5019189c8092b',ID.unique(),IconUpload.files[0]);
      }
    } catch (e) {
        console.log(e);
    }
}

async function UploadThumbnail() {
    console.log(ThumbnailUpload);
    try {
      if (ThumbnailUpload !== null && ThumbnailUpload.files) {
          Thumbnail = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),ThumbnailUpload.files[0]);
      }
      if (ThumbnailUpload2 !== null && ThumbnailUpload2.files) {
          Thumbnail = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),ThumbnailUpload2.files[0]);
      }
      if (ThumbnailUpload3 !== null && ThumbnailUpload3.files) {
          Thumbnail = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),ThumbnailUpload3.files[0]);
      }
      if (ThumbnailUpload4 !== null && ThumbnailUpload4.files) {
          Thumbnail = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),ThumbnailUpload4.files[0]);
      }
    } catch (e) {
        console.log(e);
    }
}

async function CreatePost() {
    // first upload the files
    await UploadIcon();
    await UploadThumbnail();
    // then create the post
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
            'Author': userName,
            'Icon': Icon.$id ?? '',
            'Thumbnail': [...Thumbnail ?? [] , Thumbnail],
            'Authoruid': userID,
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

<h1 class="text-3xl font-semibold text-gray-100 text-center pt-5">Create Post</h1>

<main class="flex flex-row justify-evenly p-10">
    <div>
    <div class=" mb-5 items-center justify-center flex flex-col space-y-2">
    <label for="IconFile" class="block text-sm font-medium text-gray-100">Icon</label>
    <input class="block text-sm text-gray-300
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600" type="file" id="IconFile" />
    <label for="ThumbnailFile" class="block text-sm font-medium text-gray-100">Thumbnail</label>
    <input class="block text-sm text-gray-300
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600" type="file" id="ThumbnailFile" />
      <input class="block text-sm text-gray-300
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600" type="file" id="ThumbnailFile2" />
      <input class="block text-sm text-gray-300
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600" type="file" id="ThumbnailFile3" />
      <input class="block text-sm text-gray-300
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600" type="file" id="ThumbnailFile4" />
    </div>
    <div class="flex flex-col space-y-2 justify-center items-center">
    <input type="text" class="bg-transparent outline outline-gray-500 w-64 sm:w-96 h-10 rounded-md p-2" bind:value={PostTitle} placeholder="Title" />
    <input type="text" class="bg-transparent outline outline-gray-500 w-64 sm:w-96 h-10 rounded-md p-2" bind:value={PostTagline} placeholder="Tagline" />
    <textarea rows="6" bind:value={PostDescription} placeholder="Description" class="bg-transparent outline outline-gray-500 w-64 sm:w-96 rounded-md p-2"></textarea>
    <input type="text" class="bg-transparent outline outline-gray-500 w-64 sm:w-96 h-10 rounded-md p-2" bind:value={PostLink} placeholder="Link" />
    <div class="flex flex-row-reverse gap-6">
    <input type="checkbox" bind:checked={IsFree} class="h-5 w-5 text-gray-100 rounded-md bg-transparent" />
    <label class="text-gray-100">Is your product free?</label>
    </div>
    <div class="flex flex-row gap-6">
    <label class="text-gray-100">Launch Date</label>
    <input class="bg-transparent" type="date" bind:value={PostLaunchDate}/>
    </div>
    </div>
    <div class="flex flex-row justify-center items-center mt-5">
    <button on:click={CreatePost} class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md self-center mx-auto my-auto">Create Post</button>
    </div>
    </div>
</main>

<style>
</style>
