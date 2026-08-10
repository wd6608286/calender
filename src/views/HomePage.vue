<template>
  <div class="container">
    <Header />
    <div class="main-content">
      <div class="content-top">
        <div class="col-md-6 span_1_of_1">
          <Calendar />
          <div class="circles-grid">
            <div class="circle-left">
              <div class="skill-grid">
                <div id="circles-1"></div>
              </div>
            </div>
            <div class="circle-right">
              <div class="skill-grid">
                <div id="circles-2"></div>
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
          <AudioPlayer />
        </div>
        <div class="col-md-6 span_1_of_2">
          <Weather />
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="col-md-12">
        <ContentMiddle />
      </div>
      <div class="content-bottom">
        <div class="col-md-8 graph">
          <DownloadsChart />
        </div>
        <div class="col-md-4 content-bottom-right">
          <SearchBox />
          <TodoList />
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Calendar from '../components/Calendar.vue'
import AudioPlayer from '../components/AudioPlayer.vue'
import Weather from '../components/Weather.vue'
import ContentMiddle from '../components/ContentMiddle.vue'
import DownloadsChart from '../components/DownloadsChart.vue'
import SearchBox from '../components/SearchBox.vue'
import TodoList from '../components/TodoList.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'HomePage',
  components: {
    Header,
    Calendar,
    AudioPlayer,
    Weather,
    ContentMiddle,
    DownloadsChart,
    SearchBox,
    TodoList,
    Footer
  }
}
</script>