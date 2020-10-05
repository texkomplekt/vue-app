<template>
    <div
        class="avatar"
        :style="`
            background-image: ${img ? `url(${img}) `: `url('./../assets/user.svg')`};
            width: ${width}px;
            height: ${height}px;`"> 
    </div>
</template>

<script>
export default {
    name: 'Avatar',
    props: {
        img: {
            type: String,
            default: '', 
        },
        height: {
            type: Number,
            default: 100, 
        },
        width: {
            type: Number,
            default: 100, 
        },
    }
}
</script>
<style lang="scss" scoped>
    .avatar {
        border-radius: 50%;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        transition: none;
        z-index: $--index-top;
    }
</style>
