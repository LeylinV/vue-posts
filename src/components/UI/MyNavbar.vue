<template>
    <div class="navbar">
        <div @click="$router.push('/')"><h2>Vue 3</h2></div>
        <div class="navbar_btns">
            <my-button
                @click="$router.push('/posts')"
            >
                Посты
            </my-button>
            <my-button
                @click="$router.push('/posts-with-composition')"
                style="margin-left: 20px"
            >
                CompositionApi
            </my-button>
            <my-button
                @click="$router.push('/posts-with-store')"
                style="margin-left: 20px"
            >
                StorePosts
            </my-button>
            <my-button
                @click="$router.push('/about')"
                style="margin-left: 20px"
            >
                О сайте
            </my-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar{
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.navbar_btns{
    margin-left: auto;
}
.navbar:first-child h2{
    cursor: pointer;
}
</style>