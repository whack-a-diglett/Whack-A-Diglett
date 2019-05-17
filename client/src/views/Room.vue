<template>
  <div id="room">
    <div style="display: flex; justify-content: center">
      <div id="moles">
        <div style="display: flex;" class="row">
          <span class="hitbox" @click.prevent="hit(1)">
            <component :is="pos1"></component>
          </span>
          &nbsp;
          <span class="hitbox" @click.prevent="hit(2)">
            <component :is="pos2"></component>
          </span>
          &nbsp;
          <span class="hitbox" @click.prevent="hit(3)">
            <component :is="pos3"></component>
          </span>
          &nbsp;
          <span class="hitbox" @click.prevent="hit(4)">
            <component :is="pos4"></component>
          </span>
        </div>
        <div style="display: flex;" class="row">
          <span class="hitbox" @click.prevent="hit(5)">
            <component :is="pos5"></component>
          </span>
          &nbsp;
          <span class="hitbox" @click.prevent="hit(6)">
            <component :is="pos6"></component>
          </span>
          &nbsp;
          <span class="hitbox" @click.prevent="hit(7)">
            <component :is="pos7"></component>
          </span>
          &nbsp;
          <span class="hitbox" @click.prevent="hit(8)">
            <component :is="pos8"></component>
          </span>
        </div>
        <div style="display: flex;" class="row">
          <span class="hitbox" @click.prevent="hit(9)">
            <component :is="pos9"></component>
          </span>
          &nbsp;
          <span class="hitbox" @click.prevent="hit(10)">
            <component :is="pos10"></component>
          </span>
          &nbsp;
          <span class="hitbox" @click.prevent="hit(11)">
            <component :is="pos11"></component>
          </span>
          &nbsp;
          <span class="hitbox" @click.prevent="hit(12)">
            <component :is="pos12"></component>
          </span>
        </div>
      </div>
      <br>
    </div>
    <div
      style="margin-left: 2rem; margin-right: 2rem; display: flex; justify-content: space-between;"
    >
      <span>
        <a href="#" @click.prevent="startstop" v-if="statusAdmin"><i>START</i></a> ({{startStatus}})<br><br>
        <span style="font-size: 1.8rem;">
          SCORE: {{myscore}}<br>
          {{alert}}
        </span>
        <br><br><br>
        <a href="#" style="color: #ff180c;" @click.prevent="timeleft = 45000">Reset timer</a>
      </span>
      <span style="text-align: center;">
        <span style="font-size: 2.8rem; color: #f9dc1d;">
          {{formatTimeLeft}} seconds
        </span>
        <div>
          <div style="font-size: 1.2rem; margin-top: 0.4rem; margin-bottom: 0.4rem;">Scores:</div>
          <div style="padding: 0.2rem 0.9rem; border-top: 1px solid #ccc;" v-for="(player, index) in thisRoom.players" v-bind:key="player.name">
              Player {{index + 1}}: {{player.name}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;SCORE: {{player.score}}
          </div>
        </div>
      </span>
      <span style="text-align: right;">
        TARGET:<br>
        <span style="font-size: 1.2rem; color: #ccc;">
          Position: {{position}}<br>
          Elevation: {{elevation}}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/api/api";

import d3 from "@/components/d3.vue";
import d2 from "@/components/d2.vue";
import d1 from "@/components/d1.vue";
import d0 from "@/components/nd.vue";

let refresh;
let countdown;

export default {
  data() {
    return {
      thisRoom: {},
      myPoint: 0,
      position: "none",
      elevation: 0,
      myscore: 0,
      start: false,
      timeleft: 30000,
      alert: "",
      statusAdmin: null
    };
  },
  components: {
    d3,
    d2,
    d1,
    d0
  },
  created() {
    db.collection("room")
      .doc(this.$route.params.id)
      .onSnapshot(doc => {
        console.log(doc.data());
        this.thisRoom = doc.data();
        if (this.thisRoom.players[0].name === localStorage.username) {
          this.statusAdmin = true;
        }
        if (this.thisRoom.status) {
          this.start = true;
          refresh = setInterval(() => {
            this.position = Math.ceil(Math.random() * 12);
          }, 1500);

          countdown = setInterval(() => {
            this.timeleft -= 500;
          }, 500);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    hit(num) {
      console.log(`${num}  |  ${this.position}`);
      if (num === this.position) {
        var audio = new Audio("/hit.mp3");
        audio.play();
        console.log(`Hit pos ${num}`);
        this.myscore += 1;
        this.alert = "Hit !!!";
        setTimeout(() => {
          this.alert = "";
        }, 500);

        const newPlayers = this.thisRoom.players;
        newPlayers.find(element => {
          if (element.name === localStorage.username) {
            element.score = this.myscore;
          }
        });

        db.collection("room")
          .doc(this.$route.params.id)
          .update({
            players: newPlayers
          })
          .then(() => {
            console.log("success ");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        var audio = new Audio("/miss.mp3");
        audio.play();
      }
    },

    startstop() {
      db.collection("room")
        .doc(this.$route.params.id)
        .update({
          status: true
        })
        .then();
    },
  },
  computed: {
    startStatus: function () {
      if (this.start) {
        return "Game Started!"
      } else {
        return "Not yet Started"
      }
      return "Not yet Started";
    },
    formatTimeLeft: function () {
      return (this.timeleft / 1000).toFixed(1)
    },
    pos1: function () {
      if (this.position === 1) {
        return 'd' + this.elevation;
      }
      return "d0";
    },
    pos2: function () {
      if (this.position === 2) {
        return 'd' + this.elevation;
      }
      return "d0";
    },
    pos3: function () {
      if (this.position === 3) {
        return 'd' + this.elevation;
      }
      return "d0";
    },
    pos4: function () {
      if (this.position === 4) {
        return 'd' + this.elevation;
      }
      return "d0";
    },
    pos5: function () {
      if (this.position === 5) {
        return 'd' + this.elevation;
      }
      return "d0";
    },
    pos6: function () {
      if (this.position === 6) {
        return 'd' + this.elevation;
      }
      return "d0";
    },
    pos7: function () {
      if (this.position === 7) {
        return 'd' + this.elevation;
      }
      return "d0";
    },
    pos8: function () {
      if (this.position === 8) {
        return 'd' + this.elevation;
      }
      return "d0";
    },
    pos9: function () {
      if (this.position === 9) {
        return 'd' + this.elevation;
      }
      return "d0";
    },
    pos10: function () {
      if (this.position === 10) {
        return 'd' + this.elevation;
      }
      return "d0";
    },
    pos11: function () {
      if (this.position === 11) {
        return 'd' + this.elevation;
      }
      return "d0";
    },
    pos12: function () {
      if (this.position === 12) {
        return 'd' + this.elevation;
      }
      return "d0";
    }
  },
  watch: {
    position() {
      setTimeout(() => {
        this.elevation = 1;
      }, 480);
      setTimeout(() => {
        this.elevation = 2;
      }, 560);
      setTimeout(() => {
        this.elevation = 3;
      }, 640);
      setTimeout(() => {
        this.elevation = 2;
      }, 840);
      setTimeout(() => {
        this.elevation = 1;
      }, 920);
      setTimeout(() => {
        this.elevation = 0;
      }, 1000);
    },
    timeleft: function() {
      if (this.timeleft <= 0) {
        this.start = false;
        clearInterval(refresh);
        clearInterval(countdown);
        this.$router.push(`/room/${this.$route.params.id}/result`);
      }
    }
  }
};
</script>

<style scoped>
#room {
  all: initial;
}

* {
  color: white;
  font-family: "Inconsolata", monospace;
  margin: 0;
  padding: 0;
}

#room {
  width: 100%;
  height: 95vh;
}

.diglet {
  font-size: 0.9rem;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0);
  margin: 1.2rem;
}

.hitbox {
  cursor: pointer;
}

#moles {
  top: 1rem;
  z-index: 1;
}
</style>
