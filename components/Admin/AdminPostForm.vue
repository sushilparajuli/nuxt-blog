<template>
  <form @submit.prevent=" onSave ">
    <AppControlInput v-model="editedPost.author">
      Author Name
    </AppControlInput>
    <AppControlInput v-model="editedPost.title">
      Title
    </AppControlInput>
    <AppControlInput v-model="editedPost.previewText">
      Preview Text
    </AppControlInput>
    <AppControlInput v-model="editedPost.thumbnail">
      Thumbnail Link
    </AppControlInput>
    <AppControlInput
      v-model="editedPost.content"
      control-type="textarea"
    >
      Content
    </AppControlInput>
    <AppButton type="submit">
      Save
    </AppButton>
    <AppButton
      @click=" onCancel "
      type="button"
      btn-style="cancel"
      style="margin-left:10px"
    >
      Cancel
    </AppButton>
  </form>
</template>
<script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppControlInput,
    AppButton
  },
  props: {
    post: {
      type: Object,
      required: false,
      default: null
    }
  },
  data () {
    return {
      editedPost: this.post ? { ...this.post } : { author: '', title: '', thumbnail: '', content: '', previewText: '' }
    }
  },
  methods: {
    onSave () {
      this.$emit('submit', this.editedPost)
    },
    onCancel () {
      this.$router.push('/admin')
    }
  }
}
</script>
