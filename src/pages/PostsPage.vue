<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-focus
            v-model="searchQuery"
            placeholder="Поиск.."
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Создать пост
            </my-button>
            <my-select
                v-model="selectedSort"
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
import axios from "axios";

export default {
    components: {
        PostsList, PostForm
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isLoadingPosts: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            options: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
                {value: 'id', name: 'По id'}
            ]
        }
    },
    methods: {
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
        async fetchPosts(){
            try{
                this.isLoadingPosts = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data;
            } catch (e){
                alert('Ошибка')
            } finally {
                this.isLoadingPosts = false;
            }
        },
        async loadMorePosts(){
            try{
                this.page++;
                this.isLoadingPosts = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts.push(...response.data);
            } catch (e){
                alert('Ошибка')
            } finally {
                this.isLoadingPosts = false;
            }
        },
    },
    mounted() {
        this.fetchPosts()

    },
    computed: {
        sortedPosts() {
            if (this.selectedSort !== ''){
                return [...this.posts].sort((post1, post2) => {
                    if (this.selectedSort === 'id') {
                        return post1.id - post2.id;
                    } else {
                        return post1[this.selectedSort].localeCompare(post2[this.selectedSort])
                    }
                });
            } else{
                return this.posts
            }
        },
        sortedAndSearchedPosts(){
            return [...this.sortedPosts].filter(post => {
                return (
                    post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                    ||
                    post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
                )
            })
        },
    },
    watch: {
        //     selectedSort(newValue) { //Название Watchera такое же как и название наблюдаемой переменной, Лучше использовать computed, потому что он не мутирует
        //         this.posts.sort((post1, post2) => {
        //             return newValue === 'id' ? post1[newValue] - post2[newValue] : post1[newValue].localeCompare(post2[newValue])
        //         })
        //     }

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