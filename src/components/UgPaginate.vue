<template>
	<div class="content">
		<!---->
		<button class="button" @click="$emit('previous')">
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
		<h3>{{ page }}/{{ totalPages }}</h3>
		<!---->
		<button class="button" @click="$emit('next')">
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
</template>

<script setup lang="ts">
interface Props {
	page: number;
	totalPages: number;
}
const props = defineProps<Props>();

const emits = defineEmits(['previous', 'next']);
</script>

<style scoped lang="scss">
.content {
	width: 70vw;
	display: flex;
	justify-content: center;

	.button {
		border-radius: 1rem;
		border: 0;
		margin: 0 3rem 0 3rem;
	}
	.button:hover {
		background-color: #dbdbdb;
		border: 0;

		svg {
			color: rgb(41, 41, 41);
		}
	}

	.button:active {
		background-color: rgb(75, 75, 75);
		border: 0;

		svg {
			color: white;
		}
	}
}
</style>
