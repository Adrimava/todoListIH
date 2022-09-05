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
        .order('id', { ascending: true });
      this.tasks = tasks;
    },
    async createTask(title, userId) {
      const { data: [newTask], error } = await supabase
        .from('tasks')
        .insert([{ title, user_id: userId }]);
      if (error) throw error;
      else this.tasks.push(newTask);
      console.log('newTask:', newTask);
    },
    async deleteTask(id, taskIndex) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .match({ id });
      if (error) throw error;
      else this.tasks.splice(taskIndex, 1);
      console.log('task deleted');
    },
  },
});
