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

const delete_comment = commentId => ({
    type: DELETE_COMMENT,
    commentId
})

export const getAllComments = () => async dispatch => {
    const response = await csrfFetch(`/api/comments`)

    if(response.ok){
        const comments = await response.json()
        console.log(comments)
        dispatch(load_comments(comments))
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

        // case CREATE_PHOTO:
        //     return {...state, [action.photo.id]: {...action.photo}}

        // case DELETE_PHOTO:
        //     delete(newState[action.photoId.id])
        //     return newState

        default:
            return state
    }
}

export default commentsReducer
