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
      console.log('newTask:', newTask);
      if (error) throw error;
      else this.tasks.push(newTask);
    },
    async deleteTask(id) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .match({ id });
      if (error) throw error;
      else {
        const taskIndex = this.tasks.indexOf(this.tasks.find((task) => task.id === id));
        this.tasks.splice(taskIndex, 1);
      }
    },
  },
});
