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
      this.tasks.push(newTask);
      console.log('newTask:', newTask);
    },
    async updateTaskStatus({ id, is_complete: isComplete }, taskIndex) {
      const { data: [updatedTask], error } = await supabase
        .from('tasks')
        .update({ is_complete: !isComplete })
        .match({ id });
      if (error) throw error;
      this.tasks[taskIndex] = updatedTask;
      console.log('update data:', updatedTask);
    },
    async updateTaskTitle({ id }, taskIndex, title) {
      const { data: [updatedTask], error } = await supabase
        .from('tasks')
        .update({ title })
        .match({ id });
      if (error) throw error;
      this.tasks[taskIndex] = updatedTask;
      console.log('update data:', updatedTask);
    },
    async deleteTask({ id }, taskIndex) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .match({ id });
      if (error) throw error;
      this.tasks.splice(taskIndex, 1);
      console.log('task deleted');
    },
  },
});
