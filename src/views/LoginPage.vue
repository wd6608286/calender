<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h2>{{ t('login.title') }}</h2>
        <button class="back-btn" @click="goBack">← Back</button>
      </div>
      
      <div class="login-form">
        <div class="form">
          <form @submit.prevent="handleLogin">
            <input type="text" v-model="username" :placeholder="t('login.username')" required="">
            <input type="password" v-model="password" :placeholder="t('login.password')" required="">
            <div class="check">
              <label class="checkbox">
                <input type="checkbox" v-model="rememberMe" checked="">
                <i class="left"> </i>{{ t('login.remember') }}
              </label>
            </div>
            <input type="submit" :value="t('login.signIn')" :disabled="isLoading">
            <a href="#" @click.prevent="forgotPassword">{{ t('login.forgotPassword') }}</a>
            <div v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</div>
            <div v-if="successMessage" class="success-message" role="alert">{{ successMessage }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'LoginPage',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    
    const username = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const isLoading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')
    
    const handleLogin = async () => {
      isLoading.value = true
      errorMessage.value = ''
      successMessage.value = ''
      
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: username.value,
          password: password.value
        })
        
        if (response.data.success) {
          successMessage.value = t('login.loginSuccess') + ' ' + response.data.user.username
          if (rememberMe.value) {
            localStorage.setItem('user', JSON.stringify(response.data.user))
          } else {
            sessionStorage.setItem('user', JSON.stringify(response.data.user))
          }
          setTimeout(() => {
            router.push('/')
          }, 1000)
        } else {
          errorMessage.value = response.data.message || t('login.loginFailed')
        }
      } catch (error) {
        if (error.response && error.response.data) {
          errorMessage.value = error.response.data.message || t('login.loginFailed')
        } else {
          errorMessage.value = t('login.connectionError')
        }
      } finally {
        isLoading.value = false
      }
    }
    
    const forgotPassword = () => {
      alert('Password reset functionality coming soon!')
    }
    
    const goBack = () => {
      router.push('/')
    }
    
    return {
      t,
      username,
      password,
      rememberMe,
      isLoading,
      errorMessage,
      successMessage,
      handleLogin,
      forgotPassword,
      goBack
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.login-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 400px;
  width: 100%;
}

.login-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.login-header h2 {
  margin: 0;
  color: #333;
}

.back-btn {
  background: #198a88;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.back-btn:hover {
  background: #157a78;
}

.login-form {
  width: 100%;
}

.form input[type="text"],
.form input[type="password"] {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
}

.form input[type="submit"] {
  width: 100%;
  padding: 12px;
  background: #198a88;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.form input[type="submit"]:hover {
  background: #157a78;
}

.form input[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form a {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #198a88;
  text-decoration: none;
}

.form a:hover {
  text-decoration: underline;
}

.check {
  margin-bottom: 15px;
}

.check label {
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.error-message {
  color: #e74c3c;
  margin-top: 10px;
  padding: 8px;
  background: #fadbd8;
  border-radius: 4px;
  font-size: 0.9em;
}

.success-message {
  color: #27ae60;
  margin-top: 10px;
  padding: 8px;
  background: #d5f4e6;
  border-radius: 4px;
  font-size: 0.9em;
}
</style>