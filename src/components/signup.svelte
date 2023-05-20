<script>
    import {appwriteUser} from '../lib/appwrite';
    
    import { ID } from 'appwrite';
  
    let email = '';
    let password = '';
    let userName = '';

    $: disabled = !email || !password || !userName;

  
  function SignUp() {
    const promise = appwriteUser.create( ID.unique() , email, password, userName);
  
    promise.then((response) => {
      console.log(response);
      window.location.href = '/login';
    }, (error) => {
      console.log(error);
    });
  }
  </script>
  
  <h1 class="text-center text-2xl font-bold pt-16">Welcome! We're so glad to have you!</h1>

  <div class="flex justify-center">
    <div class="w-96 h-auto p-12 mt-12 rounded-md self-center flex flex-col gap-5 bg-slate-800">
    <input type="text" bind:value={userName} placeholder="Username" />
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={SignUp} class=" disabled:bg-slate-500 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded h-10" disabled={disabled}>Sign Up</button>
    </div>
  </div>
  
  <style>
    input {
      border: 1px solid #000;
      padding: 0.5rem;
      border-radius: 5px;
      background-color: #8671FB;
    }
  </style>
  