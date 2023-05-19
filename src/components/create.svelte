<script>

  import { bind } from "svelte/internal";
import { appwriteStorage,appwriteDatabases,appwriteUser } from "../lib/appwrite";

import { ID , Role, Permission } from "appwrite";

export let userID = '';


let PostTitle = '';
let PostTagline = '';
let PostDescription = '';
let PostLink = '';
let IconFile = '';
let ThumbnailFile = '';
let IsFree = true;
let PostLaunchDate = Date.now();

async function CreatePost() {
    appwriteDatabases.createDocument(
        '646538e35dd17306c589',
        '646538eeeface7a4cd39',
        ID.unique(),
        {
            'title': PostTitle,
            'tagline': PostTagline,
            'description': PostDescription,
            'link': PostLink,
            'isFree': IsFree,
            'launchDate': PostLaunchDate,
            'userID': userID,
            'Icon': appwriteStorage.createFile('646547f5019189c8092b' , ID.unique() , document.getElementById('IconFile').files[0]),
            'Thumbnail': appwriteStorage.createFile('64661e622715cf602c83' , ID.unique() , document.getElementById('ThumbnailFile').files[0]),
        },
        [
            Permission.read(Role.any()),
            Permission.write(Role.user(userID)),
            Permission.delete(Role.user(userID)),
            Permission.update(Role.user(userID)),
            Permission.delete(Role.team("Owner")),
            Permission.update(Role.team("Owner")),
            Permission.read(Role.team("Owner")),
            Permission.delete(Role.team("Admin")),
            Permission.update(Role.team("Admin")),

        ]
    )
}

</script>

<main>
    <input type="file" id="IconFile" />
    <input type="file" id="ThumbnailFile" />
    <input type="text" bind:value={PostTitle} placeholder="Title" />
    <input type="text" bind:value={PostTagline} placeholder="Tagline" />
    <input type="text" bind:value={PostDescription} placeholder="Description" />
    <input type="text" bind:value={PostLink} placeholder="Link" />
    <input type="checkbox" bind:checked={IsFree} />
    <input type="date" bind:value={PostLaunchDate} />
    <button on:click={CreatePost}>Create Post</button>
</main>