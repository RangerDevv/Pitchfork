<script lang='ts'>
import { Client, Account, ID, Databases, Permission, Role, Teams } from 'appwrite';

let Products= [] as any[];
const client = new Client();
const account = new Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('646538bf8be3792191bd');


const databases = new Databases(client);

const promise = databases.listDocuments('646538e35dd17306c589', '646538eeeface7a4cd39');


promise.then(function (response) {
    console.log(response); // Success
	Products = response.documents as any[];
	console.log(Products[0].Name);
}, function (error) {
    console.log(error); // Failure
});

</script>

{#await Products}
<p>Loading...</p>
{:then}
<p>{Products[1]?.Name}</p>
{:catch error}
<p>Error: {error.message}</p>
{/await}
