<template>
  <div>
    <!-- Navbar -->
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light"
      style="background-color: #bf2c3e !important"
    >
      <div v-for="index in 12" :key="index">
        <img
          style="height: 50px; width: 75px;"
          src="https://vignette.wikia.nocookie.net/pokemon/images/b/b6/Diglett_XY.gif/revision/latest?cb=20150201051844"
        >
        <img
          style="height: 50px; width: 75px;"
          src="https://vignette.wikia.nocookie.net/pokemon/images/7/72/Dugtrio_XY.gif/revision/latest?cb=20150201051845"
        >
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>

    <!-- Container -->
    <div class="container text-center">
      <div
        style="
    color:black;
    padding-top: 50px;
    padding-bottom: 50px;
    margin: 100px;
    border: 2px solid;
    background-color:white ;
    border-radius: 15px;
    border-color: #BF2C3E;
    "
      >
        <h3>"Room, I choose you!"</h3>
        <br>
        <img
          height="100px;"
          width="100px;"
          src="https://image.flaticon.com/icons/png/512/362/362003.png"
        >
        <br>
        <button class="btn btn-danger" disabled>Trainer {{ name }}</button>

        <form class="form-signin" @submit.prevent="registerRoom">
          <label class="sr-only"></label>
          <br>
          <input
            style="margin: 0 auto; width: 300px;"
            type="text"
            class="form-control"
            v-model="newRoom"
            required
          >
          <br>
          <button class="btn btn-danger" type="submit">Confirm new room</button>
        </form>
      </div>
    </div>

    <div class="container text-center">
      <div
        class="row"
        style="
    color:black;
    padding: 50px;
    border: 2px solid;
    background-color:white ;
    border-radius: 15px;
    border-color: #BF2C3E;
    "
      >
        <div class="mt-5 row justify-content-between">
          <div class="col-lg-3 mx-2 mb-3" v-for="(room, index) in rooms" :key="index" style="padding: 0;" >
            <div class="card text-center shadow-sm bg-white rounded" style="width: 18rem;">
              <div class="card-body" style="background-color: rgb(232,123,133);">
                <h5 class="card-title">{{ room.name }}</h5>
                <h5 class="card-title" v-if="room.winner!=''">the Winner : {{ room.winner }}</h5>
                <div v-else>
                  <h4 class="card-text" >{{ room.players.length}}/5</h4>
                  <a href="#" class="btn yellow mt-2 disabled"
                  v-if="room.players.length === 5 ">Full</a>
                  <a href class="btn blue mt-2" v-else @click.prevent="join(room.id)">Join</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      newRoom: '',
      name: localStorage.username,
    };
  },
  created() {
    this.$store.dispatch('getAllRoom');
  },
  computed: {
    ...mapState(['rooms']),
  },
  methods: {
    registerRoom() {
      this.$store.dispatch('createRoom', this.newRoom);
      localStorage.setItem('room', this.newRoom);
    },
    join(roomId) {
      this.$store.dispatch('joinRoom', roomId);
    },
  },
};
</script>
