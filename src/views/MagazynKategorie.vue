<template>          
  <v-app id="kategorie">
    <v-card>
      <v-card-title>
          kategorie
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
      :items="this.$store.state.kategorie"
      :search="search"
      rows-per-page-text="Produktów na stronę:">
          <template v-slot:items="props">
              <td>{{ props.index + 1 }}</td>
              <td>{{ props.item }}</td>
              <td>{{ $store.state.produkty.filter(item => {
              return item.kategoria === props.item}).length }}</td>
              <td>?</td>
          </template>
           <template v-slot:pageText="props">
            Wyniki {{ props.pageStart }} - {{ props.pageStop }} spośród {{ props.itemsLength }}
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
                <v-form ref="kategoria">
                  <v-flex>
                  <v-text-field :rules="notEmptyRule" v-model="kategoriaNazwa" label="Nazwa"></v-text-field>
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
        kategoriaNazwa: '',
        editedIndex: -1,
        editedItem: {
          nazwa: '',
        },
        defaultItem: {
          nazwa: '',
        },
        notEmptyRule: [
          v => !!v || 'To pole jest wymagane!'
        ],
        headers: [
            { text: 'LP', value: 'lp', sortable: false},
            { text: 'Nazwa', value: 'nazwa' },
            { text: 'Ilość pozycji', value: 'iloscpozycji' },
            { text: 'Ilość mebli', value: 'iloscmebli'}
        ]
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Dodaj kategorie' : 'Edytuj kategorie'
      }
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.$store.state.kategorie.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
            const index = this.$store.state.kategorie.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.$store.state.kategorie.splice(index, 1)
        },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if(this.$refs.kategoria.validate()) {
          if (this.editedIndex > -1) {
            Object.assign(this.$store.state.kategorie[this.editedIndex], this.editedItem)
          } else {
            this.$store.state.kategorie.push(this.kategoriaNazwa);
            this.kategoriaNazwa = '';
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