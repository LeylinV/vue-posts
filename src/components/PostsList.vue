<template>
    <div>
        <h3>Список постов</h3>
        <transition-group name="posts-list">
            <post-item
                v-for="post in posts"
                :post="post"
                v-bind:key="post.id"
                @deletePost="deletePost"
            />
        </transition-group>
    </div>
    <div v-if="isLoading">Идет загрузка постов..</div>
    <div v-else-if="posts.length === 0">
        <h3 style="color: red">
            Посты не найдены!
        </h3>
    </div>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
            required: true,
        },
        isLoading: {
            type: Boolean
        }
    },
    data() {
        return {}
    },
    methods: {
        deletePost(idPost){
            this.$emit('deletePost', idPost)
        }
    }

}
</script>

<style scoped>
.posts-list-move, /* apply transition to moving elements */
.posts-list-enter-active,
.posts-list-leave-active {
    transition: all 0.2s ease;
}

.posts-list-enter-from,
.posts-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

</style>