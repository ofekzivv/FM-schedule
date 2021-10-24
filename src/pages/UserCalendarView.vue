<template>
  <div>
    <div class="constrain text-center my-font">
      <p class="q-mt-md text-subtitle1">שלום, {{ companyName }}</p>
      <p class="q-mt-md text-h5 text-bold">בחר תצוגת לוח שנה</p>
      <q-btn-group>
        <q-btn color="primary" push label="יומית" icon="calendar_view_day" @click="dayView"/>
        <q-btn color="primary" push label="שבועית" icon="calendar_view_week" @click="weekView"/>
        <q-btn color="primary" push label="חודשית" icon="calendar_view_month" @click="monthView"/>
      </q-btn-group>
    </div>

    <DayCalendar class="q-mt-md" v-if="dayViewer" :company="companyName"/>
    <WeekCalendar class="q-mt-md" v-if="weekViewer" :company="companyName"/>
    <MonthCalendar class="q-mt-md" v-if="MonthViewer" :company="companyName"/>
  </div>
</template>

<script>
import DayCalendar from "components/DayCalendar";
import WeekCalendar from "components/WeekCalendar";
import MonthCalendar from "components/MonthCalendar";

export default {
  components: {
    DayCalendar, WeekCalendar, MonthCalendar
  },
  data() {
    return {
      companyName: this.$route.params.companyName,
      dayViewer: false,
      weekViewer: false,
      MonthViewer: false,

    }
  },

  methods: {
    dayView() {
      this.weekViewer = false;
      this.MonthViewer = false;
      this.dayViewer = true;
    },
    weekView() {
      this.dayViewer = false;
      this.MonthViewer = false;
      this.weekViewer = true;
    },
    monthView() {
      this.weekViewer = false;
      this.dayViewer = false;
      this.MonthViewer = true;
    },


  }
}
</script>

<style scoped>

</style>
