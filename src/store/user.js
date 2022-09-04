import { defineStore } from 'pinia';
import supabase from '../supabase';

export default defineStore('userStore', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      console.log('fetchuser user:', user);
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      this.fetchUser();
      if (error) throw error;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage,
      },
    ],
  },
});
