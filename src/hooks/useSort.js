import {computed, ref} from "vue";

export function useSort(posts){
    const selectedSort = ref('')

    const sortedPosts = computed(() => {
        if (selectedSort.value !== ''){
            return [...posts.value].sort((post1, post2) => {
                if (selectedSort.value === 'id') {
                    return post1.id - post2.id;
                } else {
                    return post1[selectedSort.value].localeCompare(post2[selectedSort.value])
                }
            });
        } else{
            return [...posts.value]
        }
    })

    return {
        selectedSort, sortedPosts
    }
}