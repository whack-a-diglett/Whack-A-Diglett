<template>
    <div class="diglet" v-html="text"></div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      text: `<br><br>&nbsp;&nbsp;&nbsp;,......<br>
        &nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;╲<br>
        &nbsp;&nbsp;│|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;│<br>
        ~^~^~^~~^~^~~`,
    };
  },
};
</script>
