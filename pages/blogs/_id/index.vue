<template>
  <div>
     <img
        :src="post.thumbnail"
        class="w-full"
        alt="Woman paying for a purchase"
      >
    <div class="pt-4">
      <div class="uppercase tracking-wide text-lg text-indigo-600 font-bold">
        {{ post.author }}
      </div>
      <a
        href="javascript;"
        class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
      >{{ post.title }}</a>
      <p class="mt-2 text-gray-600">
        {{ post.content }}
      </p>
      <time><small> {{ post.updatedDate | date }} </small></time>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData (context) {
    const { data } = await context.$axios.get(`${process.env.BASE_URL}/posts/${context.params.id}.json`)
    return { post: data }
  },
  head () {
    return {
      title: this.post.title
    }
  }
}
</script>
