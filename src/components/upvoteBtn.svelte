<script lang="ts">
import {appwriteUser,appwriteDatabases} from '../lib/appwrite';
  
import { ID } from 'appwrite';

export let DatabaseID = '';
export let CollectionID = '';
export let DocumentID = '';
export let uid = '';

function upvote(docID: any) {
    const promise = appwriteDatabases.updateDocument(DatabaseID,CollectionID,DocumentID,{
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
        // add the user's uid to the Upvotes array
        'Upvotes': [...docID.Upvotes, uid]
    });

    promise.then((response) => {

        console.log(response);
        console.log(docID)
        console.log(docID.Upvotes)
        // log the type of docID.Upvotes
        console.log(typeof docID.Upvotes)

    }, (error) => {

        console.log(error);

        alert(error.message);

    });

}

</script>

<button on:click={() => upvote(DocumentID)} class="bg-purple-600 hover:bg-purple-700 text-white">Upvote</button>