<template>
  <div>
    <div
      style="
    color:black;
    padding-top: 50px;
    padding-bottom: 50px;
    margin: 250px;
    border: 2px solid;
    background-color:white ;
    border-radius: 15px;
    border-color: #BF2C3E;
    background-image: url(https://media.giphy.com/media/120ErahsQyf1q8/giphy.gif);
background-repeat: no-repeat;
background-size: cover;

    "
    >
      <img src>
      <div style="text-align: center;">
        <h1>Room {{ thisRoom.name }}</h1>
        <img src="https://i.chzbgr.com/full/7896735488/h49AA1997/">
        <div v-for="(player,index) in thisRoom.players" v-bind:key="index">
          <div v-if="index === 0">
            <br>
            <h2>The winner....</h2>
            <img
              src="https://cdn2.scratch.mit.edu/get_image/user/2428827_90x90.png"
              height="200px"
              width="200px"
            >
            <h4>Trainer: {{ player.name }}</h4>
            <h4>Score: {{ player.score }}</h4>
            <br>
            <br>
            <h2>The Losers....</h2>
          </div>
          <div v-else>
            <img src="https://i.ya-webdesign.com/images/sad-pikachu-png-7.gif" height="100px;">
            <h4>Trainer: {{ player.name }}</h4>
            <h4>Score: {{ player.score }}</h4>
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import db from '@/api/api';

export default {
  data() {
    return {
      thisRoom: {},
    };
  },
  created() {
    db.collection('room')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        console.log(doc.data());
        this.thisRoom = doc.data();
        this.thisRoom.players.sort((a, b) => (a.score > b.score ? -1 : 1));
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
