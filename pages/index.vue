<template>
  <div class="home-page container">
    <header class="intro">
      <h1> Latest Blogs</h1>
    </header>
    <section class="featured-blogs">
      <PostList
        :posts="loadedPosts"
      />
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    loadedPosts () {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>
