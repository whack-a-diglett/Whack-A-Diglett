<template>
  <div>{{thisRoom}}

      dasd
  </div>
</template>

<script>
export default {
  data() {
    return {
      thisRoom: '',
    };
  },
  created() {
      console.log($store.state.myRoom);
      
      this.thisRoom = $store.state.myRoom
  },
};
</script>