<template>
  <div class="pt-5">
    <nuxt-link class="md:flex anim-appear" :to="postLink">
      <div class="md:flex-shrink-0 md:mb-2">
        <img
          :src="thumbnail || 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80'"
          class="md:w-56"
          alt="Woman paying for a purchase"
        >
      </div>
      <div class="mt-4 md:mt-0 md:ml-6">
        <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">
          {{ title }}
        </div>
        <p class="mt-2 text-gray-600">
          {{ previewText }}
        </p>
        <time class="mt-2 text-gray-600">
          <small> {{ updatedDate | date }} </small>
        </time>
      </div>
    </nuxt-link>
  </div>
</template>
<style>
.anim-appear {
  animation: 1s appear;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
<script>
export default {
  name: 'PostPreview',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    previewText: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean
    },
    updatedDate: {
      type: null
    }
  },
  computed: {
    postLink () {
      return this.isAdmin ? '/admin/' + this.id : '/blogs/' + this.id
    }
  }
}
</script>
