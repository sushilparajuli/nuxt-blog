export const state = () => ({
  loadedPosts: []
})

export const mutations = {
  setPosts (state, posts) {
    state.loadedPosts = posts
  },
  addPost (state, post) {
    state.loadedPosts.push(post)
  },
  editPost (state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      post => post.id === editedPost.id
    )
    state.loadedPosts[postIndex] = editedPost
  }
}

export const getters = {
  loadedPosts (state) {
    return state.loadedPosts
  }
}

export const actions = {
  nuxtServerInit (vuexContext, context) {
    return this.$axios.get(`${process.env.baseUrl}/posts.json`)
      .then((res) => {
        const posts = []
        for (const key in res.data) {
          posts.push({ ...res.data[key], id: key })
        }
        vuexContext.commit('setPosts', posts)
      })
      .catch(e => context.error(e))
  },
  setPosts (vuexContext, posts) {
    vuexContext.commit('setPosts', posts)
  },
  addPost (vuexContext, postData) {
    const createPost = {
      ...postData,
      updatedDate: new Date()
    }
    return this.$axios.post(`${process.env.baseUrl}/posts.json?auth=${vuexContext.getters['auth/getToken']}`, createPost)
      .then((result) => {
        vuexContext.commit('addPost', { ...createPost, id: result.data.name })
      })
      .catch(error => console.log(error))
  },
  editPost (vuexContext, postData) {
    const postInfo = {
      ...postData,
      updatedDate: new Date()
    }
    return this.$axios.put(`${process.env.baseUrl}/posts/${postData.id}.json?auth=${vuexContext.getters['auth/getToken']}`, postInfo)
      .then((result) => {
        if (result) {
          vuexContext.commit('editPost', postInfo)
        }
      })
      .catch(error => console.log(error))
  }
}
