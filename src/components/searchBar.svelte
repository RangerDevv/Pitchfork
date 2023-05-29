<script lang="ts">
import { appwriteClient,appwriteDatabases,appwriteStorage} from "../lib/appwrite";

import { Query } from "appwrite";

let searchTerms = "";
let searchResults = [] as any;

async function search() {
    searchResults = await appwriteDatabases.listDocuments(
    '646b9dd716753e384863',
	'646b9e0e29b66e4a8a22',
	[
        Query.search("Search", searchTerms)
	]
    );
    console.log(searchResults);
}

</script>

<div class="form-control">
    <label class="input-group">
      <span>Search</span>
      <input type="text" placeholder="ReWrit" class="input input-bordered w-96" bind:value={searchTerms} on:input={search} />
    </label>
</div>