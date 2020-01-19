<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" is-admin />
    </section>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AdminPostForm from '@/components/Admin/AdminPostForm'
export default {
  middleware: ['check-auth', 'auth'],
  layout: 'admin',
  components: {
    AdminPostForm
  },
  async asyncData (context) {
    const { data } = await context.$axios.get(`${process.env.baseUrl}/posts/${context.params.postId}.json`)
    return { loadedPost: data }
  },
  head () {
    return {
      title: this.loadedPost.title
    }
  },
  methods: {
    ...mapActions({
      editPost: 'editPost'
    }),
    onSubmitted (postData) {
      const payload = {
        ...postData,
        id: this.$route.params.postId
      }
      this.editPost(payload).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>
