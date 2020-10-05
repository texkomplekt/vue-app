<template>
  <div class="edit-user">
      <FormUser 
        :data="data"
        @close="$router.push({name: 'users'})"/>
  </div>
</template>

<script>
import FormUser from '@/components/FormUser.vue';

export default {
    name: 'EditUser',
    components: {
        FormUser,
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
        }
    },
}
</script>
