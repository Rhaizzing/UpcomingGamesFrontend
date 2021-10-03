<template>
	<div class="about">
		<ug-game v-for="game in games" :key="game.Id" :game="game"/>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import UgGame from '@/components/UgGame.vue';

const games = ref([]);

axios.get('http://localhost:5000/api/v1/game?page=10&pageSize=2').then((response) => {
	games.value = response.data;
	console.log(response.data);
});
</script>
