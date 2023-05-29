<script lang="ts">
import { appwriteClient,appwriteDatabases,appwriteStorage} from "../lib/appwrite";

import { Query } from "appwrite";

let searchTerms = "";
let PitchResults = [] as any;
let dummyArray = [
    {
        "Title": "ReWrit",
        "Tagline": "ReWrit is a platform for writers to share their work and get feedback from other writers.",
        "Description": "ReWrit is cool",
    },
    {
        "Title": "Harry Potter",
        "Tagline": "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling.",
        "Description": "Harry Potter is cool",
    }
] as any;
let postResults = [] as any;

async function search() {
    PitchResults = await appwriteDatabases.listDocuments(
    '646b9dd716753e384863',
	'646b9e0e29b66e4a8a22',
	[
        Query.search("Title", searchTerms)
	]
    );

    postResults = await appwriteDatabases.listDocuments(
    '646b9dd716753e384863',
    '646b9e0e29b66e4a8a22',
    [
        Query.search("Title", searchTerms)
    ]
    );

    console.log(PitchResults);
    console.log(PitchResults.documents);
    console.log(PitchResults.documents[0]);
    console.log(PitchResults.documents[0].Title);

    console.log(dummyArray);
    console.log(dummyArray[0]);
}

</script>

<main>
<!-- The button to open modal -->
<label for="my-modal-3" class="bg-purple-900 p-2 rounded-md">Search</label>

</main>

<!-- The modal -->
<input type="checkbox" id="my-modal-3" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative h-96">
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div class="form-control">
        <label class="input-group">
          <span>Search</span>
          <input type="text" placeholder="ReWrit" class="input input-bordered w-96" bind:value={searchTerms} on:input={search} />
        </label>
    </div>
        <!--  mock array of results to test the UI -->
        <!-- <div class="flex flex-col">
            <div class="flex flex-row justify-between items-center space-x-4"> -->
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <!-- <img src="https://picsum.photos/200/200" alt="image" class="w-auto h-24" />
                <div class="flex flex-col w-auto">
                    <h1 class="text-lg font-semibold">ReWrit</h1>
                    <h1 class="text-md font-medium text-gray-400">ReWrit is a platform for writers to share their work and get feedback from other writers.</h1>
                </div>
            </div>
        </div> -->
    <div class="overflow-y-auto h-96"> <!-- This is the div that will scroll -->
    {#if postResults.documents != undefined && postResults.documents.length > 0}
    <p class="text-lg font-semibold text-center">Posts</p>
    {#each postResults.documents as post}
        <div class="flex flex-col">
            <div class="flex flex-row justify-around items-center space-x-4">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src={'https://cloud.appwrite.io/v1/storage/buckets/646547f5019189c8092b/files/'+post.Icon+'/preview?project=646538bf8be3792191bd'} alt="image" class="w-auto h-16" />
                <div class="flex flex-col w-auto">
                    <h1 class="text-lg font-semibold">{post.Title}</h1>
                    <h1 class="text-md font-medium text-gray-400">{post.Tagline}</h1>
                </div>
            </div>
        </div>
    {/each}
    {/if}
    {#if PitchResults.documents != undefined && PitchResults.documents.length > 0}
    <p class="text-lg font-semibold text-center">Pitches</p>
    {#each PitchResults.documents as Pitch}
        <div class="flex flex-col">
            <div class="flex flex-row justify-around items-center space-x-4">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src={'https://cloud.appwrite.io/v1/storage/buckets/646547f5019189c8092b/files/'+Pitch.Icon+'/preview?project=646538bf8be3792191bd'} alt="image" class="w-auto h-16" />
                <div class="flex flex-col w-auto">
                    <h1 class="text-lg font-semibold">{Pitch.Title}</h1>
                    <h1 class="text-md font-medium text-gray-400">{Pitch.Tagline}</h1>
                </div>
            </div>
        </div>
    {/each}
    {/if}
    </div>
  </div>
</div>