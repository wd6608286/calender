<template>
  <div class="temp">
    <div class="temp-head text-center">
      <h4>{{ t('weather.today') }}</h4>
      <p>15 AUGUST 2015</p>
    </div>
    <div class="temp-in">
      <div class="temp-in-left">
        <h2>25°</h2>
      </div>
      <div class="temp-in-right">
        <img src="/images/temp.png" alt="" />
      </div>
      <div class="clearfix"></div>
      <p>{{ t('weather.message') }}</p>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'Weather',
  setup() {
    const { t } = useI18n()
    return { t }
  }
}
</script>