<template>          
  <v-app id="pojazdy">
    <v-card>
      <v-card-title>
          Pojazdy
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
      :items="this.$store.state.pojazdy"
      :search="search">
          <template v-slot:items="props">
              <td>{{ props.item.model }}</td>
              <td>{{ props.item.rejestracja }}</td>
              <td>{{ props.item.oc }}</td>
              <td>{{ props.item.przeglad }}</td>
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
                <v-form ref="pojazd">
                  <v-flex>
                  <v-text-field :rules="notEmptyRule" v-model="editedItem.model" label="Model"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field :rules="notEmptyRule" v-model="editedItem.rejestracja" label="Rejestracja"></v-text-field>
                </v-flex>
                <v-flex >
                  <v-text-field :rules="notEmptyRule" v-model="editedItem.oc" label="OC"></v-text-field>
                </v-flex>
                <v-flex >
                  <v-text-field :rules="notEmptyRule" v-model="editedItem.przeglad" label="Przegląd"></v-text-field>
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
          model: '',
          rejestracja: '',
          oc: '',
          przeglad: '',
        },
        defaultItem: {
          model: '',
          rejestracja: '',
          oc: '',
          przeglad: '',
        },
        notEmptyRule: [
          v => !!v || 'To pole jest wymagane!'
        ],
        headers: [
          { text: 'Model', value: 'model' },
          { text: 'Rejestracja', value: 'rejestracja' },
          { text: 'OC', value: 'oc'},
          { text: 'Przegląd', value: 'przeglad'},
          { text: 'Akcje', value: 'actions', sortable: false }
        ]
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Dodaj samochód' : 'Edytuj samochód'
      }
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.$store.state.pojazdy.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
            const index = this.$store.state.pojazdy.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.$store.state.pojazdy.splice(index, 1)
        },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if(this.$refs.pojazd.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.$store.state.pojazdy[this.editedIndex], this.editedItem)
        } else {
          this.$store.state.pojazdy.push(this.editedItem)
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