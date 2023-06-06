<script lang="ts">
import { onMount } from "svelte";

import { bind } from "svelte/internal";
import { appwriteStorage,appwriteDatabases,appwriteUser } from "../lib/appwrite";

import { ID , Role, Permission } from "appwrite";

export let userID = '';
export let postID = '';
let IconUpload  = document.getElementById('IconFile') as HTMLInputElement;
let ThumbnailUpload  = document.getElementById('ThumbnailFile') as HTMLInputElement;
let ThumbnailUpload2  = document.getElementById('ThumbnailFile2') as HTMLInputElement;
let ThumbnailUpload3  = document.getElementById('ThumbnailFile3') as HTMLInputElement;
let ThumbnailUpload4  = document.getElementById('ThumbnailFile4') as HTMLInputElement;



let PostTitle = '';
let PostTagline = '';
let PostDescription = '';
let PostLink = 'https://';
let Tag = '';
let AuthorTwitter = '';
let Icon = [] as any;
let Thumbnail = [] as any;
let Thumbnail2 = [] as any;
let Thumbnail3 = [] as any;
let Thumbnail4 = [] as any;
let IsFree = true;
let PostLaunchDate = Date.now();

onMount(async () => {
IconUpload  = document.getElementById('IconFile') as HTMLInputElement;
ThumbnailUpload  = document.getElementById('ThumbnailFile') as HTMLInputElement;
ThumbnailUpload2  = document.getElementById('ThumbnailFile2') as HTMLInputElement;
ThumbnailUpload3  = document.getElementById('ThumbnailFile3') as HTMLInputElement;
ThumbnailUpload4  = document.getElementById('ThumbnailFile4') as HTMLInputElement;

const currPost = appwriteDatabases.getDocument('646538e35dd17306c589','646538eeeface7a4cd39',postID) as any;
currPost.then(function (response: any) {
    console.log(response); // Success
    PostTitle = response.Name;
    PostTagline = response.Tagline;
    PostDescription = response.Description;
    PostLink = response.Link;
    Tag = response.Tag;
    AuthorTwitter = response.Twitter;
    IsFree = response.isFree;
    PostLaunchDate = response.LaunchDate.split('T')[0];
    Thumbnail = response.thumbnail as any || [];
    Thumbnail2 = response.thumbnail2 as any || [];
    Thumbnail3 = response.thumbnail3 as any || [];
    Thumbnail4 = response.thumbnail4 as any || [];
    Icon = response.icon as any || [];
}, function (error: any) {
    console.log(error); // Failure
});

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
  } catch (e) {
      console.log(e);
  }
}

async function UploadThumbnail2() {
  console.log(ThumbnailUpload2);
  try {
    if (ThumbnailUpload2 !== null && ThumbnailUpload2.files) {
        Thumbnail2 = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),ThumbnailUpload2.files[0]);
    }
  } catch (e) {
      console.log(e);
  }
}

async function UploadThumbnail3() {
  console.log(ThumbnailUpload3);
  try {
    if (ThumbnailUpload3 !== null && ThumbnailUpload3.files) {
        Thumbnail3 = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),ThumbnailUpload3.files[0]);
    }
  } catch (e) {
      console.log(e);
  }
}

async function UploadThumbnail4() {
  console.log(ThumbnailUpload4);
  try {
    if (ThumbnailUpload4 !== null && ThumbnailUpload4.files) {
        Thumbnail4 = await appwriteStorage.createFile('64661e622715cf602c83',ID.unique(),ThumbnailUpload4.files[0]);
    }
  } catch (e) {
      console.log(e);
  }
}

