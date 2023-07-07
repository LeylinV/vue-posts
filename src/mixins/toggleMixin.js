export default{
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closeDialog(){
            this.$emit('update:show', false)
        }
    },
    mounted() {
    }
}