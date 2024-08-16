import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useCounterStore = defineStore("counter", () => {
	const count = ref(0)
	const doubleCount = computed(() => count.value * 2)
	/**
	 * Simply increment the count by 1
	 */
	function increment() {
		count.value++
	}

	return { count, doubleCount, increment }
})
