<template>
  <div class="to-do">
    <h3>To-Do</h3>
    <div class="checkbox-form">
      <div v-for="(todo, index) in todos" :key="index" class="check">
        <label class="checkbox">
          <input 
            type="checkbox" 
            v-model="todo.completed"
            :aria-label="todo.text"
          >
          <i></i>
          {{ todo.text }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TodoList',
  setup() {
    const todos = ref([
      { text: 'Do the dishes.', completed: true },
      { text: 'Hit the gym.', completed: true },
      { text: 'Walk the dog.', completed: true },
      { text: 'Get wireframing!', completed: true },
      { text: 'Talk to the cat.', completed: true }
    ])
    
    return {
      todos
    }
  }
}
</script>