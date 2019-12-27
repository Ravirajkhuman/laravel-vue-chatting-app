import axios from "axios"
import { getUserConversations, saveConversation,getHeader } from '../helpers'

const state = 
{
	conversations: [],
}

const mutations = {
	
	SET_USER_CONVERSATIONS (state, messages) {
		state.conversations = messages
	}
}

const actions = {

	getUserConversations: ({commit}, data) => {
        return axios.post(getUserConversations, data, {headers: getHeader()})
		.then
		(
			response => {
                commit('SET_USER_CONVERSATIONS', response.data) 
			}
        )
    },

    sendPrivateMessage: ({commit}, data) => {

		let postData = {
			message: data
		}
		
		return axios.post(saveConversation, data, {headers: getHeader()})
		.then
		(
			
		)
	},
}

export default {
	state, mutations, actions
}

