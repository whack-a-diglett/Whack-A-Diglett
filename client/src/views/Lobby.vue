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
        <h3>Room, I choose you!</h3>
        <img
          height="100px;"
          width="100px;"
          src="https://image.flaticon.com/icons/png/512/362/362003.png"
        >
        <br>
        <button class="btn btn-danger" disabled>Trainer {{ name }}</button>
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
        <div style="border: 2px solid;"
          v-for="(room, index) in rooms"
          :key="index"
          class="d-flex col-md-3"
        >{{ room.name }} {{ room.players }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: localStorage.name,
      rooms: [
        {
          name: 'Alpha',
          players: 1,
        },
        {
          name: 'Bravo',
          players: 2,
        },
        {
          name: 'Charlie',
          players: 2,
        },
        {
          name: 'Delta :)',
          players: 3,
        },
        {
          name: 'Echo',
          players: 4,
        },
      ],
    };
  },
};
</script>
