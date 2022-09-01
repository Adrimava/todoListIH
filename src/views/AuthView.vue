<template>
  <h1>SignUp / SignIn</h1>
  <button @click="handleSignUp">Sign Up</button>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      const userData = {
        email: 'adrian.maza@ironhack.com',
        password: 'somePassword',
      };
      this.signUp(userData.email, userData.password);
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log('watch user:', this.user);
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>

<style>
</style>