async function CreatePost() {
  // first upload the files
  await UploadIcon();
  await UploadThumbnail();
  await UploadThumbnail2();
  await UploadThumbnail3();
  await UploadThumbnail4();
  // then create the post
  appwriteDatabases.updateDocument(
      '646538e35dd17306c589',
      '646538eeeface7a4cd39',
    postID,
      {
          'Name': PostTitle,
          'Tagline': PostTagline,
          'Description': PostDescription,
          'Link': PostLink,
          'Free': IsFree,
          'LaunchDate': PostLaunchDate,
          'Icon': Icon.$id ?? '',
          'Thumbnail': Thumbnail.$id ?? '',
          'Thumbnail2': Thumbnail2.$id ?? '',
          'Thumbnail3': Thumbnail3.$id ?? '',
          'Thumbnail4': Thumbnail4.$id ?? '',
          'Tag': Tag,
          'Twitter': AuthorTwitter,
      },
  ).then((response) => {
      console.log(response);
      // redirect to the post page
      window.location.href = `/post/${response.$id}`;
  }, (error) => {
      console.log(error);
      alert(error)
  });
}
</script>

<h1 class="text-3xl font-semibold text-gray-100 text-center pt-5">Edit Post</h1>

<main class="flex flex-row justify-evenly p-10">
    <div>
      <div class="flex flex-col space-y-2 items-center pt-20 h-[100vh]" id="Start">
        <p class="text-gray-100 text-center text-2xl pb-2 w-96">Edit your post! Click next to get started.</p>
        <a href="#Title" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
        </div>
        <div class=" mb-5 items-center justify-center flex flex-col space-y-2">
            <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Title">
            <p class="text-gray-100 text-left text-2xl pb-2">Product Name</p>
            <input type="text" class="bg-transparent input-lg outline outline-purple-500 w-64 sm:w-96 h-10 rounded-md p-2" bind:value={PostTitle} placeholder="Title" />
            <a href="#Tagline" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
            </div>
            <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Tagline">
            <p class="text-gray-100 text-left text-2xl pb-2">Tagline</p>
            <input type="text" class="bg-transparent input-lg outline outline-purple-500 w-64 sm:w-96 h-10 rounded-md p-2" bind:value={PostTagline} placeholder="Tagline" />
            <a href="#Description" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
            </div>
            <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Description">
            <p class="text-gray-100 text-left text-2xl pb-2">Description</p>
            <textarea rows="6" bind:value={PostDescription} placeholder="Description" class="bg-transparent outline outline-gray-500 w-64 sm:w-96 rounded-md p-2"></textarea>
            <a href="#Tag" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
            </div>
            <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Tag">
            <p class="text-gray-100 text-left text-2xl pb-2">Tag</p>
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
            <a href="#Link" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
            </div>
            <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Link">
            <p class="text-gray-100 text-left text-2xl pb-2">Product Link</p>
            <input type="text" class="bg-transparent input-lg outline outline-purple-500 w-64 sm:w-96 h-10 rounded-md p-2" bind:value={PostLink} placeholder="Link" />
            <a href="#Free" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
            </div>
            <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Free">
            <p class="text-gray-100 text-left text-2xl pb-2">Is your product free?</p>
            <div class="form-control">
                <label class="cursor-pointer label">
                  <input type="checkbox" class="checkbox checkbox-lg checkbox-success" bind:checked={IsFree}/>
                </label>
              </div>
              <a href="#LaunchDate" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
            </div>
            <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="LaunchDate">
            <p class="text-gray-100 text-left text-2xl pb-2">Launch Date</p>
            <div class="flex flex-row gap-6">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <input class="bg-transparent text-xl outline-none bg-slate-700 rounded-md p-2" type="date" bind:value={PostLaunchDate}/>
            </div>
            <a href="#Team" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
            </div>
            <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="Team">
                <p class="text-gray-100 text-left text-2xl pb-2">What is the Twitter username for this project? (Optional)</p>
                <input type="text" bind:value={AuthorTwitter} placeholder="@username" class="bg-transparent outline outline-gray-500 w-64 sm:w-96 rounded-md p-2"/>
                <a href="#product" class="text-gray-100 text-xl mt-7 btn btn-primary normal-case">Next</a>
            </div>
            <div class="flex flex-col space-y-2 justify-center items-center h-[100vh]" id="product">
            <p class="text-gray-100 text-left text-2xl pb-2">Are You Ready?</p>
            <div class="flex flex-row justify-center items-center mt-5">
            <button on:click={CreatePost} class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md self-center mx-auto my-auto">Post Changes 🚀</button>
            </div>
        </div>
</main>
