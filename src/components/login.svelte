<script>
  import {appwriteUser} from '../lib/appwrite';
  
  import { ID } from 'appwrite';

  export let email = '';
  let password = '';

function login() {
  const promise = appwriteUser.createSession(email, password);

  promise.then((response) => {
    console.log(response);
    window.location.href = '/dashboard';
  }, (error) => {
    console.log(error);
  });
}
</script>

<h1>Login</h1>

<input type="email" bind:value={email} placeholder="Email" />
<input type="password" bind:value={password} placeholder="Password" />

<button on:click={login}>Login</button>

