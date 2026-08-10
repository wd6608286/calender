<template>
  <div class="search-box">
    <form @submit.prevent="handleSearch">
      <input 
        type="text" 
        class="text" 
        v-model="searchQuery"
        :placeholder="t('search.placeholder')"
        @focus="clearPlaceholder"
        @blur="restorePlaceholder"
        aria-label="Search"
      >
      <input type="submit" class="go" value="" aria-label="Submit search">
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'SearchBox',
  setup() {
    const { t } = useI18n()
    const searchQuery = ref('')
    const placeholderText = ref('')
    
    const clearPlaceholder = () => {
      placeholderText.value = ''
    }
    
    const restorePlaceholder = () => {
      if (!searchQuery.value) {
        placeholderText.value = ''
      }
    }
    
    const handleSearch = () => {
      if (searchQuery.value.trim()) {
        console.log('Searching for:', searchQuery.value)
        alert('Search functionality: ' + searchQuery.value)
      }
    }
    
    return {
      t,
      searchQuery,
      placeholderText,
      clearPlaceholder,
      restorePlaceholder,
      handleSearch
    }
  }
}
</script>