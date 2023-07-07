<template>
    <input
        class="input"
        type="text"
        :value="modelValue"
        @input="updateInput"
    />
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(e){
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    padding: 10px 15px;
    margin-top: 15px;
    border: 2px solid #678aff;
}
</style>