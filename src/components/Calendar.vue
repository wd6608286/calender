<template>
  <div class="calender">
    <div class="column_right_grid calender">
      <div class="cal1">
        <div class="clndr">
          <div class="clndr-controls">
            <div class="clndr-control-button">
              <p class="clndr-previous-button" @click="previousMonth">previous</p>
            </div>
            <div class="month">{{ currentMonthYear }}</div>
            <div class="clndr-control-button rightalign">
              <p class="clndr-next-button" @click="nextMonth">next</p>
            </div>
          </div>
          
          <table class="clndr-table" border="0" cellspacing="0" cellpadding="0">
            <thead>
              <tr class="header-days">
                <td v-for="day in daysOfWeek" :key="day" class="header-day">{{ day }}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex">
                <td 
                  v-for="(day, dayIndex) in week" 
                  :key="dayIndex"
                  :class="getDayClasses(day)"
                >
                  <div class="day-contents">{{ day.day }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'

export default {
  name: 'Calendar',
  setup() {
    const currentDate = ref(dayjs())
    const daysOfWeek = ['Sun', 'Mon', 'Tu', 'We', 'T', 'Fr', 'Su']
    
    const events = ref([
      { startDate: dayjs().startOf('month').add(9, 'day'), endDate: dayjs().startOf('month').add(13, 'day'), title: 'Multi-Day Event' },
      { startDate: dayjs().startOf('month').add(20, 'day'), endDate: dayjs().startOf('month').add(22, 'day'), title: 'Another Multi-Day Event' }
    ])
    
    const currentMonthYear = computed(() => {
      return currentDate.value.format('MMMM YYYY')
    })
    
    const calendarDays = computed(() => {
      const startOfMonth = currentDate.value.startOf('month')
      const endOfMonth = currentDate.value.endOf('month')
      const startDay = startOfMonth.day()
      const daysInMonth = endOfMonth.date()
      const today = dayjs()
      
      const days = []
      
      const prevMonthEnd = startOfMonth.subtract(1, 'month').endOf('month').date()
      for (let i = startDay - 1; i >= 0; i--) {
        days.push({
          day: prevMonthEnd - i,
          date: startOfMonth.subtract(i + 1, 'day'),
          isCurrentMonth: false,
          isLastMonth: true,
          isPast: true,
          hasEvent: false
        })
      }
      
      for (let i = 1; i <= daysInMonth; i++) {
        const date = startOfMonth.date(i)
        const hasEvent = events.value.some(event => {
          return date.isSame(event.startDate, 'day') || 
                 date.isSame(event.endDate, 'day') ||
                 (date.isAfter(event.startDate, 'day') && date.isBefore(event.endDate, 'day'))
        })
        
        days.push({
          day: i,
          date: date,
          isCurrentMonth: true,
          isToday: date.format('YYYY-MM-DD') === today.format('YYYY-MM-DD'),
          isPast: date.isBefore(today, 'day'),
          hasEvent: hasEvent
        })
      }
      
      const nextMonthStart = 7 - (days.length % 7)
      if (nextMonthStart < 7) {
        for (let i = 1; i <= nextMonthStart; i++) {
          days.push({
            day: i,
            date: endOfMonth.add(i, 'day'),
            isCurrentMonth: false,
            isNextMonth: true,
            isPast: false,
            hasEvent: false
          })
        }
      }
      
      return days
    })
    
    const calendarWeeks = computed(() => {
      const weeks = []
      for (let i = 0; i < calendarDays.value.length; i += 7) {
        weeks.push(calendarDays.value.slice(i, i + 7))
      }
      return weeks
    })
    
    const getDayClasses = (day) => {
      const classes = ['day']
      
      if (day.isPast) classes.push('past')
      if (day.isLastMonth) {
        classes.push('adjacent-month')
        classes.push('last-month')
      }
      if (day.isNextMonth) {
        classes.push('adjacent-month')
        classes.push('next-month')
      }
      if (day.isToday) classes.push('today')
      if (day.hasEvent) classes.push('event')
      
      classes.push(`calendar-day-${day.date.format('YYYY-MM-DD')}`)
      
      return classes
    }
    
    const previousMonth = () => {
      currentDate.value = currentDate.value.subtract(1, 'month')
    }
    
    const nextMonth = () => {
      currentDate.value = currentDate.value.add(1, 'month')
    }
    
    onMounted(() => {
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 37) previousMonth()
        if (e.keyCode === 39) nextMonth()
      })
    })
    
    return {
      currentDate,
      daysOfWeek,
      currentMonthYear,
      calendarWeeks,
      getDayClasses,
      previousMonth,
      nextMonth
    }
  }
}
</script>