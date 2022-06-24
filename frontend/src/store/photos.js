import { csrfFetch } from "./csrf";

const LOAD_PHOTOS = 'photos/LOAD'
const LOAD_ONE = 'photo/LOAD'

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
      console.log('THUNK HERE _____________________________________', photo)
      dispatch(loadOne(photo));
      return photo
    }
  };

const initialState = {}

const photosReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_PHOTOS:
            console.log('REDUCER',action.photos)
            action.photos.forEach(photo => {
                newState[photo.id] = photo
            })
            return newState

        case LOAD_ONE:
            return {...state, [action.photo.id]: {...action.photo}}

        default:
            return state
    }
}

export default photosReducer
