import { csrfFetch } from "./csrf";

const LOAD_COMMENT = 'comment/LOAD'
const CREATE_COMMENT = 'comment/CREATE'
const UPDATE_COMMENT = 'comment/UPDATE'
const DELETE_COMMENT = 'comment/DELETE'

const load_comments = comments => ({
    type: LOAD_COMMENT,
    comments
})

const create_comment = comment => ({
    type: CREATE_COMMENT,
    comment
})

const update_comment = comment => ({
    type: UPDATE_COMMENT,
    comment
})

const delete_comment = commentId => ({
    type: DELETE_COMMENT,
    commentId
})

export const getAllComments = () => async dispatch => {
    const response = await csrfFetch(`/api/comments`)

    if(response.ok){
        const photos = await response.json()
        dispatch(load_photos(photos))
    }
}
