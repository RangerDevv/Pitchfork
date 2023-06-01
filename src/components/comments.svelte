<script lang="ts">
  import { onMount } from "svelte";
    import { appwriteClient,appwriteDatabases,appwriteStorage } from "../lib/appwrite";
    import { ID,Query } from "appwrite";

    export let userUid = "";
    export let userDisplayName = "";

    let comments = [] as any;
    let postedComment = "";

    export let docId = "";
    export let docCollection = "";
    export let postId = "";

    async function getComments() {
    const promose = appwriteDatabases.listDocuments(
        docId,
        docCollection,
        [
            Query.equal("PostId", postId),
        ]
    );
    const result = await promose;
    comments = result.documents;
    }

    // when the component is mounted, get the comments
    onMount(async () => {
    await getComments();
    });

    async function postComment() {
        const promise = appwriteDatabases.createDocument(
            docId,
            docCollection,
            ID.unique(),
            {
            PostId: postId,
            Comment: postedComment,
            AuthorUid: userUid,
            AuthorName: userDisplayName,
            },
        );
        await promise;
    }
</script>

<main>
    <p class="text-2xl font-bold text-center pt-10 pb-10">Comments</p>
    <div class="flex flex-row space-x-4 items-center mx-auto w-96">
        <textarea
            class="border-2 border-transparent rounded-lg p-2 w-96"
            rows="1"
            bind:value={postedComment}
        ></textarea>
        <button
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded"
            on:click={postComment}>
            📄
        </button>
    </div>
    <div class="flex flex-col space-y-4 p-8">
    {#if comments.length === 0}
        <p class="text-center">No comments yet</p>
    {:else}
    {#each comments as comment}
        <div class="flex flex-col space-y-2">
        <div class="flex flex-row space-x-2">
            <img
            class="rounded-full h-8 w-8"
            src="https://avatars.dicebear.com/api/avataaars/${comment.AuthorUid}.svg"
            alt="avatar"
            />
            <p class="text-lg font-bold">{comment.AuthorName}</p>
        </div>
        <p class="text-sm">{comment.Comment}</p>
        </div>
    {/each}
    {/if}
    </div>
</main>