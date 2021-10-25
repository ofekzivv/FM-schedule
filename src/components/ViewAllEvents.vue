<template>
    <div class="my-font">
      <div>
        <AllView/>
      </div>
    </div>
</template>

<script>
import AllView from "pages/AllView";
import {getAllUsersEvents} from 'src/middleware/firebase/database';
export default {
  name: "ViewAllEvents",
  components: {AllView},

}

</script>

<style scoped>

</style>
