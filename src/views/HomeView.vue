<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="home">
    <h1>Home</h1>
    <h2 v-if="this.user">Current user: {{ this.user.email }}</h2>
    <form>
      <div class="form-input">
        <label for="new-task">New Task
          <input
            type="text"
            id="new-task"
            v-model="newTask"
            @keypress.enter.prevent="createNewTask"
          >
        </label>
        <button type="button" @click="createNewTask">+</button>
      </div>
    </form>
    <TaskList />
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/task';
import userStore from '@/store/user';
import TaskList from '@/components/TaskList.vue';

export default {
  name: 'HomeView',
  components: {
    TaskList,
  },
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
    ...mapActions(taskStore, ['fetchTasks', 'createTask']),
    async createNewTask() {
      if (this.newTask.length) {
        await this.createTask(this.newTask, this.user.id);
        console.log('New task created:', this.newTask);
        this.newTask = '';
      }
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
</style>
