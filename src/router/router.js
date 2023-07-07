import {createRouter, createWebHistory} from "vue-router/dist/vue-router";

import MainPage from "@/pages/MainPage";
import PostsPage from "@/pages/PostsPage";
import AboutPage from "@/pages/AboutPage";
import SinglePostPage from "@/pages/SinglePostPage";
import PostsPageWithStore from "@/pages/PostsPageWithStore";
import PostsPageWithComposition from "@/pages/PostsPageWithComposition";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/about',
        component: AboutPage
    },
    {
        path: '/posts/:id',
        component: SinglePostPage
    },
    {
        path: '/posts-with-store',
        component: PostsPageWithStore
    },
    {
        path: '/posts-with-composition',
        component: PostsPageWithComposition
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router