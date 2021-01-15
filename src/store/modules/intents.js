
const dataItems = [
    {
        state: "AAA",
        description: 'description 1',
        name: { first: "Dickerson", last: "Macdonald" },
    },
    {
        state: "ZZZ",
        description: 'description 1',
        name: { first: "Dickerson 2", last: "Macdonald" },
    },
    {
        state: "BBB",
        description: 'description 1',
        name: { first: "Dickerson 3", last: "Macdonald" },
    },
    {
        state: "DDD",
        description: 'description 1',
        name: { first: "Dickerson 4", last: "Macdonald" },
    },
    {
        state: "MMM",
        description: 'description 1',
        name: { first: "Dickerson 5", last: "Macdonald" },
    },
    {
        state: "KKK",
        description: 'description 6',
        name: { first: "Dickerson 5", last: "Macdonald" },
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
    setLoading(state) {
        state.isLoading = true
    },
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
        state.allIntents.splice(0, 0, {...newItem })
        state.intentItems = state.allIntents
        state.isLoading = false
    },

    deleteIntent(state, newItem) {
        debugger
        state.allIntents = state.allIntents.filter((item) => item.name.first !== newItem.name.first)
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
    },

    deleteIntent({commit}, payload) {
        commit("setLoading")
        setTimeout(() => {
            commit('deleteIntent', payload)
        }, 2000)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
