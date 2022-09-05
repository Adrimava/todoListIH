<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <section class="tasks">
    <h3 v-if="!tasks.length">There isn't any task, create your first one ;)</h3>
    <div
      class="task"
      v-for="(task, index) in tasks"
      :key="task.id"
      :class="{ completed: task.is_complete }"
      :ref="`task-${task.id}`"
    >
      <span class="delete-task" @click="deleteTask(task, index)">✖</span>
      <p class="task-title">
        {{ task.title }}
        <span class="edit-task" @click="openTaskEditor(task)"> 🖊 </span>
      </p>
      <div class="task-edit">
        <input
          type="text"
          v-model="newTaskTitle"
          @keypress.enter="editTaskTitle(task, index)"
        />
        <span class="send-edit" @click="editTaskTitle(task, index)">🖊</span>
      </div>
      <p class="task-status" @click="updateTaskStatus(task, index)">
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
  data() {
    return {
      newTaskTitle: '',
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks']),
  },
  methods: {
    ...mapActions(taskStore, [
      'deleteTask',
      'updateTaskStatus',
      'updateTaskTitle',
    ]),
    openTaskEditor(task) {
      document.querySelector('.edit')?.classList.remove('edit');
      this.$refs[`task-${task.id}`][0].classList.add('edit');
      this.newTaskTitle = task.title;
    },
    editTaskTitle(task, taskIndex) {
      if (task.title !== this.newTaskTitle) {
        this.updateTaskTitle(task, taskIndex, this.newTaskTitle);
      }
      document.querySelector('.edit')?.classList.remove('edit');
    },
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

.task .task-edit {
  display: none;
}

.task.edit {
  border: 2px dashed yellowgreen;
}

.task.edit .task-title {
  display: none;
}

.task.edit .task-status {
  display: none;
}

.task.edit .task-edit {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  width: 100%;
  height: 60px;
}

.task.edit .task-edit input {
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  width: 100%;
}

.task.edit .task-edit .send-edit {
  cursor: pointer;
  font-size: 1.5em;
}

.task.edit .task-edit .send-edit:hover {
  font-weight: bold;
}

.task.completed {
  background-color: aquamarine;
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

.edit-task {
  display: none;
}

.task:hover .edit-task {
  display: inline;
  font-size: 0.8em;
  cursor: pointer;
}

.task:hover .edit-task:hover {
  font-weight: bold;
}

.task-status {
  cursor: pointer;
  padding: 2px;
}
</style>
