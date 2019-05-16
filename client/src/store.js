import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/api/api';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    currentRoomId: '',
    currentPlayer: '',
    myRoom: {},
  },
  mutations: {
    register(state, payload) {
      state.currentPlayer = payload;
    },
    getRooms(state, payload) {
      state.rooms = payload;
      if (localStorage.getItem('roomId')) {
        const room = state.rooms.find(room => room.id === localStorage.getItem('roomId'));
        state.myRoom = room;
      }
    },
  },
  actions: {
    getAllRoom(context) {
      db.collection('room')
        .orderBy('createdAt')
        .onSnapshot((docs) => {
          const data = [];
          docs.forEach((e) => {
            const info = e.data();
            info.id = e.id;
            data.push(info);
          });
          context.commit('getRooms', data);
        }, (err) => {
          console.log(err);
        });
    },
    createRoom(context, payload) {
      let nameUser = localStorage.getItem('username')
      db.collection('room')
        .add({
          name: payload,
          players: [{ name: nameUser, score: 0 }],
          winner: '',
          createdAt: new Date(),
        })
        .then((docs) => {
          localStorage.setItem('idRoom', docs._key.path.segments[1]);
          router.push(`/game/${docs._key.path.segments[1]}`)
          context.dispatch('getAllRoom');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    joinRoom(context, payload) {
      let newPlayers = [];
      const room = context.state.rooms.find(room => room.id === payload);
      newPlayers = room.players;
      newPlayers.push({ name: context.state.currentPlayer, score: 0 });
      db.collection('room')
        .doc(payload)
        .update({
          players: newPlayers,
        })
        .then((docs) => {
          console.log("store docs ", room);
          router.push(`/game/${payload}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
});
