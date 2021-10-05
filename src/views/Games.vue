<template>
	<div class="games">
		<div v-show="loading">
			<h1>Loading...</h1>
		</div>
		<transition-group name="game-list">
			<div class="allRows">
				<div class="allGames" v-for="(row, index) in rows" :key="index">
					<div class="singleGame" v-for="game in row" :key="game.id">
						<ug-game :game="game" />
					</div>
				</div>
			</div>
		</transition-group>
		<div class="footerBar">
			<!---->
			<button class="button" @click="previousPage">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50px">
					<title>Caret Back Circle</title>
					<path
						fill="currentColor"
						d="M273.77 169.57l-89.09 74.13a16 16 0 000
						24.6l89.09 74.13A16 16 0 00300 330.14V181.86a16 16
						0 00-26.23-12.29z"
					/>
				</svg>
			</button>
			<!---->
			<h3>{{ page }}/{{ games?.totalPages }}</h3>
			<!---->
			<button class="button" @click="nextPage">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50px">
					<title>Caret Forward Circle</title>
					<path
						fill="currentColor"
						d="M238.23 342.43l89.09-74.13a16
						16 0 000-24.6l-89.09-74.13A16 16 0
						00212 181.86v148.28a16 16 0 0026.23 12.29z"
					/>
				</svg>
			</button>
			<!---->
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import UgGame from '@/components/UgGame.vue';

import { PaginatedResource } from '@/interfaces/PaginatedResource';
import { UpcomingGame } from '@/interfaces/UpcomingGame';

const erroed = ref(false);
const loading = ref(true);
const games = ref<PaginatedResource<UpcomingGame>>();
const page = ref(1);

const rowSize = ref(1);

function getRowSize() {
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

	rowSize.value = Math.round(vw / (20 * 16)) - 1;
}

window.addEventListener('resize', getRowSize);
getRowSize();

const rowNumber = 4;
const pageSize = computed(() => {
	const temp = Math.round(rowSize.value * rowNumber);
	return temp;
});

const rows = computed(() => {
	const values = [] as UpcomingGame[][];

	if (games.value?.data) {
		for (let i = 0, j = games.value?.data.length; i < j; i += rowSize.value) {
			values.push(games.value?.data?.slice(i, i + rowSize.value));
		}
	}

	return values;
});

function getGames() {
	loading.value = true;

	axios
		.get<PaginatedResource<UpcomingGame>>(
			`http://localhost:5000/api/v1/game?page=${page.value}&pageSize=${pageSize.value}`,
		)
		.then((response) => {
			games.value = response.data;
		})
		.catch((err) => {
			console.log(err);
			erroed.value = true;
		});

	loading.value = false;
}

function previousPage() {
	page.value -= 1;
	page.value = Math.max(page.value, 1);
	getGames();
}

function nextPage() {
	page.value += 1;
	page.value = Math.min(page.value, games.value?.totalPages || 1);
	getGames();
}

getGames();
</script>

<style scoped lang="scss">
.game-list-move {
	transition: transform 0.8s ease;
}
.games {
	overflow: hidden;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;

	.allGames {
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;

		.singleGame {
			margin: 0.7rem;
		}
	}

	.footerBar {
		width: 70vw;
		display: flex;
		justify-content: center;

		.button {
			border-radius: 1rem;
			border: 0;
			margin: 0 3rem 0 3rem;
		}
		.button:active {
			background-color: rgb(75, 75, 75);
			border: 0;

			svg {
				color: white;
			}
		}
	}
}
</style>
