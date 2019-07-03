<template>          
  <v-app id="pracownicy">
    <v-card>
      <v-card-title>
          Pracownicy
          <v-spacer></v-spacer>
          <v-text-field
          v-model="search"
          label="Szukaj"
          single-line
          hide-details
          append-icon="search"></v-text-field>
      </v-card-title>
      <v-data-table
      :headers="headers"
      :items="this.$store.state.pracownicy"
      :search="search">
          <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.pesel }}</td>
              <td>{{ props.item.telefon }}</td>
              <td>{{ props.item.pracastart }}</td>
              <td>
                <AkcjeButtons @editItem="editItem(props.item)" @deleteItem="deleteItem(props.item)" 
                    :prop="props.item"/>
              </td>
          </template>
          <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">Wyszukiwanie dla frazy "{{search}}" niczego nie znalazło.</v-alert> 
          </template>         
      </v-data-table>
    </v-card>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent width="400px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          {{formTitle}}
          <v-spacer/>
          <v-icon @click="close()">close</v-icon>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-form ref="pracownik">
                  <v-flex>
                  <v-text-field :rules="notEmptyRule" v-model="editedItem.name" label="Imię i nazwisko"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field :rules="notEmptyRule" v-model="editedItem.pesel" label="Pesel"></v-text-field>
                </v-flex>
                <v-flex >
                  <v-text-field :rules="notEmptyRule" v-model="editedItem.telefon" label="Telefon"></v-text-field>
                </v-flex>
                <v-flex >
                  <v-text-field :rules="notEmptyRule" v-model="editedItem.pracastart" label="Pracuje od"></v-text-field>
                </v-flex>
                </v-form>
              </v-layout>
            </v-container>
          </v-card-text>
        <v-card-actions>
          <v-btn flat color="error" @click="close()">Cancel</v-btn>
          <v-btn flat color="success" @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import AkcjeButtons from '@/components/AkcjeButtons.vue';
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        editedIndex: -1,
        editedItem: {
          name: '',
          pesel: '',
          telefon: '',
          pracastart: ''
        },
        defaultItem: {
          name: '',
          pesel: '',
          telefon: '',
          pracastart: ''
        },
        notEmptyRule: [
          v => !!v || 'To pole jest wymagane!'
        ],
        headers: [
          { text: 'Imię i nazwisko', value: 'name' },
          { text: 'Pesel', value: 'pesel' },
          { text: 'Telefon', value: 'telefon'},
          { text: 'Pracuje od', value: 'pracastart'},
          { text: 'Akcje', value: 'actions', sortable: false }
        ]
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Dodaj pracownika' : 'Edytuj pracownika'
      }
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.$store.state.pracownicy.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
            const index = this.$store.state.pracownicy.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.$store.state.pracownicy.splice(index, 1)
        },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if(this.$refs.pracownik.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.$store.state.pracownicy[this.editedIndex], this.editedItem)
        } else {
          this.$store.state.pracownicy.push(this.editedItem)
        }
        this.close()
      }
      }
    },
    components: {
      AkcjeButtons
    }
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>