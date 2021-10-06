<template>
	<transition-group name="games-row">
		<div class="game-row">
			<div class="single-game" v-for="game in games" :key="game.id">
				<ug-game :game="game" />
			</div>
		</div>
	</transition-group>
</template>

<script setup lang="ts">
import { UpcomingGame } from '@/interfaces/UpcomingGame';
import UgGame from '@/components/UgGame.vue';

interface Props {
	games: UpcomingGame[];
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.game-row {
	display: flex;
	align-items: center;
	justify-content: space-around;

	.single-game {
		margin: 0.7rem;
	}
}
</style>
