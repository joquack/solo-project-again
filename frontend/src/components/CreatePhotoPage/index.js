import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createPhoto, getAllPhotos} from '../../store/photos'
import { useHistory } from 'react-router-dom';

function CreatePhotoPage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const history = useHistory()

    const [photoName, setPhotoName] = useState("");
    const [source, setSource] = useState("");

    const changeName = e => setPhotoName(e.target.value)
    const changesource = e => setSource(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault()
        const data = {userId, photoName, source}
        dispatch(createPhoto(data))
        history.push('/photos')
    }

    return (
        <>
        <h1>Create New Photo</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Photo Name
                <input
                    type="text"
                    placeholder='Name'
                    value={photoName}
                    onChange={changeName}
                    required
                    />
            </label>
            <label>
                Source
                <input
                    type="text"
                    placeholder='Image URL'
                    value={source}
                    onChange={changesource}
                    required
                />
            </label>
            <button type="submit">Upload Photo</button>
        </form>
        </>
    )
}

export default CreatePhotoPage
