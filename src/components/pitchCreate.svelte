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
    let PitchTitle = '';
    let PitchTagline = '';
    let PitchDescription = '';
    let PitchLaunchDate = Date.now();
    let PitchIcon = [] as any;
    let PitchThumbnail = [] as any;
    let PitchThumbnail2 = [] as any;
    let PitchThumbnail3 = [] as any;
    let PitchThumbnail4 = [] as any;
    let PitchThumbnail5 = [] as any;
    let PitchThumbnail6 = [] as any;
    
    
    onMount(async () => {
    IconUpload  = document.getElementById('IconFile') as HTMLInputElement;
    ThumbnailUpload  = document.getElementById('ThumbnailFile') as HTMLInputElement;
    ThumbnailUpload2  = document.getElementById('ThumbnailFile2') as HTMLInputElement;
    ThumbnailUpload3  = document.getElementById('ThumbnailFile3') as HTMLInputElement;
    ThumbnailUpload4  = document.getElementById('ThumbnailFile4') as HTMLInputElement;
    // The Pitch elements
    PitchIcon  = document.getElementById('PitchIconFile') as HTMLInputElement;
    PitchThumbnail  = document.getElementById('PitchThumbnailFile') as HTMLInputElement;
    PitchThumbnail2  = document.getElementById('PitchThumbnailFile2') as HTMLInputElement;
    PitchThumbnail3  = document.getElementById('PitchThumbnailFile3') as HTMLInputElement;
    PitchThumbnail4  = document.getElementById('PitchThumbnailFile4') as HTMLInputElement;
    PitchThumbnail5  = document.getElementById('PitchThumbnailFile5') as HTMLInputElement;
    PitchThumbnail6  = document.getElementById('PitchThumbnailFile6') as HTMLInputElement;
    });
    
    // functions for uploading the pitch
    async function UploadPitchIcon() {
        console.log(PitchIcon);
        try {
          if (PitchIcon !== null && PitchIcon.files) {
              PitchIcon = await appwriteStorage.createFile('646547f5019189c8092b',ID.unique(),PitchIcon.files[0]);
          }
        } catch (e) {
            console.log(e);
        }
    }
    
    async function UploadPitchThumbnail() {
        console.log(PitchThumbnail);
        try {
          if (PitchThumbnail !== null && PitchThumbnail.files) {
            PitchThumbnail = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),PitchThumbnail.files[0]);
          }
        } catch (e) {
            console.log(e);
        }
    }
    
    async function UploadPitchThumbnail2() {
        console.log(PitchThumbnail2);
        try {
          if (PitchThumbnail2 !== null && PitchThumbnail2.files) {
            PitchThumbnail2 = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),PitchThumbnail2.files[0]);
          }
        } catch (e) {
            console.log(e);
        }
    }
    
    async function UploadPitchThumbnail3() {
        console.log(PitchThumbnail3);
        try {
          if (PitchThumbnail3 !== null && PitchThumbnail3.files) {
            PitchThumbnail3 = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),PitchThumbnail3.files[0]);
          }
        } catch (e) {
            console.log(e);
        }
    }
    
    async function UploadPitchThumbnail4() {
        console.log(PitchThumbnail4);
        try {
          if (PitchThumbnail4 !== null && PitchThumbnail4.files) {
            PitchThumbnail4 = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),PitchThumbnail4.files[0]);
          }
        } catch (e) {
            console.log(e);
        }
    }
    
    async function UploadPitchThumbnail5() {
        console.log(PitchThumbnail5);
        try {
          if (PitchThumbnail5 !== null && PitchThumbnail5.files) {
            PitchThumbnail5 = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),PitchThumbnail5.files[0]);
          }
        } catch (e) {
            console.log(e);
        }
    }
    
    async function UploadPitchThumbnail6() {
        console.log(PitchThumbnail6);
        try {
          if (PitchThumbnail6 !== null && PitchThumbnail6.files) {
            PitchThumbnail6 = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),PitchThumbnail6.files[0]);
          }
        } catch (e) {
            console.log(e);
        }
    }
    
    async function createPitch() {
        // first upload the files
        await UploadPitchIcon();
        await UploadPitchThumbnail();
        await UploadPitchThumbnail2();
        await UploadPitchThumbnail3();
        await UploadPitchThumbnail4();
        await UploadPitchThumbnail5();
        await UploadPitchThumbnail6();
        // then create the post
        appwriteDatabases.createDocument(
            '646b9dd716753e384863',
            '646b9e0e29b66e4a8a22',
            ID.unique(),
            {
                'Title': PitchTitle,
                'Tagline': PitchTagline,
                'Pitch': PitchDescription,
                'LaunchDate': PitchLaunchDate,
                'Author': userName,
                'Icon': PitchIcon.$id ?? '',
                'Thumbnail': PitchThumbnail.$id ?? '',
                'Thumbnail2': PitchThumbnail2.$id ?? '',
                'Thumbnail3': PitchThumbnail3.$id ?? '',
                'Thumbnail4': PitchThumbnail4.$id ?? '',
                'Thumbnail5': PitchThumbnail5.$id ?? '',
                'Thumbnail6': PitchThumbnail6.$id ?? '',
                'Authoruid': userID,
            },
        ).then((response) => {
            console.log(response);
            // redirect to the post
            window.location.href = `/pitch/${response.$id}`;
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
            <!-- <input class="block text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-500 file:text-white
              hover:file:bg-blue-600" type="file" id="PitchIconFile" /> -->
              <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchIconFile" accept="png, jpg, jpeg, gif, svg" />
            <label for="ThumbnailFile" class="block text-sm font-medium text-gray-100">Thumbnail</label>
              <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile" accept="png, jpg, jpeg, gif, svg" />
              <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile2" accept="png, jpg, jpeg, gif, svg" />
              <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile3" accept="png, jpg, jpeg, gif, svg" />
              <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile4" accept="png, jpg, jpeg, gif, svg" />
              <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile5" accept="png, jpg, jpeg, gif, svg" />
              <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile6" accept="png, jpg, jpeg, gif, svg" />
            </div>
            <div class="flex flex-col space-y-2 justify-center items-center">
            <input type="text" class="bg-transparent outline outline-gray-500 w-64 sm:w-96 h-10 rounded-md p-2" bind:value={PitchTitle} placeholder="Title" />
            <input type="text" class="bg-transparent outline outline-gray-500 w-64 sm:w-96 h-10 rounded-md p-2" bind:value={PitchTagline} placeholder="Tagline" />
            <textarea rows="6" bind:value={PitchDescription} placeholder="Description" class="bg-transparent outline outline-gray-500 w-64 sm:w-96 rounded-md p-2"></textarea>
            </div>
            <div class="flex flex-row gap-6">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="text-gray-100">Launch Date</label>
            <input class="bg-transparent" type="datetime-local" bind:value={PitchLaunchDate}/>
            </div>
            <div class="flex flex-row justify-center items-center mt-5">
            <button on:click={createPitch} class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md self-center mx-auto my-auto">Pitch It!</button>
            </div>
    </div>
    </main>
    
    <style>
    </style>
    