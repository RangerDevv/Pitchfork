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

<!-- <div>
<div class="form-control">
    <label class="input-group">
      <span>Search</span>
      <input type="text" placeholder="ReWrit" class="input input-bordered w-96" bind:value={searchTerms} on:input={search} />
    </label>
</div>
</div> -->
<!-- The button to open modal -->
<label for="my-modal-3" class="btn">Search</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-3" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div class="form-control">
        <label class="input-group">
          <span>Search</span>
          <input type="text" placeholder="ReWrit" class="input input-bordered w-96" bind:value={searchTerms} on:input={search} />
        </label>
    </div>
    {#if PitchResults}
    {#each PitchResults.documents as Pitch}
        <div class="flex flex-col">
            <div class="flex flex-row">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src={'https://cloud.appwrite.io/v1/storage/buckets/646547f5019189c8092b/files/'+Pitch.Icon+'/preview?project=646538bf8be3792191bd'} alt="image" class="w-auto h-24" />
                <h1 class="text-2xl font-bold">{Pitch.Title}</h1>
                <h1 class="text-2xl font-bold">{Pitch.Tagline}</h1>
            </div>
        </div>
    {/each}
    {/if}
  </div>
</div>