<template>
  <div>
    {{thisRoom}}
    dasd
    <button type="submit" @click.prevent="score">SCORE</button>
  </div>
</template>

<script>
import db from '@/api/api';

export default {
  data() {
    return {
      thisRoom: {},
      myPoint: 0,
    };
  },
  created() {
    db.collection('room')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        console.log(doc.data());
        this.thisRoom = doc.data();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    score() {
      this.myPoint += 1;

      const newPlayers = this.thisRoom.players;
      newPlayers.find((element) => {
        if (element.name === localStorage.username) {
          element.score = this.myPoint;
        }
      });

      db.collection('room')
        .doc(this.$route.params.id)
        .update({
          players: newPlayers,
        })
        .then(() => {
          console.log('success ');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
