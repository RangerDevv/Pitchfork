<script lang="ts">
import { appwriteDatabases,appwriteStorage,appwriteClient } from "../lib/appwrite";
import { onMount } from "svelte";

let DatabaseID = '646b9dd716753e384863';
let CollectionID = '646b9e0e29b66e4a8a22';
export let DocumentID = '';
export let uid = '';
let yesVotes = false;
let noVotes = false;
$: pollYes = 0;
$: pollNo = 0;

onMount(async () => {
    const currDocument = await setDoc(DocumentID) as any;
    pollYes = currDocument.LikePitch.length;
    pollNo = currDocument.HatePitch.length;
    if (currDocument.LikePitch.includes(uid)) {
        yesVotes = true;
        noVotes = false;
    } else if (currDocument.HatePitch.includes(uid)) {
        yesVotes = false;
        noVotes = true;
    } else {
        yesVotes = false;
        noVotes = false;
    }
});

async function setDoc(id: string){
  try{
    return appwriteDatabases.getDocument(DatabaseID,CollectionID,DocumentID); 
  } catch (e){
    // Handle the error
    return null;
  }
}

async function updatePoll(){
  try {
    const doc = await setDoc(DocumentID) as any;
    pollYes = doc.LikePitch.length;
    pollNo = doc.HatePitch.length;
    // set the boolean values for the buttons
    if (doc.LikePitch.includes(uid)) {
        yesVotes = true;
        noVotes = false;
    } else if (doc.HatePitch.includes(uid)) {
        yesVotes = false;
        noVotes = true;
    } else {
        yesVotes = false;
        noVotes = false;
    }
  } catch (e) {
    // Handle the error
  }
}


async function upvotePitch(docID:any){
  try {
    const doc = await setDoc(docID) as any;

    pollYes = doc.LikePitch.length;

    await appwriteDatabases.updateDocument(DatabaseID,CollectionID,DocumentID,{
        // 'Upvotes': [...doc.Upvotes ?? [] , uid]
        // if the user has already upvoted, remove their upvote
        'LikePitch': doc.LikePitch.includes(uid) ? doc.LikePitch.filter((id: string) => id !== uid) : [...doc.LikePitch ?? [] , uid]
    });
      console.log(docID);
    //   if there is the user id in the array of HatePitch, remove it
      if (doc.HatePitch.includes(uid)) {
        await appwriteDatabases.updateDocument(DatabaseID,CollectionID,DocumentID,{
            // 'Upvotes': [...doc.Upvotes ?? [] , uid]
            // if the user has already upvoted, remove their upvote
            'HatePitch': doc.HatePitch.filter((id: string) => id !== uid)
        });
      }
    //   refresh the poll
    updatePoll();
  } catch (error : any) {
      console.log(error);
      alert(error.message);
 }   
}

async function downvotePitch(docID:any){
    try {
      const doc = await setDoc(docID) as any;
  
      pollYes = doc.LikePitch.length;
      pollNo = doc.HatePitch.length;
  
      await appwriteDatabases.updateDocument(DatabaseID,CollectionID,DocumentID,{
          // 'Upvotes': [...doc.Upvotes ?? [] , uid]
          // if the user has already upvoted, remove their upvote
          'HatePitch': doc.HatePitch.includes(uid) ? doc.HatePitch.filter((id: string) => id !== uid) : [...doc.HatePitch ?? [] , uid]
      });
        console.log(docID);

        //   if there is the user id in the array of LikePitch, remove it
        if (doc.LikePitch.includes(uid)) {
            await appwriteDatabases.updateDocument(DatabaseID,CollectionID,DocumentID,{
                // 'Upvotes': [...doc.Upvotes ?? [] , uid]
                // if the user has already upvoted, remove their upvote
                'LikePitch': doc.LikePitch.filter((id: string) => id !== uid)
            });
          }
        //   refresh the poll
        updatePoll();
    } catch (error : any) {
        console.log(error);
        alert(error.message);
   }   
  }

</script>

<main>

<p class="text-2xl font-bold text-center pt-10 pb-8">What do you think of this pitch?</p>

<div class="flex flex-col gap-1 items-center">
<!--  make a poll that shows the number of upvotes and downvotes and the width of the bar is the percentage of upvotes -->
<div class="flex flex-row gap-1 items-center mb-2">
<button class="w-16 bg-green-500 disabled:outline disabled:bg-transparent hover:bg-green-700 text-white font-bold py-2 px-4 rounded" on:click={() => upvotePitch(DocumentID)} disabled={yesVotes}>
    {pollYes} ▲
</button>
<div class="w-96 h-auto">
<div class="bg-gradient-to-r from-green-500 to-green-800 rounded-lg h-10" style="width: {pollYes / (pollYes + pollNo) * 100}%">
</div>
</div>
</div>
<div class="flex flex-row gap-1 items-center">
<button class="w-16 bg-red-500 disabled:outline disabled:bg-transparent hover:bg-red-700 text-white font-bold py-2 px-4 rounded" on:click={() => downvotePitch(DocumentID)} disabled={noVotes}>
    {pollNo} ▼
</button>
<div class="w-96 h-auto">
<div class="bg-gradient-to-r from-red-500 to-red-800 rounded-lg h-10" style="width: {pollNo / (pollYes + pollNo) * 100}%">
</div>
</div>
</div>
</div>
</main>