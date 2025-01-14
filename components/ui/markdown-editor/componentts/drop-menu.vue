<template>
  <div class="border border-border rounded p-2 flex flex-col gap-2">
    <template v-if="items.length">
      <button
        v-for="(item, index) in items"
        :key="index"
        :data-is-selected="index === selectedIndex"
        class=" data-[is-selected=true]:bg-muted hover:bg-muted p-2 rounded transition duration-300 text-sm"
        @click="selectItem(index)"
      >
        {{ item.title }}
      </button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      console.log(event.key)
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]
      console.log(item)
      if (item) {
        this.command(item)
      }
    },
  },
}
</script>

<style>
/* Dropdown menu */
.dropdown-menu {
	 background: var(--white);
	 border: 1px solid var(--gray-1);
	 border-radius: 0.7rem;
	 box-shadow: var(--shadow);
	 display: flex;
	 flex-direction: column;
	 gap: 0.1rem;
	 overflow: auto;
	 padding: 0.4rem;
	 position: relative;
}
 .dropdown-menu button {
	 align-items: center;
	 background-color: transparent;
	 display: flex;
	 gap: 0.25rem;
	 text-align: left;
	 width: 100%;
}
 .dropdown-menu button:hover, .dropdown-menu button:hover.is-selected {
	 background-color: var(--gray-3);
}
 .dropdown-menu button.is-selected {
	 background-color: var(--gray-2);
}
 
</style>
