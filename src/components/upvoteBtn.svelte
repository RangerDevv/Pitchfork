<script lang="ts">
import {appwriteUser,appwriteDatabases} from '../lib/appwrite';
  
import { ID } from 'appwrite';

export let DatabaseID = '';
export let CollectionID = '';
export let DocumentID = '';
export let uid = '';

function upvote(docID: any) {
  const upvotes = docID.Upvotes || []; // Use an empty array as a fallback if Upvotes is undefined

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
    // 'Upvotes': [...upvotes, uid]
    // check if the user has already upvoted in that case remove the upvote or else add the upvote
    'Upvotes': upvotes.includes(uid) ? upvotes.filter((upvote: any) => upvote !== uid) : [...upvotes, uid]
  });

  promise
    .then((response) => {
      console.log(response);
      console.log(docID);
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
}

</script>

<button on:click={() => upvote(DocumentID)} class="bg-purple-600 hover:bg-purple-700 text-white">Upvote</button>