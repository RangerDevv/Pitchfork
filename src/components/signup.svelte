<script>
    import {appwriteUser} from '../lib/appwrite';
    
    import { ID } from 'appwrite';
  
    let email = '';
    let password = '';
  
  function SignUp() {
    const promise = appwriteUser.create( ID.unique() , email, password);
  
    promise.then((response) => {
      console.log(response);
      window.location.href = '/login';
    }, (error) => {
      console.log(error);
    });
  }
  </script>
  
  <h1>SignUp</h1>
  
  <input class="text-black" type="email" bind:value={email} placeholder="Email" />
  <input class="text-black" type="password" bind:value={password} placeholder="Password" />
  
  <button on:click={SignUp}>SignUp</button>
  
  