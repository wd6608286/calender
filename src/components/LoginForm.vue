<template>
  <div class="login-form">
    <div class="left-form">
      <div class="skills">
        <div class="skill1" style="width:41%"></div>
      </div>
      <div class="percentage"><h4>41%</h4></div>
      <div class="clearfix"></div>
      <div class="form">
        <form @submit.prevent="handleLogin">
          <input type="text" v-model="username" placeholder="Username" required="">
          <input type="password" v-model="password" placeholder="Password" required="">
          <div class="check">
            <label class="checkbox">
              <input type="checkbox" v-model="rememberMe" checked="">
              <i class="left"> </i>Remember My Password
            </label>
          </div>
          <input type="submit" value="Sign In" :disabled="isLoading">
          <a href="#" @click.prevent="forgotPassword">Forgot your password?</a>
          <div v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</div>
          <div v-if="successMessage" class="success-message" role="alert">{{ successMessage }}</div>
        </form>
      </div>
    </div>
    <div class="vertical-scroll">
      <div class="wrapper">
        <div class="wrp-eq cf">
          <div id="eq" ref="eqContainer" @mousedown="startDrag" @mousemove="onDrag" @mouseup="stopDrag" @mouseleave="stopDrag">				
            <span ref="eqSlider" :style="{ height: sliderValue + '%' }">{{ sliderValue }}</span>			
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'LoginForm',
  setup() {
    const username = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const isLoading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')
    const eqSlider = ref(null)
    const eqContainer = ref(null)
    const sliderValue = ref(67)
    const isDragging = ref(false)
    
    const startDrag = (e) => {
      isDragging.value = true
      updateSlider(e)
    }
    
    const onDrag = (e) => {
      if (isDragging.value) {
        updateSlider(e)
      }
    }
    
    const stopDrag = () => {
      isDragging.value = false
    }
    
    const updateSlider = (e) => {
      if (!eqContainer.value) return
      const rect = eqContainer.value.getBoundingClientRect()
      const y = e.clientY - rect.top
      const height = rect.height
      const percentage = Math.max(0, Math.min(100, 100 - (y / height * 100)))
      sliderValue.value = Math.round(percentage)
    }
    
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
          successMessage.value = 'Login successful! Welcome ' + response.data.user.username
          if (rememberMe.value) {
            localStorage.setItem('user', JSON.stringify(response.data.user))
          } else {
            sessionStorage.setItem('user', JSON.stringify(response.data.user))
          }
        } else {
          errorMessage.value = response.data.message || 'Login failed'
        }
      } catch (error) {
        if (error.response && error.response.data) {
          errorMessage.value = error.response.data.message || 'Invalid username or password'
        } else {
          errorMessage.value = 'Connection error. Please ensure the backend server is running.'
        }
      } finally {
        isLoading.value = false
      }
    }
    
    const forgotPassword = () => {
      alert('Password reset functionality coming soon!')
    }
    
    return {
      username,
      password,
      rememberMe,
      isLoading,
      errorMessage,
      successMessage,
      eqSlider,
      eqContainer,
      sliderValue,
      isDragging,
      startDrag,
      onDrag,
      stopDrag,
      handleLogin,
      forgotPassword
    }
  }
}
</script>

<style scoped>
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

input[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

<style>
/* 音量控制条样式 - 必须是全局样式（非scoped） */
#eq {
  text-align: center;
  border: 1px solid #eaeaea;
  padding: 20px;
  height: 150px;
  position: relative;
  cursor: pointer;
  user-select: none;
}

#eq span {
  display: inline-block;
  width: 20px;
  min-height: 20px;
  max-height: 100%;
  background: #000;
  border-radius: 10px;
  position: relative;
  transition: height 0.2s ease;
}

#eq span::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #198a88, #000);
  border-radius: 10px;
}
</style>