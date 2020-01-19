<template>
  <div class="posts-page NuxtLogo">
    <PostPreview
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :thumbnail="post.thumbnail"
      :title="post.title"
      :preview-text="post.previewText"
      :updated-date="post.updatedDate"
      :is-admin="isAdmin"
    />
  </div>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview.vue'
export default {
  name: 'PostList',
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean
    },
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>
