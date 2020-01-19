<template>
  <div class="admin-new-post">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AdminPostForm from '@/components/Admin/AdminPostForm'
export default {
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  methods: {
    ...mapActions({
      submitPost: 'addPost'
    }),
    onSubmitted (postData) {
      this.submitPost(postData).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>
