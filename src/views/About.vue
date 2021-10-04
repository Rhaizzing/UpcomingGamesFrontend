<template>
	<div class="about">
		<ug-game :v-if="erroed" v-for="game in games" :key="game.Id" :game="game"/>
		<div class="footerBar">
			<button @click="previousPage">Previous Page</button>
			<h3>{{page}}</h3>
			<button @click="nextPage">Next Page</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import UgGame from '@/components/UgGame.vue';

const erroed = ref(false);
const games = ref([]);
const page = ref(1);
const pageSize = 5;

function getGames() {
	axios.get(`http://localhost:5000/api/v1/game?page=${page.value}&pageSize=${pageSize}`).then((response) => {
		games.value = response.data;
	}).catch((err) => { console.log(err); erroed.value = true; });
}

function previousPage() {
	page.value -= 1;
	page.value = Math.max(page.value, 1);
	getGames();
}

function nextPage() {
	page.value += 1;
	page.value = Math.max(page.value, 1);
	getGames();
}

getGames();
</script>

<style scoped lang="scss">
.about {
	display: flex;
	flex-direction: column;
	align-items: center;

	.footerBar {
		width: 70vw;
		display: flex;
		justify-content: space-between;
	}
}
</style>
