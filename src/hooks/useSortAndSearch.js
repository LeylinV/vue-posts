import {computed, ref} from "vue";


export function useSortAndSearch(sortedPosts){
    const searchQuery = ref('')

    const sortedAndSearchedPosts = computed(()=>{
        // console.log(sortedPosts)
        return sortedPosts.value.filter(post => {
            return (
                post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
                ||
                post.body.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        })
    })

    return {
        searchQuery, sortedAndSearchedPosts
    }
}