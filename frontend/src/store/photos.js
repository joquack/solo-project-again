import { csrfFetch } from "./csrf";

const LOAD_PHOTOS = 'photos/LOAD'
const LOAD_ONE = 'photos/LOAD'

const loadPhotos = photos => ({
    type: LOAD_PHOTOS,
    photos
})

const loadOne = photo => ({
    type: LOAD_ONE,
    photo
})

export const getAllPhotos = () => async dispatch => {
    const response = await csrfFetch(`/api/photos`)

    if(response.ok){
        const photos = await response.json()
        dispatch(loadPhotos(photos))
    }
}

export const getOnePhoto = (id) => async dispatch => {
    const response = await csrfFetch(`/api/photos/${id}`);

    if (response.ok) {
      const photo = await response.json();
      console.log('REDUCER HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE ***************************', photo)
      dispatch(loadOne(photo));
    }
  };

const initialState = {}

const photosReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_PHOTOS:
            action.photos.forEach(photo => {
                newState[photo.id] = photo
            })
            return newState

        case LOAD_ONE:

            newState[action.id] = action.photo
            return newState

        default:
            return state
    }
}

export default photosReducer
