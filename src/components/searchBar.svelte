<script lang="ts">
import { appwriteClient,appwriteDatabases,appwriteStorage} from "../lib/appwrite";

import { Query } from "appwrite";

let searchTerms = "";
let PitchResults = [] as any;
let postResults = [] as any;

async function search() {
    PitchResults = await appwriteDatabases.listDocuments(
    '646b9dd716753e384863',
	'646b9e0e29b66e4a8a22',
	[
        Query.search("Title", searchTerms)
	]
    );
    console.log(PitchResults);
}

</script>

<div class="form-control">
    <label class="input-group">
      <span>Search</span>
      <input type="text" placeholder="ReWrit" class="input input-bordered w-96" bind:value={searchTerms} on:input={search} />
    </label>
</div>
<div class="flex flex-col space-y-2 justify-center items-center">
    {#each PitchResults.documents as PitchResult}
        <div class="flex flex-row gap-6">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={'https://cloud.appwrite.io/v1/storage/buckets/646547f5019189c8092b/files/'+PitchResult.Icon+'/preview?project=646538bf8be3792191bd'} alt="image" class="w-auto h-24" />
            <div class="flex flex-col space-y-2">
                <p class="text-2xl font-bold">{PitchResult.Title}</p>
                <p class="text-xl">{PitchResult.Tagline}</p>
            </div>
            <!--  upvotes count -->
            <div class="flex flex-col space-y-2">
                <p class="text-2xl font-bold">{PitchResult.Upvotes.length}</p>
                <p class="text-xl">Upvotes</p>
            </div>
        </div>
    {/each}
</div>