import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pubid: '',
    population: '',
    intervention: '',
    outcome: '',
  },
  getters:{
    getPubid: state => state.pubid,
    getPopulation: state => state.population,
    getInvervention: state => state.intervention,
    getOutcome: state => state.outcome,
  },
  mutations: {
    setPubid(state, newPubid){state.pubid = newPubid},
    setPopulation(state, newPopulation){state.population = newPopulation},
    setInvervention(state, newInvervention){state.intervention = newInvervention},
    setOutcome(state, newOutcome){state.outcome = newOutcome},
  },
  actions: {


  },
  modules: {
  }
})
