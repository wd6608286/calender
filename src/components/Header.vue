<template>
  <div class="header text-center">
    <h1><a href="#">SUPERMINIMAL</a></h1>
    <p>FLAT DESIGNED UI KIT</p>
    <div class="header-actions">
      <button class="lang-btn" @click="toggleLanguage">
        {{ currentLocale === 'en' ? '中文' : 'English' }}
      </button>
      <button v-if="!isLoggedIn" class="login-btn" @click="goToLogin">
        {{ t('header.login') }}
      </button>
      <button v-else class="logout-btn" @click="handleLogout">
        {{ t('header.logout') }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default {
  name: 'Header',
  setup() {
    const { t, locale } = useI18n()
    const router = useRouter()
    const isLoggedIn = ref(false)
    
    const currentLocale = computed(() => locale.value)
    
    onMounted(() => {
      const user = localStorage.getItem('user') || sessionStorage.getItem('user')
      isLoggedIn.value = !!user
    })
    
    const toggleLanguage = () => {
      const newLocale = locale.value === 'en' ? 'zh' : 'en'
      locale.value = newLocale
      localStorage.setItem('locale', newLocale)
    }
    
    const goToLogin = () => {
      router.push('/login')
    }
    
    const handleLogout = () => {
      localStorage.removeItem('user')
      sessionStorage.removeItem('user')
      isLoggedIn.value = false
    }
    
    return {
      t,
      locale,
      currentLocale,
      isLoggedIn,
      toggleLanguage,
      goToLogin,
      handleLogout
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
}

.header-actions {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 10px;
}

.lang-btn,
.login-btn,
.logout-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.lang-btn {
  background: #333;
  color: #fff;
}

.lang-btn:hover {
  background: #555;
}

.login-btn {
  background: #198a88;
  color: #fff;
}

.login-btn:hover {
  background: #157a78;
}

.logout-btn {
  background: #e74c3c;
  color: #fff;
}

.logout-btn:hover {
  background: #c0392b;
}
</style>