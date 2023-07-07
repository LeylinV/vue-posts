import axios from "axios";

export const postsModule = {
    state: () => ({
        posts: [],
        isLoadingPosts: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
    }),
    getters:{  //Аналог computed
        sortedPosts(state) {
            if (state.selectedSort !== ''){
                return [...state.posts].sort((post1, post2) => {
                    if (state.selectedSort === 'id') {
                        return post1.id - post2.id;
                    } else {
                        return post1[state.selectedSort].localeCompare(post2[state.selectedSort])
                    }
                });
            } else{
                return state.posts
            }
        },
        sortedAndSearchedPosts(state, getters){
            return [...getters.sortedPosts].filter(post => {
                return (
                    post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
                    ||
                    post.body.toLowerCase().includes(state.searchQuery.toLowerCase())
                )
            })
        },
    },
    mutations:{
        setPosts(state, posts){
            state.posts = posts;
        },
        setLoading(state, bool){
            state.isLoadingPosts = bool;
        },
        setSelectedSort(state, selected){
            state.selectedSort = selected;
        },
        setSearchQuery(state, query){
            state.searchQuery = query;
        },
        setPage(state, page){
            state.page = page;
        },
        setTotalPages(state, totalPages){
            state.totalPages = totalPages;
        },
    },
    actions:{
        async fetchPosts({state, commit}){
            try{
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            } catch (e){
                alert('Ошибка')
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state, commit}){
            try{
                commit('setPage', state.page + 1)
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data])
            } catch (e){
                alert('Ошибка')
            } finally {
                commit('setLoading', false)
            }
        },
    },
    namespaced: true
}