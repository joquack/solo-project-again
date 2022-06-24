import { csrfFetch } from "./csrf";

const LOAD_PHOTOS = 'photos/LOAD'

const loadPhotos = list => ({
    type: LOAD_PHOTOS,
    list
})

export const getAllPhotos = () => async dispatch => {
    const response = await csrfFetch(`/api/photos`)

    if(response.ok){
        const photos = await response.json()
        dispatch(loadPhotos(photos))
    }
}

const initialState = {}

const photosReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_PHOTOS:
            action.photos.forEach(photo => {
                newState[photo.id] = photo
            })
            return newState
    }
}

export default photosReducer
