<template>
  <div>
    {{thisRoom}}
    dasd
    <button type="submit" @click.prevent="score">SCORE</button>
  </div>
</template>

<script>
import db from "@/api/api";

export default {
  data() {
    return {
      thisRoom: {},
      myPoint: 0
    };
  },
  created() {
    db.collection("room")
      .doc(this.$route.params.id)
      .onSnapshot(doc => {
        console.log(doc.data());
        this.thisRoom = doc.data();
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    score() {
      console.log(this.$route.params.id,"<<<<<<<<<<<<<<<<<<<");
      
      this.myPoint += 1;
      db.collection("room")
        .doc(this.$route.params.id)
        .update({
          players: { name: localStorage.username, score: this.myPoint }
        })
        .then(() => {
          console.log("success ");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>