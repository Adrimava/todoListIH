import { defineStore } from 'pinia';
import supabase from '../supabase';

export default defineStore('taskStore', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      this.tasks = tasks;
    },
  },
});
