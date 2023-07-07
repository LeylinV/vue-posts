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
            />
        </my-dialog>

        <posts-list
            :posts="sortedAndSearchedPosts"
            :isLoading="isLoadingPosts"
        />
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostsList from "@/components/PostsList";

import {usePosts} from "@/hooks/usePosts"
import {useSort} from "@/hooks/useSort";
import {useSortAndSearch} from "@/hooks/useSortAndSearch";

export default {
    components: {
        PostsList, PostForm
    },
    data() {
        return {
            dialogVisible: false,
            options: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
                {value: 'id', name: 'По id'}
            ]
        }
    },
    setup(){
        const {posts, totalPages, isLoadingPosts} = usePosts(10);
        const {sortedPosts, selectedSort} = useSort(posts);
        const {searchQuery, sortedAndSearchedPosts} = useSortAndSearch(sortedPosts);

        return{
            posts,
            totalPages,
            isLoadingPosts,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts
        }
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