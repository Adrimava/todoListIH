<template>
  <div class="home">
    <h1>Home</h1>
    <h2 v-if="this.user">Current user: {{ this.user.email }}</h2>
    <form>
      <div class="form-input">
        <label for="new-task">New Task
          <input type="text" id="new-task" v-model="newTask">
        </label>
        <button @click="createNewTask">+</button>
      </div>
    </form>
    <section class="tasks">
      <h3 v-if="!tasks.length">There isn't any task, create your first one ;)</h3>
      <div class="task" v-for="task in tasks" :key="task.id">
        <p>{{task.title}}</p>
        <span class="task-status" v-if="task.is_complete">✔</span>
        <span class="task-status" v-else>🔵</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/task';
import userStore from '@/store/user';

export default {
  name: 'HomeView',
  data() {
    return {
      newTask: '',
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks']),
    createNewTask() {
      console.log('New task created:', this.newTask);
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.form-input{
  margin: 5px;
}

input{
  height: 40px;
}

button{
  height: 46px;
  width: 46px;
  margin: 5px;
}

.tasks{
  border: 1px dotted darkblue;
  margin: 10px auto;
  padding: 10px;
  width: 300px;
}

.task{
  margin: 10px;
  padding: 5px;
  border-bottom: 2px dashed blueviolet;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: aliceblue;
}

.task-status{
  cursor: pointer;
  padding: 2px;
}
</style>
