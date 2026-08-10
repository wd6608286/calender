<template>
  <div class="footer">
    <div class="copy-rights text-center">
      <p>Copyright &copy;{{ currentYear }} All rights Reserved | Template by <a href="https://w3layouts.com" target="_blank" rel="noopener noreferrer">W3Layouts</a></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import dayjs from 'dayjs'

export default {
  name: 'Footer',
  setup() {
    const currentYear = ref(dayjs().year())
    
    return {
      currentYear
    }
  }
}
</script>