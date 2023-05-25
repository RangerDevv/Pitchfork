<script>
import {appwriteUser} from '../lib/appwrite';

import { ID } from 'appwrite';
  
function signout() {
const promise = appwriteUser.deleteSession('current');
promise.then((response) => {
    console.log(response);
    // clear all of the cookies
    document.cookie = `user=; expires=${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
    document.cookie = `userName=; expires=${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
    document.cookie = `session=; expires=${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
    document.cookie = `userName=; expires=${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
    window.location.href = '/';
}, (error) => {
    console.log(error);
    alert(error.message);
});
}

</script>

<button on:click={signout} class=" text-white p-2 rounded-md">Sign Out</button>