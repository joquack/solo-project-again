import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'comment/LOAD'
const CREATE_COMMENT = 'comment/CREATE'
const DELETE_COMMENT = 'comment/DELETE'

const load_comments = comments => ({
    type: LOAD_COMMENTS,
    comments
})

const create_comment = comment => ({
    type: CREATE_COMMENT,
    comment
})

const delete_comment = comment => ({
    type: DELETE_COMMENT,
    comment
})

export const getAllComments = () => async dispatch => {
    const response = await csrfFetch(`/api/comments`)

    if(response.ok){
        const comments = await response.json()
        console.log(comments)
        dispatch(load_comments(comments))
    }
}

export const createComment = data => async dispatch => {
    const response = await csrfFetch(`/api/comments/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(response.ok){
        const comment = await response.json()
        dispatch(create_comment(comment))
        return comment
    }
  }

  export const deleteComment = commentId => async dispatch => {
    const response = await csrfFetch(`/api/comments/delete/${commentId}`, {
        method: 'DELETE'
    })

    if(response.ok){
        const deletedComment = await response.json()
        dispatch(delete_comment(deletedComment))
    }
}

const initialState = {}

const commentsReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_COMMENTS:
            action.comments.forEach(comment => {
                newState[comment.id] = comment
            })
            return newState

        case CREATE_COMMENT:
            return {...state, [action.comment.id]: action.comment}

        case DELETE_COMMENT:
            delete(newState[action.comment.id])
            return newState

        default:
            return state
    }
}

export default commentsReducer
