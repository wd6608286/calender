<template>
  <div class="graph">
    <div class="graph-head">
      <h3>{{ t('downloads.title') }}</h3>
      <div id="dd" class="wrapper-dropdown-2" tabindex="1" @click="toggleDropdown">
        <span><img src="/images/settings.png" alt="Settings menu"></span>
        <ul class="dropdown" v-show="isOpen">
          <li><a href="#">View Profile</a></li>
          <li><a href="#">Lists</a></li>
          <li><a href="#">Help</a></li>
          <li><a href="#">Activity log</a></li>
          <li><a href="#">Report a problem</a></li>
          <li><a href="#">Log out</a></li>
        </ul>
      </div>
      <div class="clearfix"></div>
    </div>
    
    <div ref="chartContainer" style="width: 100%; height: 320px; margin: 0 auto; padding: 3em; border: 1px solid #eaeaea; background: #FFFFFF"></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import Highcharts from 'highcharts'

export default {
  name: 'DownloadsChart',
  setup() {
    const { t } = useI18n()
    const isOpen = ref(false)
    const chartContainer = ref(null)
    let chart = null
    
    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }
    
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.wrapper-dropdown-2')) {
        isOpen.value = false
      }
    })
    
    onMounted(() => {
      chart = Highcharts.chart(chartContainer.value, {
        title: {
          text: 'latest week 13,250',
          style: {
            color: '#222222',
            fontWeight: '100'
          }
        },
        xAxis: {
          categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
        },
        yAxis: {
          labels: {
            formatter: function() {
              return this.value + 'k'
            }
          },
          title: {
            enabled: false
          }
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            color: '#222222'
          }
        },
        legend: {
          enabled: false
        },
        tooltip: {
          shared: true,
          pointFormat: '{point.x} k',
          backgroundColor: '#FFFFFF'
        },
        series: [{
          data: [1, 4.5, 4, 6.7, 1],
          pointStart: 1
        }]
      })
    })
    
    onBeforeUnmount(() => {
      if (chart) {
        chart.destroy()
      }
    })
    
    return {
      t,
      isOpen,
      chartContainer,
      toggleDropdown
    }
  }
}
</script>