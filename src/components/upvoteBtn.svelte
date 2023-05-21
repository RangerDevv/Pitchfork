<script lang="ts">
import {appwriteUser,appwriteDatabases} from '../lib/appwrite';
  
import { ID } from 'appwrite';

export let DatabaseID = '';
export let CollectionID = '';
export let DocumentID = '';

function upvote(docID: any) {

    const promise = appwriteDatabases.updateDocument(DatabaseID,CollectionID,DocumentID,{
        'Name': docID.Name,
        'Tagline': docID.Tagline,
        'Description': docID.Description,
        'Link': docID.Link,
        'Free': docID.Free,
        'LaunchDate': docID.LaunchDate,
        'Author': docID.Author,
        'Icon': docID.Icon.$id ?? '',
        'Thumbnail': docID.Thumbnail.$id ?? '',
        'Authoruid': docID.Authoruid,
        'Upvotes': docID.Upvotes + 1
    });

    promise.then((response) => {

        console.log(response);

    }, (error) => {

        console.log(error);

        alert(error.message);

    });

}

</script>

<button on:click={() => upvote(DocumentID)} class="bg-purple-600 hover:bg-purple-700 text-white">Upvote</button>