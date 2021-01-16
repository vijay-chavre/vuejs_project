
const dataItems = [
    {
        id: 1,
        state: "AAA",
        description: 'description 1',
        name: "Dickerson"
    },
    {
        id: 2,
        state: "ZZZ",
        description: 'description 1',
        name: "Dickerson 2", 
    },
    {
        id: 3,
        state: "BBB",
        description: 'description 1',
        name: "Dickerson 3",
    },
    {

        id: 4,
        state: "DDD",
        description: 'description 1',
        name: "Dickerson 4", 
    },
    {
        id: 5,

        state: "MMM",
        description: 'description 1',
        name: "Dickerson 5", 
    },
    {

        id: 6,
        state: "KKK",
        description: 'description 6',
        name: "Dickerson 5", 
    },

]

const state = {
    isLoading: false,
    allIntents: null,
    intentItems: null,
    todoError: '',
}

const getters = {
    isLoading: state => state.isLoading,
    allIntents: state => state.allIntents,
    todoError: state => state.todoError,
    intentItems: state => state.intentItems,
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
        
        if (newItem.id) {
           state.allIntents = state.allIntents.map((item) => {
               return  item.id === newItem.id ? newItem : item
            })
        } else {
            const newId = Math.max(...state.allIntents.map(item => item.id)) + 1
            state.allIntents.splice(0, 0, { id: newId, ...newItem })
        }
        
        state.intentItems = state.allIntents
        state.isLoading = false
    },

    deleteIntent(state, newItem) {
        state.allIntents = state.allIntents.filter((item) => item.id !== newItem.id)
        state.intentItems = state.allIntents
        state.isLoading = false
    }

}

const actions = {
    getIntentItems({ commit }) {
        commit("getIntents")
        setTimeout(() => {
            commit('getIntentItemsSuccess', dataItems)
        }, 1000)
    },

    addNewIntent({ commit }, payload) {
        commit("getIntents")
        setTimeout(() => {
            commit('addNewIntent', payload)
        }, 1000)
    },

    deleteIntent({ commit }, payload) {
        commit("setLoading")
        setTimeout(() => {
            commit('deleteIntent', payload)
        }, 1000)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
