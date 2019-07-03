<template>
    <div>
        <v-icon
            small
            class="mr-2"
            @click="editItem(prop)"
        >
            edit
        </v-icon>
        <v-icon
            small
            @click="deleteItem(prop)"
        >
            delete
        </v-icon>
    </div>
</template>

<script>
export default {
    name: 'AkcjeBtn',
    props: ['prop'],
    methods: {
        editItem (item) {
            this.$emit('editItem')            
        },
        deleteItem (item) {
            this.$emit('deleteItem')        
        }
    }
    }

</script>