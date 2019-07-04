import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pracownicy: [
      {
        name: 'Jan Kowalski',
        pesel: '12345678901',
        telefon: '123-456-789',
        pracastart: '12.06.2012'
      },
      {
        name: 'Jan Nowak',
        pesel: '62345678901',
        telefon: '123-456-789',
        pracastart: '12.06.2014'
      },
      {
        name: 'Jan Jakis',
        pesel: '32345678901',
        telefon: '123-456-789',
        pracastart: '06.07.2012'
      },
      {
        name: 'Jan Ktosiowy',
        pesel: '12345678901',
        telefon: '123-456-789',
        pracastart: '06.06.2012'
      }
    ],
    pojazdy: [
      {
        model: 'IVECO DAILY 1',
        rejestracja: 'WW 123456',
        oc: '12.06.2019',
        przeglad: '15.06.2019',
      },
      {
        model: 'IVECO DAILY 2',
        rejestracja: 'WW 1212Z',
        oc: '14.06.2019',
        przeglad: '15.06.2019',
      },
      {
        model: 'IVECO DAILY 3',
        rejestracja: 'WW 345xx',
        oc: '01.06.2020',
        przeglad: '15.06.2021',
      },
      {
        model: 'IVECO DAILY 4',
        rejestracja: 'WW 5567x',
        oc: '12.06.2018',
        przeglad: '15.06.2018',
      },
    ],
    kategorie: ['Krzesła', 'Stoły', 'Pufy'],
    produkty: [
      {
        nazwa: 'Krzesła Maya White',
        kategoria: 'Krzesła',
        katId: 1,
        ilosc: '2000',
        uszkodzone: '0'
      },
      {
        nazwa: 'Krzesła Maya White',
        kategoria: 'Krzesła',
        katId: 1,
        ilosc: '2000',
        uszkodzone: '0'
      },
      {
        nazwa: 'Stoły jakieś',
        kategoria: 'Stoły',
        katId: 2,
        ilosc: '2000',
        uszkodzone: '0'
      },
      {
        nazwa: 'Pufy jakieś',
        kategoria: 'Pufy',
        katId: 3,
        ilosc: '2000',
        uszkodzone: '0'
      }
    ]
  },
  mutations: {

  },
  actions: {

  }
})
