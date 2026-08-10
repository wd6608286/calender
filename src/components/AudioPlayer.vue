<template>
  <div class="tabs-play-list">
    <div id="horizontalTab">
      <ul class="resp-tabs-list">
        <li>{{ t('audio.nowPlaying') }}</li>
        <li>{{ t('audio.playlist') }}</li>
        <li>{{ t('audio.favorites') }}</li>
        <div class="clearfix"></div>
      </ul>
      <div class="resp-tabs-container">
        <div>
          <div class="play-song">
            <h3>BLACK ROOM BOY</h3>
            <p>Above and Beyond</p>
          </div>
          <div class="audio-player">
            <audio id="audio-player" controls="controls" ref="audioElement" @volumechange="onVolumeChange">
              <source src="/media/Blue Browne.ogg" type="audio/ogg">
              <source src="/media/Blue Browne.mp3" type="audio/mpeg">
              <source src="/media/Georgia.ogg" type="audio/ogg">
              <source src="/media/Georgia.mp3" type="audio/mpeg">
            </audio>
          </div>
          <ul class="next-top">
            <li><a href="#"><i> </i></a></li>
            <li><a href="#"><i class="next"> </i></a></li>
          </ul>
          
          <!-- 音量控制 -->
          <div class="volume-control">
            <label>{{ t('audio.volume') }}: {{ volume }}%</label>
            <div class="volume-slider" ref="volumeContainer" @mousedown="startDrag" @mousemove="onDrag" @mouseup="stopDrag" @mouseleave="stopDrag">
              <div class="volume-bar" :style="{ width: volume + '%' }"></div>
            </div>
          </div>
        </div>
        <div>
          <div class="play-lists">
            <div class="play-list">
              <img src="/images/p3.jpg" alt="" />
              <a href="#">Zindagi Aa Raha Hoor</a>
              <div class="clearfix"></div>
              <img src="/images/p2.jpg" alt="" />
              <a href="#">College Time</a>
              <div class="clearfix"></div>
              <img src="/images/p1.jpg" alt="" />
              <a href="#">pyar ki baate</a>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
        <div>
          <div class="play-lists">
            <div class="play-list">
              <img src="/images/p1.jpg" alt="" />
              <a href="#">pyar ki baate</a>
              <div class="clearfix"></div>
              <img src="/images/p2.jpg" alt="" />
              <a href="#">College Time</a>
              <div class="clearfix"></div>
              <img src="/images/p3.jpg" alt="" />
              <a href="#">Zindagi Aa Raha Hoor</a>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 饼图 -->
    <div class="audio-doughnut">
      <canvas ref="doughnutCanvas" width="200" height="200"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'AudioPlayer',
  setup() {
    const { t } = useI18n()
    const audioElement = ref(null)
    const volumeContainer = ref(null)
    const doughnutCanvas = ref(null)
    const volume = ref(67)
    const isDragging = ref(false)
    
    const startDrag = (e) => {
      isDragging.value = true
      updateVolume(e)
    }
    
    const onDrag = (e) => {
      if (isDragging.value) {
        updateVolume(e)
      }
    }
    
    const stopDrag = () => {
      isDragging.value = false
    }
    
    const updateVolume = (e) => {
      if (!volumeContainer.value) return
      const rect = volumeContainer.value.getBoundingClientRect()
      const x = e.clientX - rect.left
      const width = rect.width
      const percentage = Math.max(0, Math.min(100, (x / width * 100)))
      volume.value = Math.round(percentage)
      if (audioElement.value) {
        audioElement.value.volume = volume.value / 100
      }
    }
    
    const onVolumeChange = () => {
      if (audioElement.value) {
        volume.value = Math.round(audioElement.value.volume * 100)
      }
    }
    
    onMounted(() => {
      // 初始化音量
      if (audioElement.value) {
        audioElement.value.volume = volume.value / 100
      }
      
      // 绘制饼图
      if (!doughnutCanvas.value) return
      
      const ctx = doughnutCanvas.value.getContext('2d')
      const data = [30, 40, 30]
      const colors = ['#575757', '#3f3f3f', '#000000']
      const total = data.reduce((sum, val) => sum + val, 0)
      
      const centerX = doughnutCanvas.value.width / 2
      const centerY = doughnutCanvas.value.height / 2
      const outerRadius = Math.min(centerX, centerY) - 10
      const innerRadius = outerRadius * 0.6
      
      let startAngle = -Math.PI / 2
      
      data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI
        
        ctx.beginPath()
        ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle)
        ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true)
        ctx.closePath()
        
        ctx.fillStyle = colors[index]
        ctx.fill()
        
        startAngle += sliceAngle
      })
    })
    
    return {
      t,
      audioElement,
      volumeContainer,
      doughnutCanvas,
      volume,
      isDragging,
      startDrag,
      onDrag,
      stopDrag,
      onVolumeChange
    }
  }
}
</script>

<style scoped>
.volume-control {
  margin-top: 15px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.volume-control label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}

.volume-slider {
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.volume-bar {
  height: 100%;
  background: linear-gradient(to right, #198a88, #000);
  border-radius: 5px;
  transition: width 0.1s ease;
}

.audio-doughnut {
  margin-top: 20px;
  text-align: center;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

.audio-doughnut canvas {
  max-width: 100%;
}
</style>