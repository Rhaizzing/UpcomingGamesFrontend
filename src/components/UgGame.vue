<template>
	<div class="game">
		<img class="cover" :src="game.coverUrl || 'http://www.projetonovomundo.org.br/wp-content/plugins/bb-plugin/img/no-image.png'" />
		<div class="info">
			<h5 class="gameName">{{game.name}}</h5>
			<span class="releases" v-for="(release, key) in game.fullReleaseDate.worldwide" :key="key">
				<b>{{key}}: </b>
				<label>{{release?.substring(0, 10)}}</label>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { UpcomingGame } from '@/interfaces/UpcomingGame';

interface Props {
	game: UpcomingGame;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.game {
	margin: 0.2rem;
	width: 70vw;
	max-height: 24rem;
	display: flex;
	align-content: center;
	justify-content: space-between;

	border: 0.1rem solid grey;
	border-radius: 0.7rem;

	background-color: grey;

	.cover {
		border: 0.1rem solid white;
		border-radius: 5%;
		max-width: 13.5rem;
		max-height: 18.5rem;
		margin: 0.5rem;
	}

	.info {
		margin: 0.2rem 0.3rem 0.3rem 0;
		max-height: 18.5rem;
		border: 0.1rem solid grey;
		background-color: lightgray;
		border-radius: 0.7rem;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		font-size: 2em;

		.gameName {
			padding: 0 0.1rem 0 0.1rem;
		}

		.releases {
			font-size: 1.2rem;
		}
	}
}
</style>
