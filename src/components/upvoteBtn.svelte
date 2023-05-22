<script lang="ts">
import {appwriteUser,appwriteDatabases} from '../lib/appwrite';

import { onMount } from 'svelte';

import { ID } from 'appwrite';

export let DatabaseID = '';
export let CollectionID = '';
export let DocumentID = '';
export let uid = '';
let voted = false;
let UpvoteCount = 0;

onMount(async () => {
    const currDocument = await setDoc(DocumentID) as any;
    UpvoteCount = currDocument.Upvotes.length;
    voted = currDocument.Upvotes.includes(uid);
});

async function setDoc(id: string){
  try{
    return appwriteDatabases.getDocument(DatabaseID,CollectionID,DocumentID); 
  } catch (e){
    // Handle the error
    return null;
  }
}

async function upvote(docID:any){
  try {
    const doc = await setDoc(docID) as any;

    UpvoteCount = doc.Upvotes.length;

    await appwriteDatabases.updateDocument(DatabaseID,CollectionID,DocumentID,{
        // 'Upvotes': [...doc.Upvotes ?? [] , uid]
        // if the user has already upvoted, remove their upvote
        'Upvotes': doc.Upvotes.includes(uid) ? doc.Upvotes.filter((id: string) => id !== uid) : [...doc.Upvotes ?? [] , uid]
    });
      console.log(docID);
      voted = true;
      
  } catch (error : any) {
      console.log(error);
      alert(error.message);
 }   
}

</script>
{#if voted}
<button on:click={() => upvote(DocumentID)} class=" outline text-white p-2 rounded-lg">Upvote {UpvoteCount}</button>
{:else}
<button on:click={() => upvote(DocumentID)} class="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-md">Upvote {UpvoteCount}</button>
{/if}