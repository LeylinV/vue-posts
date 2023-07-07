import {createApp} from 'vue'
import App from './App'
import components from '@/components/UI'
import router from "@/router/router";
import directives from "@/directives";
import store from "@/store";

const app = createApp(App)

components.forEach(singleComponent => {
    app.component(singleComponent.name, singleComponent)
})

directives.forEach(singleDirective => {
    app.directive(singleDirective.name, singleDirective)
})

//Чтобы что-то добавить (модуль по типу Bootstrap) надо использовать .use
app
    .use(store)
    .use(router)
    .mount('#app')
