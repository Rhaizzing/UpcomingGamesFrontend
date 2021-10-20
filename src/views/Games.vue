<template>
  <div class="games">
    <div>
      <ug-search-bar @input="filterPage" />
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
      <div>
        <ug-paginate
          :page="page"
          :totalPages="totalPages"
          @previous="previousPage"
          @next="nextPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';

import { PaginatedResource } from '@/interfaces/PaginatedResource';
import { UpcomingGame } from '@/interfaces/UpcomingGame';

import UgRow from '@/components/UgRow.vue';
import UgPaginate from '@/components/UgPaginate.vue';
import UgSearchBar from '@/components/UgSearchBar.vue';

const erroed = ref(false);
const loading = ref(true);
const games = ref<UpcomingGame[]>();
const filteredGames = ref<UpcomingGame[]>();
const page = ref(1);
const totalPages = ref(1);

const rowSize = ref(1);

function getRowSize() {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  rowSize.value = Math.round(vw / (20 * 16)) - 1;
}

window.addEventListener('resize', getRowSize);
getRowSize();

const pageSize = 20;

const rows = computed(() => {
  const values = [] as UpcomingGame[][];

  if (filteredGames.value) {
    for (let i = 0, j = filteredGames.value?.length; i < j; i += rowSize.value) {
      values.push(filteredGames.value?.slice(i, i + rowSize.value));
    }
  }

  return values;
});

function getGames() {
  loading.value = true;

  axios
    .get<PaginatedResource<UpcomingGame>>(
      `http://localhost:5000/api/v1/game?page=${page.value}&pageSize=${pageSize}`,
    )
    .then((response) => {
      games.value = response.data.data;
      filteredGames.value = games.value;
      totalPages.value = response.data.totalPages;
      erroed.value = false;
    })
    .catch((err) => {
      console.log(err);
      erroed.value = true;
    });

  loading.value = false;
}

function previousPage() {
  page.value -= 1;

  if (page.value <= 0) {
    page.value = totalPages.value;
  }

  getGames();
}

function nextPage() {
  page.value += 1;

  if (page.value > totalPages.value) {
    page.value = 1;
  }

  getGames();
  console.log('next');
}

function filterPage(input: string) {
  if (games.value && input.length > 0) {
    filteredGames.value = games.value?.filter((g) => g.name
      .toLocaleLowerCase().match(new RegExp(input.toLocaleLowerCase())));
  } else {
    filteredGames.value = games.value;
  }
}

getGames();
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
