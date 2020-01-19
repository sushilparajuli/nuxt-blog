<template>
  <div class="auth-page">
    <section class="new-post py-5 text-center">
      <button
        @click="$router.push('/admin/new-post')"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Post
      </button>
      <button
        @click="onLogout"
        class="bg-blue-500 mr-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
       Logout
      </button>
    </section>
    <hr>
    <section class="existing-posts">
      <h1> Existing Posts </h1>
      <PostList :posts="loadedPosts" is-admin />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  middleware: ['check-auth', 'auth'],
  computed: mapGetters({
    loadedPosts: 'loadedPosts'
  }),
  methods: {
    ...mapActions({
      'logout': 'auth/logout'
    }),
    onLogout () {
      this.logout()
      this.$router.push('/admin/auth')
    }
  }
}
</script>
