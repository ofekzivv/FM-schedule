<template>
  <div>
    <div class="constrain text-center my-font">
      <p class="q-mt-md text-subtitle1">שלום, {{ this.companyName }}</p>
      <p class="q-mt-md text-h5 text-bold">בחר תצוגת לוח שנה</p>
      <q-btn-group>
        <q-btn color="primary" push label="יומית" icon="calendar_view_day" @click="dayView"/>
        <q-btn color="primary" push label="שבועית" icon="calendar_view_week" @click="weekView"/>
        <q-btn color="primary" push label="חודשית" icon="calendar_view_month" @click="monthView"/>
        <q-btn color="primary" push label="כללית"  @click="allView"/>
      </q-btn-group>
    </div>

    <DayCalendar class="q-mt-md" v-if="dayViewer" :company="companyName"/>
    <WeekCalendar class="q-mt-md" v-if="weekViewer" :company="companyName"/>
    <MonthCalendar class="q-mt-md" v-if="MonthViewer" :company="companyName"/>
    <AllView class="q-mt-md" v-if="allViewer" />
  </div>
</template>

<script>
import DayCalendar from "components/DayCalendar";
import WeekCalendar from "components/WeekCalendar";
import MonthCalendar from "components/MonthCalendar";
import AllView from "pages/AllView";

export default {
  components: {
    AllView, DayCalendar, WeekCalendar, MonthCalendar
  },
  data() {
    return {
      companyName: this.$route.params.companyName,
      dayViewer: false,
      weekViewer: false,
      MonthViewer: false,
      allViewer: false
    }
  },

  methods: {
    dayView() {
      this.weekViewer = false;
      this.MonthViewer = false;
      this.dayViewer = true;
      this.allViewer= false
    },
    weekView() {
      this.dayViewer = false;
      this.MonthViewer = false;
      this.weekViewer = true;
      this.allViewer= false
    },
    monthView() {
      this.weekViewer = false;
      this.dayViewer = false;
      this.MonthViewer = true;
      this.allViewer= false
    },
    allView(){
      this.dayViewer = false;
        this.weekViewer = false;
        this.MonthViewer = false;
      this.allViewer= true
    }

  }
}
</script>

<style scoped>

</style>
