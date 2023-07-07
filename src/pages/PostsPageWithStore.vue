<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Поиск.."
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Создать пост
            </my-button>
            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="options"
            ></my-select>
        </div>
        <my-dialog
            v-model:show="dialogVisible"
        >
            <post-form
                @create="createPost"
            />
        </my-dialog>

        <posts-list
            :posts="sortedAndSearchedPosts"
            :isLoading="isLoadingPosts"
            @deletePost="deletePost"
        />
        <div v-intersection="loadMorePosts" class="observer">
        </div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostsList from "@/components/PostsList";

import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'


export default {
    components: {
        PostsList, PostForm
    },
    data() {
        return {
            dialogVisible: false,
            limit: 10,
            options: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
                {value: 'id', name: 'По id'}
            ]
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'posts/setPage',
            setSearchQuery: 'posts/setSearchQuery',
            setSelectedSort: 'posts/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'posts/loadMorePosts',
            fetchPosts: 'posts/fetchPosts'
        }),
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false
        },
        deletePost(idPost){
            this.posts = this.posts.filter(post => post.id !== idPost)
        },
        showDialog(){
            this.dialogVisible = true;
        },

    },
    mounted() {
        this.fetchPosts()
    },
    computed: {
        ...mapState({
            posts: state => state.posts.posts,
            dialogVisible: state => state.posts.dialogVisible,
            selectedSort: state => state.posts.selectedSort,
            searchQuery: state => state.posts.searchQuery,
            page: state => state.posts.page,
            limit: state => state.posts.limit,
            totalPages: state => state.posts.totalPages,
        }),
        ...mapGetters({
            sortedAndSearchedPosts: 'posts/sortedAndSearchedPosts'
        })
    },
    watch: {
    }
}
</script>

<style scoped>
.app__btns{
    display: flex;
    justify-content: space-between;
    margin: 15px 0

}

</style>