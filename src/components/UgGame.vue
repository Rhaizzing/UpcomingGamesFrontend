<template>
	<div class="game">
		<img class="cover" :src="game.coverUrl || 'http://www.projetonovomundo.org.br/wp-content/plugins/bb-plugin/img/no-image.png'" />
		<div class="info">
			<h5>{{ game.name }}</h5>
			<h6>{{ game.releaseDate.worldwide["PC (Microsoft Windows)"].substring(0, 10) }}</h6>
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
	display: flex;
	justify-content: center;

	border: 0.1rem solid black;

	.cover {
		max-width: 10rem;
		margin: 0.5rem;
	}

	.info {
		display: flex;
		flex-direction: column;
		font-size: 2em;
	}
}
</style>
