<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style scoped>
.btn {
    padding: 10px 15px;
    background: none;
    color: #678aff;
    border: 2px solid #678aff;
    cursor: pointer;
    transition: all 0.05s linear;
}
.btn:hover{
    background-color: #678aff;
    color: #fff;
}
</style>