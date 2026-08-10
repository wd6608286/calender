<template>
  <div class="content-middle">
    <div class="content-middle-top">
      <div id="dd1" class="wrapper-dropdown-1" tabindex="1" @click="toggleDropdown">
        <span><img src="/images/nav.png" alt="Navigation menu"></span>
        <ul class="dropdown" v-show="isOpen">
          <li v-for="(article, index) in articles" :key="index">
            <a href="#">{{ article }}</a>
          </li>
        </ul>
      </div>
      
      <a class="posts" href="#" aria-label="View posts">
        <img src="/images/posts.png" alt="Posts">
      </a>
      
      <div class="clearfix"></div>
    </div>
    
    <div class="content-middle-info text-center">
      <h3>COOL ARTICLE FROM THE WEB</h3>
      <p>{{ articleContent }}</p>
      <a href="#" aria-label="Read more">
        <img src="/images/downarrow.png" alt="Read more">
      </a>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ContentMiddle',
  setup() {
    const isOpen = ref(false)
    const articles = ref([
      'Article post1',
      'Article post2',
      'Article post3',
      'Article post4'
    ])
    const articleContent = ref(
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exercitat ion ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilit...'
    )
    
    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }
    
    const closeDropdown = () => {
      isOpen.value = false
    }
    
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.wrapper-dropdown-1')) {
        isOpen.value = false
      }
    })
    
    return {
      isOpen,
      articles,
      articleContent,
      toggleDropdown,
      closeDropdown
    }
  }
}
</script>