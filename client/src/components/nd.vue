<template>
  <div class="diglet" v-html="text"></div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      text: `<br><br><br><br><br>
        ~^~^~^~~^~^~~`,
    };
  },
};
</script>
