import { csrfFetch } from "./csrf";

const LOAD_PHOTOS = 'photos/LOAD'
const LOAD_ONE = 'photo/LOAD'
const CREATE_PHOTO = 'photo/CREATE'
const UPDATE_PHOTO = 'photo/UPDATE'
const DELETE_PHOTO = 'photo/DELETE'

const load_photos = photos => ({
    type: LOAD_PHOTOS,
    photos
})

const load_one = photo => ({
    type: LOAD_ONE,
    photo
})

const create_photo = photo => ({
    type: CREATE_PHOTO,
    photo
})

const update_photo = photo => ({
    type: UPDATE_PHOTO,
    photo
})

const delete_photo = photoId => ({
    type: DELETE_PHOTO,
    photoId
})

export const getAllPhotos = () => async dispatch => {
    const response = await csrfFetch(`/api/photos`)

    if(response.ok){
        const photos = await response.json()
        dispatch(load_photos(photos))
    }
}

export const getOnePhoto = (id) => async dispatch => {
    const response = await csrfFetch(`/api/photos/${id}`);

    if (response.ok) {
      const photo = await response.json();
    //   console.log('THUNK HERE _____________________________________', photo)
      dispatch(load_one(photo));
      return photo
    }
  };

  export const createPhoto = data => async dispatch => {
    const response = await csrfFetch(`/api/photos/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(response.ok){
        const photo = await response.json()
        dispatch(create_photo(photo))
    }
  }

  export const updatePhoto = (data, id) => async dispatch => {
    const response = await csrfFetch(`/api/photos/edit/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok){
        const photo = await response.json();
        dispatch(update_photo(photo));
        return photo;
    }
};

export const deletePhoto = photoId => async dispatch => {
    const response = await csrfFetch(`/api/photos/delete/${photoId}`, {
        method: 'DELETE'
    })

    if(response.ok){
        const deletedPhoto = await response.json()
        dispatch(delete_photo(deletedPhoto))
    }
}

const initialState = {}

const photosReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_PHOTOS:
            console.log('REDUCER',action.photos)
            action.photos.forEach(photo => {
                newState[photo.id] = photo
            })
            return newState

        case LOAD_ONE:
            return {...state, [action.photo.id]: {...action.photo}}

        case CREATE_PHOTO:
            return {...state, [action.photo.id]: {...action.photo}}

        case UPDATE_PHOTO:
            return {...state, [action.photo.id]: {...action.photo}}

        case DELETE_PHOTO:
            delete newState[action.photoId]
            return newState

        default:
            return state
    }
}

export default photosReducer
