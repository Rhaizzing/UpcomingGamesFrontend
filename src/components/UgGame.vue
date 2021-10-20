<template>
	<div class="component">
		<div class="game" :style="bindStyle">
			<img
				class="cover"
				:src="game.coverUrl || 'http://www.projetonovomundo.org.br/wp-content/plugins/bb-plugin/img/no-image.png'"
			/>
			<div class="info">
				<span class="gameName">{{ game.name }}</span>
				<span class="releases" v-for="(release, key) in game.releaseDate.worldwide" :key="key">
					<span class="releaseKey">- {{ key }}:</span>
					<span class="releaseDate">{{ release?.substring(0, 10) }}</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import { UpcomingGame } from '@/interfaces/UpcomingGame';

interface Props {
	game: UpcomingGame;
}
const props = defineProps<Props>();

const bindStyle = computed(() => ({
	'--coverUrl': `url(${props.game.coverUrl || 'http://www.projetonovomundo.org.br/wp-content/plugins/bb-plugin/img/no-image.png'})`,
	'--backgroundColorAlpha': 'rgba(255, 255, 255, 0.2)',
	'--backgroundColor': '#FFF',
	'--highlightColor': '#FFF',
}));

</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap");

.component:hover {
	min-width: 40rem;
	max-width: 40rem;

	min-height: 19.5rem;
	max-height: 24rem;

	transition: ease-in 0.3s;

	cursor: pointer;

	.game {
		clip-path: inset(0 round 0.7rem);
		transition: clip-path 500ms;

		.info {
			opacity: 1;
			visibility: visible;
			transition: opacity 500ms ease-in 150ms;

			margin: 0.5rem;
			max-height: 18.5rem;
			border-radius: 0.7rem;
			flex-grow: 1;
			display: flex;
			flex-direction: column;

			.gameName {
				font-size: 3em;
				padding: 0rem;
				font-weight: 700;
			}

			.releases {
				margin: 1rem;
				display: flex;
				justify-content: space-between;
				font-size: 1.2rem;
			}
		}
	}
}
.component {
	min-width: 15rem;
	max-width: 15rem;

	font-family: "Montserrat", sans-serif;

	min-height: 19.5rem;
	max-height: 24rem;

	transition: all ease-out 0.3s;

	.game:before {
		content: "";
		position: absolute;

		min-width: inherit;
		max-width: inherit;

		min-height: inherit;
		max-height: inherit;
		z-index: -1;

		filter: blur(15px);

		background-image: var(--coverUrl);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.game {
		clip-path: inset(-2rem);

		min-width: inherit;
		max-width: inherit;

		min-height: inherit;
		max-height: inherit;

		display: flex;
		align-content: center;
		justify-content: space-between;

		color: var(--highlightColor);

		.info {
			text-shadow: 1px 1px rgba(0, 0, 0, 0.5), -1px 1px rgba(0, 0, 0, 0.5),
				1px -1px rgba(0, 0, 0, 0.5), -1px -1px rgba(0, 0, 0, 0.5);
			background-color: var(--backgroundColorAlpha);
			opacity: 0;
			visibility: hidden;
			transition: opacity 0ms linear, visibility 0s linear 0ms;

			overflow-y: scroll;
		}

		.info::-webkit-scrollbar {
			width: 0.5rem;
		}

		.info::-webkit-scrollbar-thumb {
			box-shadow: inset 0 0 5px grey;
			border-radius: 1rem;
			background: white;
		}

		.cover {
			border: 0.3rem solid var(--backgroundColor);
			border-radius: 0.7rem;
			max-width: 13.5rem;
			max-height: 18.5rem;
			margin: 0.5rem;
		}
	}
}
</style>
