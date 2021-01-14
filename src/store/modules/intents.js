import axios from 'axios'
import { apiUrl } from '../../constants/config'

const dataItems = [
    {
        state: "AAA",
        description: 'description 1',
        name: { first: "Dickerson", last: "Macdonald" },
    },
    {
        state: "ZZZ",
        description: 'description 1',
        name: { first: "Dickerson", last: "Macdonald" },
    },
    {
        state: "BBB",
        description: 'description 1',
        name: { first: "Dickerson", last: "Macdonald" },
    },
    {
        state: "DDD",
        description: 'description 1',
        name: { first: "Dickerson", last: "Macdonald" },
    },
    {
        state: "MMM",
        description: 'description 1',
        name: { first: "Dickerson", last: "Macdonald" },
    },
    {
        state: "KKK",
        description: 'description 1',
        name: { first: "Dickerson", last: "Macdonald" },
    },

]

const state = {
    isLoading: false,
    allIntents: null,
    intentItems: null,
    todoError: ''
}

const getters = {
    isLoading: state => state.isLoading,
    allIntents: state => state.allIntents,
    todoError: state => state.todoError,
    intentItems: state => state.intentItems
}

const mutations = {
    getIntents(state) {
        state.isLoading = true
    },
    getIntentItemsSuccess(state, items) {
        state.isLoading = false
        state.allIntents = items
        state.intentItems = items
    },
    getTodoItemsError(state, error) {
        state.isLoading = false
        state.todoError = error
        state.allIntents = null
        state.intentItems = null
    },
    addNewIntent(state, newItem) {
        debugger
        const newId = Math.max(...state.allIntents.map(item => item.id)) + 1
        state.allIntents.splice(0, 0, { id: newId, ...newItem })
        state.intentItems = state.allIntents
        state.isLoading = false
    }

}

const actions = {
    getIntentItems({ commit }) {
        commit("getIntents")
        setTimeout(() => {
            commit('getIntentItemsSuccess', dataItems)
        }, 2000)
    },

    addNewIntent({commit}, payload) {
        commit("getIntents")
        setTimeout(() => {
            commit('addNewIntent', payload)
        }, 2000)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
