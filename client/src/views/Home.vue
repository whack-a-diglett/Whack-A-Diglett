<template>
  <div>
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
        <h2>Whack-A-Diglett</h2>
        <img src="https://media0.giphy.com/media/WF995oMkoOpWw/giphy.gif">
        <form @submit.prevent="register">
          <br>
          <h3>Write your trainer name!</h3>
          <input v-model="name" type="text" placeholder="Your trainer name">
          <br>
          <br>
          <img height="100px;" width="100px;" :src="trainerImage">
          <br>
          <button type="submit" class="btn btn-danger">Yep, call me {{ name }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      image: "https://media3.giphy.com/media/XHXTveQwggiWI/giphy.gif",
      trainerImage: "https://image.flaticon.com/icons/png/512/362/362003.png"
    };
  },
  methods: {
    register() {
      localStorage.setItem("username", this.name);
      this.$store.commit("register", this.name);
      this.$store.dispatch("getAllRoom");
      this.$router.push("/lobby");
    }
  }
};
</script>
