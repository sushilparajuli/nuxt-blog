<template>
  <div class="input-control">
    <label class="block text-gray-700 text-sm font-bold mb-2"><slot /></label>
    <input
      v-if="controlType === 'input'"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
      :value="value"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
    <textarea
      v-if="controlType === 'textarea'"
      @input="$emit('input', $event.target.value)"
      :value="value"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      rows="10"
    />
  </div>
</template>
<script>
export default {
  name: 'AppInputControl',
  props: {
    controlType: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
.input-control {
  margin: 10px 0;
}
</style>
