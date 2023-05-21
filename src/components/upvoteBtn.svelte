<script lang="ts">
import {appwriteUser,appwriteDatabases} from '../lib/appwrite';
  
import { ID } from 'appwrite';

export let DatabaseID = '';
export let CollectionID = '';
export let DocumentID = '';
export let uid = '';
let voted = false;
let upvotesCount = 0;

function upvote(docID: any) {

  const promise = appwriteDatabases.updateDocument(DatabaseID, CollectionID, DocumentID, {
    'Name': docID.Name,
    'Tagline': docID.Tagline,
    'Description': docID.Description,
    'Link': docID.Link,
    'Free': docID.Free,
    'LaunchDate': docID.LaunchDate,
    'Author': docID.Author,
    'Icon': docID.Icon,
    'Thumbnail': docID.Thumbnail,
    'Authoruid': docID.Authoruid,
    // check if the user has already upvoted in that case remove the user's uid from the array or else add it
    'Upvotes': [...docID.Upvotes ?? [], uid]
  });

  promise
    .then((response) => {
      console.log(response);
      console.log(docID);
        voted = true;
        upvotesCount = docID.Upvotes.length + 1;
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
}

</script>
{#if voted}
<button on:click={() => upvote(DocumentID)} class=" outline text-white p-2 rounded-lg">Upvotes: {upvotesCount}</button>
{:else}
<button on:click={() => upvote(DocumentID)} class="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg">Upvotes: {upvotesCount}</button>
{/if}