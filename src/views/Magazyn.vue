<template>          
  <v-app id="magazyn">
    <v-card>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs6>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <div class="headline">Produkty</div>
                  <span>Jest {{this.$store.state.produkty.length}} produktów w {{this.$store.state.kategorie.length}} kategoriach.</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn color="info" @click="$router.push('/produkty')">Otwórz liste produktów</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <div class="headline">Kategorie</div>
                  <span>Lista wszystkich kategorii produktów.</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn color="info" @click="$router.push('/kategorie')">Otwórz liste kategorii</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
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
          nazwa: '',
          kategoria: '',
          ilosc: '',
          uszkodzone: '',
        },
        defaultItem: {
          nnazwa: '',
          kategoria: '',
          ilosc: '',
          uszkodzone: '',
        },
        notEmptyRule: [
          v => !!v || 'To pole jest wymagane!'
        ],
        headers: [
            { text: 'LP', value: 'lp', sortable: false},
            { text: 'Nazwa', value: 'nazwa' },
            { text: 'Kategoria', value: 'kategoria' },
            { text: 'Ilość sztuk', value: 'ilosc' },
            { text: 'Uszkodzone', value: 'uszkodzone'},
            { text: 'Akcje', value: 'actions', sortable: false }
        ]
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Dodaj produkt' : 'Edytuj produkt'
      }
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.$store.state.produkty.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
            const index = this.$store.state.produkty.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.$store.state.produkty.splice(index, 1)
        },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if(this.$refs.produkt.validate()) {
          if (this.editedIndex > -1) {
            Object.assign(this.$store.state.produkty[this.editedIndex], this.editedItem)
          } else {
            this.$store.state.produkty.push(this.editedItem)
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