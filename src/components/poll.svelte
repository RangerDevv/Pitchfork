<script lang="ts">
import { appwriteDatabases,appwriteStorage,appwriteClient } from "../lib/appwrite";
import { onMount } from "svelte";

let DatabaseID = '646b9dd716753e384863';
let CollectionID = '646b9e0e29b66e4a8a22';
export let DocumentID = '';
export let uid = '';
let voted = false;
$: pollYes = 0;
$: pollNo = 0;

onMount(async () => {
    const currDocument = await setDoc(DocumentID) as any;
    pollYes = currDocument.LikePitch.length;
    pollNo = currDocument.HatePitch.length;
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
      voted = !voted;
    //   if there is the user id in the array of HatePitch, remove it
      if (doc.HatePitch.includes(uid)) {
        await appwriteDatabases.updateDocument(DatabaseID,CollectionID,DocumentID,{
            // 'Upvotes': [...doc.Upvotes ?? [] , uid]
            // if the user has already upvoted, remove their upvote
            'HatePitch': doc.HatePitch.filter((id: string) => id !== uid)
        });
      }
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
        voted = !voted;
        //   if there is the user id in the array of LikePitch, remove it
        if (doc.LikePitch.includes(uid)) {
            await appwriteDatabases.updateDocument(DatabaseID,CollectionID,DocumentID,{
                // 'Upvotes': [...doc.Upvotes ?? [] , uid]
                // if the user has already upvoted, remove their upvote
                'LikePitch': doc.LikePitch.filter((id: string) => id !== uid)
            });
          }
    } catch (error : any) {
        console.log(error);
        alert(error.message);
   }   
  }

</script>

<main>
<div class="flex flex-col gap-1 w-96">
<!--  make a poll that shows the number of upvotes and downvotes and the width of the bar is the percentage of upvotes -->
<button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" on:click={() => upvotePitch(DocumentID)} disabled={voted}>
    {pollYes} Upvotes
</button>
<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" on:click={() => downvotePitch(DocumentID)} disabled={voted}>
    {pollNo} Downvotes
</button>
</div>
</main>