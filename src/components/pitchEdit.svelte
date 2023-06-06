<script lang="ts">
import { onMount } from "svelte";

import { bind } from "svelte/internal";
import { appwriteStorage,appwriteDatabases,appwriteUser } from "../lib/appwrite";

import { ID , Role, Permission } from "appwrite";

export let userID = '';
export let postID = '';
let IconUpload  = document.getElementById('IconFile') as HTMLInputElement;
let ThumbnailUpload  = document.getElementById('PitchThumbnailFile') as HTMLInputElement;
let ThumbnailUpload2  = document.getElementById('PitchThumbnailFile2') as HTMLInputElement;
let ThumbnailUpload3  = document.getElementById('PitchThumbnailFile3') as HTMLInputElement;
let ThumbnailUpload4  = document.getElementById('PitchThumbnailFile4') as HTMLInputElement;
let ThumbnailUpload5  = document.getElementById('PitchThumbnailFile5') as HTMLInputElement;
let ThumbnailUpload6  = document.getElementById('PitchThumbnailFile6') as HTMLInputElement;



let PitchTitle = '';
let PitchTagline = '';
let PitchDescription = '';
let PitchLaunchDate = '';
let Tag = '';
let AuthorTwitter = '';
let PitchIcon = [] as any;
let PitchThumbnail = [] as any;
let PitchThumbnail2 = [] as any;
let PitchThumbnail3 = [] as any;
let PitchThumbnail4 = [] as any;
let PitchThumbnail5 = [] as any;
let PitchThumbnail6 = [] as any;
let IsFree = true;
let PostLaunchDate = Date.now();
let currIcon = '';
let currThumbnail = '';
let currThumbnail2 = '';
let currThumbnail3 = '';
let currThumbnail4 = '';
let currThumbnail5 = '';
let currThumbnail6 = '';

onMount(async () => {
IconUpload  = document.getElementById('IconFile') as HTMLInputElement;
ThumbnailUpload  = document.getElementById('PitchThumbnailFile') as HTMLInputElement;
ThumbnailUpload2  = document.getElementById('PitchThumbnailFile2') as HTMLInputElement;
ThumbnailUpload3  = document.getElementById('PitchThumbnailFile3') as HTMLInputElement;
ThumbnailUpload4  = document.getElementById('PitchThumbnailFile4') as HTMLInputElement;
ThumbnailUpload5  = document.getElementById('PitchThumbnailFile5') as HTMLInputElement;
ThumbnailUpload6  = document.getElementById('PitchThumbnailFile6') as HTMLInputElement;

const currPost = appwriteDatabases.getDocument('646b9dd716753e384863','646b9e0e29b66e4a8a22',postID) as any;
currPost.then(function (response: any) {
    console.log(response); // Success
    PitchTitle = response.Title;
    PitchTagline = response.Tagline;
    PitchDescription = response.Pitch;
    Tag = response.Tag;
    AuthorTwitter = response.Twitter;
    IsFree = response.isFree;
    PostLaunchDate = response.LaunchDate.split('T')[0];
    currIcon = response.Icon
    currThumbnail = response.Thumbnail
    currThumbnail2 = response.Thumbnail2
    currThumbnail3 = response.Thumbnail3
    currThumbnail4 = response.Thumbnail4
    currThumbnail5 = response.Thumbnail5
    currThumbnail6 = response.Thumbnail6
}, function (error: any) {
    console.log(error); // Failure
});

});

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
async function CreatePost() {
  // first upload the files
  await UploadPitchIcon();
  await UploadPitchThumbnail();
  await UploadPitchThumbnail2();
  await UploadPitchThumbnail3();
  await UploadPitchThumbnail4();
  await UploadPitchThumbnail5();
  await UploadPitchThumbnail6();
  // then create the post
  appwriteDatabases.updateDocument(
      '646b9dd716753e384863',
      '646b9e0e29b66e4a8a22',
    postID,
      {
          'Title': PitchTitle,
          'Tagline': PitchTagline,
          'Pitch': PitchDescription,
          'LaunchDate': PostLaunchDate,
          'Tag': Tag,
          'Twitter': AuthorTwitter,
          'Icon': PitchIcon.$id ?? currIcon,
          'Thumbnail': PitchThumbnail.$id ?? currThumbnail,
          'Thumbnail2': PitchThumbnail2.$id ?? currThumbnail2,
          'Thumbnail3': PitchThumbnail3.$id ?? currThumbnail3,
          'Thumbnail4': PitchThumbnail4.$id ?? currThumbnail4,
          'Thumbnail5': PitchThumbnail5.$id ?? currThumbnail5,
          'Thumbnail6': PitchThumbnail6.$id ?? currThumbnail6,
      },
  ).then((response) => {
      console.log(response);
      // redirect to the post page
      window.location.href = `/pitch/${response.$id}`;
  }, (error) => {
      console.log(error);
      alert(error)
  });
}
</script>

