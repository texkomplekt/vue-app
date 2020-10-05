<template>
    <div class="edit-user">
        <FormOrganization 
            :data="data"
            @close="$router.push({name: 'organizations'})"/>
    </div>
</template>

<script>
import FormOrganization from '@/components/FormOrganization.vue';

export default {
    name: 'EditOrganization',
    components: {
        FormOrganization,
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
        }
    },
}
</script>
