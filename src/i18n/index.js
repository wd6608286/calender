import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    header: {
      title: 'CALENDAR',
      login: 'Login',
      logout: 'Logout',
      language: '语言'
    },
    calendar: {
      title: 'Calendar'
    },
    weather: {
      today: 'TODAY',
      message: 'The perfect day for a walk in the park and some delicious brunch. Cheers!'
    },
    audio: {
      nowPlaying: 'Now Playing',
      playlist: 'Playlist',
      favorites: 'Favorites',
      volume: 'Volume'
    },
    login: {
      title: 'Login',
      username: 'Username',
      password: 'Password',
      remember: 'Remember My Password',
      signIn: 'Sign In',
      forgotPassword: 'Forgot your password?',
      loginSuccess: 'Login successful! Welcome',
      loginFailed: 'Invalid username or password',
      connectionError: 'Connection error. Please ensure the backend server is running.'
    },
    downloads: {
      title: 'DOWNLOADS'
    },
    search: {
      placeholder: 'Search...'
    },
    todo: {
      title: 'TODO LIST',
      addPlaceholder: 'Add a new task...'
    }
  },
  zh: {
    header: {
      title: '日历',
      login: '登录',
      logout: '退出',
      language: 'Language'
    },
    calendar: {
      title: '日历'
    },
    weather: {
      today: '今天',
      message: '适合在公园散步和享用美味早午餐的完美一天。干杯！'
    },
    audio: {
      nowPlaying: '正在播放',
      playlist: '播放列表',
      favorites: '收藏夹',
      volume: '音量'
    },
    login: {
      title: '登录',
      username: '用户名',
      password: '密码',
      remember: '记住密码',
      signIn: '登录',
      forgotPassword: '忘记密码？',
      loginSuccess: '登录成功！欢迎',
      loginFailed: '用户名或密码错误',
      connectionError: '连接错误。请确保后端服务器正在运行。'
    },
    downloads: {
      title: '下载量'
    },
    search: {
      placeholder: '搜索...'
    },
    todo: {
      title: '待办事项',
      addPlaceholder: '添加新任务...'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n