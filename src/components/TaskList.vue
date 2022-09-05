<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <section class="tasks">
    <h3 v-if="!tasks.length">There isn't any task, create your first one ;)</h3>
    <div class="task" v-for="(task, index) in tasks" :key="task.id">
      <span class="delete-task" @click="deleteTask(task.id, index)">✖</span>
      <p class="task-title">{{ task.title }}</p>
      <p
        class="task-status"
        @click="updateTaskStatus(task.id, index, task.is_complete)"
      >
        <span v-if="task.is_complete">✔</span>
        <span v-else>⚪</span>
      </p>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/task';

export default {
  computed: {
    ...mapState(taskStore, ['tasks']),
  },
  methods: {
    ...mapActions(taskStore, ['deleteTask', 'updateTaskStatus']),
  },
};
</script>

<style scoped>
.tasks {
  border: 1px dotted darkblue;
  margin: 10px auto;
  padding: 10px;
  width: 300px;
}

.task {
  margin: 10px;
  padding: 5px;
  border-bottom: 2px dashed blueviolet;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: aliceblue;
  position: relative;
}

.delete-task {
  position: absolute;
  top: 0;
  cursor: pointer;
  font-size: 0.75em;
  color: lightcoral;
}

.delete-task:hover {
  background-color: darkred;
  border-radius: 50%;
  font-weight: bold;
  color: white;
}

.task-title {
  padding-left: 10px;
}

.task-status {
  cursor: pointer;
  padding: 2px;
}
</style>
