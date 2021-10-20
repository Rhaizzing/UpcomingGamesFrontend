<template>
  <div class="games">
    <div>
      <ug-search-bar @enterpress="getGames" />
    </div>
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-if="erroed">
      <h1>There was an error loading the games...</h1>
    </div>
    <div class="games" v-if="!erroed && !loading">
      <div class="all-rows">
        <div v-for="(row, index) in rows" :key="index">
          <ug-row :games="row" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';

import { UpcomingGame } from '@/interfaces/UpcomingGame';

import UgRow from '@/components/UgRow.vue';
import UgSearchBar from '@/components/UgSearchBar.vue';

const erroed = ref(false);
const loading = ref(true);
const games = ref<UpcomingGame[]>();

const rowSize = ref(1);

function getRowSize() {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  rowSize.value = Math.round(vw / (20 * 16)) - 1;
}

window.addEventListener('resize', getRowSize);
getRowSize();

const rows = computed(() => {
  const values = [] as UpcomingGame[][];

  if (games.value) {
    for (let i = 0, j = games.value?.length; i < j; i += rowSize.value) {
      values.push(games.value?.slice(i, i + rowSize.value));
    }
  }

  return values;
});

function getGames(game: string) {
  loading.value = true;

  axios
    .get<UpcomingGame[]>(
      `http://localhost:5000/api/v1/game/search/${game}`,
    )
    .then((response) => {
      games.value = response.data;
      erroed.value = false;
    })
    .catch((err) => {
      console.log(err);
      erroed.value = true;
    });

  loading.value = false;
}
</script>

<style scoped lang="scss">
.game-list-move {
  transition: transform 0.8s ease;
}
.games {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  .all-rows {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>
