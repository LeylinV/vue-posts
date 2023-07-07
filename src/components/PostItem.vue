<template>
    <div class="post">
        <div>
            <div><strong>ID: </strong>{{ post.id }}</div>
            <div><strong>Название: </strong>{{ post.title }}</div>
            <div><strong>Описание: </strong>{{ post.body }}</div>
        </div>
        <div class="post__btns">
            <my-button
                @click="$router.push('/posts/' + post.id)"
            >
                Открыть
            </my-button>
            <my-button
                @click="deletePost"
            >
                Удалить
            </my-button>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {}
    },
    methods: {
      deletePost(){
          this.$emit('deletePost', this.post.id)
      },
    }
}
</script>

<style scoped>
.post {
    margin-top: 15px;
    padding: 15px;
    border: 2px solid #678aff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post__btns{
    display: flex;
}
</style>