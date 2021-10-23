<template>
  <div class="cards" >
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">{{eventDetails.type}}פוסט</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{eventDetails.title}}</div>
          <div class="text-caption text-grey">
            לכתוב פוסט לכבוד ראש השנה שכלול פה מלא דברים ועכשיו אני סתם חרטטת מילים אבל זה לא משנה כי זה יהיה הפוסט
            {{eventDetails.details}}
          </div>
        </q-card-section>

      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
          18:30
        </q-btn>
        <q-btn flat color="primary">
          25/10/2021
          {{eventDetails.date}}
        </q-btn>
      </q-card-actions>
    </q-card>
<!--    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">סרטון</div>
          <div class="text-h5 q-mt-sm q-mb-xs">סרטון ליום כיפור</div>
          <div class="text-caption text-grey">
            להעלות סרטון על כמה זה חשוב לצום ביום כיפור ושוב אני מחרטטת פה דברים כדי שיהיה עומק
          </div>
        </q-card-section>

      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
          15:30
        </q-btn>
        <q-btn flat color="primary">
          28/10/2021
        </q-btn>
      </q-card-actions>
    </q-card>-->
  </div>

</template>

<script>
export default {
  name: "eventsCards",
  props: ['eventDetails']
}
</script>

<style scoped>

.my-card{
  width: 100%;
  max-width: 350px;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 3em;
  justify-content: center;
  align-items: center;
}

</style>
