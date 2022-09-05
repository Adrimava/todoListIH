<template>
  <h1>SignUp / SignIn /SignOut</h1>
  <h2 v-if="this.user">Current user: {{ this.user.email }}</h2>
  <form>
    <div class="form-input">
      <label for="email">Email
        <input type="email" id="email" v-model="email">
      </label>
    </div>
    <div class="form-input">
      <label for="password">Password
        <input type="password" id="password" v-model="password">
      </label>
    </div>
  </form>
  <div class="buttons">
    <button @click="handleSignUp">Sign Up</button>
    <button @click="handleSignIn">Sign In</button>
    <button @click="handleSignOut">Sign Out</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  data() {
    return {
      email: 'adrian.maza@ironhack.com', // adrian.maza@ironhack.com
      password: 'somePassword', // somePassword
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp', 'signIn', 'signOut']),
    handleSignUp() {
      this.signUp(this.email, this.password);
      console.log('Signed up');
    },
    handleSignIn() {
      this.signIn(this.email, this.password);
      console.log('Signed in');
    },
    handleSignOut() {
      this.signOut();
      console.log('Logged out');
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log('watch user:', this.user);
        this.$router.push({ path: '/' });
      } else {
        console.log('watch user: there is no user');
      }
    },
  },
};
</script>

<style scoped>
.form-input{
  margin: 5px;
}

.buttons{
  margin-top: 20px;
}

.buttons button {
  height: 40px;
  width: 100px;
  margin: 5px;
}
</style>
