import Vue from 'vue';
import Vuex from 'vuex';

const prePlugin = (store: any) => {
	store.commit('setUserId', '');
};

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		players: [],
		userId: "",
		walletAddress: "",
	},
	mutations: {
		setPlayers(state: any, data: any) {
			state.players = Object.assign({}, data);
		},
		setUserId(state: any, data: any) {
			state.userId = data;
		},
		setWalletAddress(state: any, data: any) {
			state.walletAddress = data;
		},
	},
	actions: {
		setPlayers({ commit }: any, data: any) {
			commit('setPlayers', data);
		},
		setUserId({ commit }: any, data) {
			commit('setUserId', data);
		},
		setWwlletAddress({ commit }: any, data) {
			commit('setWalletAddress', data);
		},
	},
	getters: {
		getPlayers: ({ players }) => players,
		getUserId: ({ userId }) => userId,
		walletAddress: ({ walletAddress }) => walletAddress,
	},
	plugins: [prePlugin],
});