<h1 class="text-3xl font-semibold text-gray-100 text-center pt-5">Create Pitch</h1>
    
<main class="flex flex-row justify-evenly p-10">
<div>
  <div class="flex flex-col space-y-2 items-center pt-20 h-[100vh]" id="Start">
    <p class="text-gray-100 text-center text-2xl pb-2 w-96">Hello! This is the pitch creation page. Here you will be able to create a pitch for your project. This pitch will be displayed on the home page of the website. Please fill out the form below to create your pitch.</p>
    <a href="#Title" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
    </div>
    <div class=" mb-5 items-center justify-center flex flex-col space-y-2">
        <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Title">
        <p class="text-gray-100 text-left text-2xl pb-2">What is the name of your pitch?</p>
        <input type="text" class="bg-transparent input-lg outline outline-purple-500 w-64 sm:w-96 h-10 rounded-md p-2" bind:value={PitchTitle} placeholder="Title" />
        <a href="#Tagline" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
        </div>
        <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Tagline">
        <p class="text-gray-100 text-left text-2xl pb-2">What is the tagline of your pitch?</p>
        <input type="text" class="bg-transparent input-lg outline outline-purple-500 w-64 sm:w-96 h-10 rounded-md p-2" bind:value={PitchTagline} placeholder="Tagline" />
        <a href="#Description" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
        </div>
        <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Description">
        <p class="text-gray-100 text-left text-2xl pb-2">Provide a description of your pitch.</p>
        <textarea rows="6" bind:value={PitchDescription} placeholder="Description" class="bg-transparent outline outline-gray-500 w-64 sm:w-96 rounded-md p-2"></textarea>
        <a href="#Tag" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
        </div>
        <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Tag">
        <p class="text-gray-100 text-left text-2xl pb-2">Select a tag that best describes your pitch.</p>
        <select class="select select-primary w-full max-w-xs" bind:value={Tag}>
          <option disabled selected>Select a tag</option>
          <option value="Productivity">Productivity</option>
          <option value="Social">Social</option>
          <option value="Utility">Utility</option>
          <option value="Entertainment">Entertainment</option>
          <option value="AI">AI</option>
          <option value="Dev Tools">Dev Tools</option>
          <option value="Web">Web</option>
          <option value="Mobile">Mobile</option>
          <option value="Desktop">Desktop</option>
          <option value="API">API</option>
          <option value="Game">Game</option>
        </select>
      <a href="#LaunchDate" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
      </div>
        <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="LaunchDate">
        <p class="text-gray-100 text-left text-2xl pb-2">Edit your launch date.</p>
        <div class="flex flex-row gap-6">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <input class="bg-transparent text-xl outline-none bg-slate-700 rounded-md p-2" type="date" bind:value={PitchLaunchDate}/>
        </div>
        <a href="#Icon" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
        </div>
        <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Icon">
          <p class="text-gray-100 text-left text-2xl pb-2">Upload an icon for your pitch.</p>
          <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchIconFile" accept="png, jpg, jpeg, gif, svg" />
          <a href="#Thumbnail" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
          </div>
          <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Thumbnail">
          <p class="text-gray-100 text-left text-2xl pb-2">Upload a thumbnail for your pitch. (Must have at least 1)</p>
          <label for="ThumbnailFile" class="block text-sm font-medium text-gray-100">Required</label>
          <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile" accept="png, jpg, jpeg, gif, svg" required />
          <label for="ThumbnailFile2" class="block text-sm font-medium text-gray-100">Optional</label>
          <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile2" accept="png, jpg, jpeg, gif, svg" />
          <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile3" accept="png, jpg, jpeg, gif, svg" />
          <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile4" accept="png, jpg, jpeg, gif, svg" />
          <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile5" accept="png, jpg, jpeg, gif, svg" />
          <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" id="PitchThumbnailFile6" accept="png, jpg, jpeg, gif, svg" />
          <a href="#Team" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
          </div>
        <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Team">
        <p class="text-gray-100 text-left text-2xl pb-2">What is the Twitter username for this project? (Optional)</p>
        <input type="text" bind:value={AuthorTwitter} placeholder="@username" class="bg-transparent outline outline-gray-500 w-64 sm:w-96 rounded-md p-2"/>
        <a href="#Pitch" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
        </div>
        <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Pitch">
        <p class="text-gray-100 text-left text-2xl pb-2">Are You Ready?</p>
        <div class="flex flex-row justify-center items-center mt-5">
        <button on:click={CreatePost} class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md self-center mx-auto my-auto">Post Edits!</button>
        </div>
    </div>
</main>
