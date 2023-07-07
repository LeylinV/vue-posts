import axios from "axios";
import {ref, onMounted} from "vue"

export function usePosts(limit){
    const posts = ref([])
    const totalPages = ref(0)
    const isLoadingPosts = ref(true)
    const fetching = async () =>{
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: 1,
                    _limit: limit,
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            posts.value = response.data;
        } catch (e){
            alert('Ошибка')
        } finally {
            isLoadingPosts.value = false;
            console.log(posts.value)
        }
    }
    onMounted(fetching)
    return{
        posts, totalPages, isLoadingPosts
    }
}