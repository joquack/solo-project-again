import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createPhoto, getAllPhotos} from '../../store/photos'
import { useHistory } from 'react-router-dom';
import './index.css'

function CreatePhotoPage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const history = useHistory()

    const [photoName, setPhotoName] = useState("");
    const [source, setSource] = useState("");
    const [errors, setErrors] = useState([]);

    const changeName = e => setPhotoName(e.target.value)
    const changesource = e => setSource(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors([])
        const data = {userId, photoName, source}

        const createdPhoto = await dispatch(createPhoto(data))
        .catch(
            async(res) => {
                const validations = await res.json()

                if(validations && validations.errors)
                    setErrors(validations.errors)
            }
        )

        if(createdPhoto)
            history.push('/photos')

    }

    const handleCancel = e => {
        e.preventDefault()
        history.push('/photos')
    }

    return (
        <>
        <h1 className='create-header'>Create New Photo</h1>
        <div className='create-form'>

        <form onSubmit={handleSubmit}>
            <div className='errors'>
                <ul>
                    {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            </div>
            <label>
                <div>Photo Name
                <input className='create-input'
                    type="text"
                    placeholder='Name'
                    value={photoName}
                    onChange={changeName}
                    required
                    />
                </div>
            </label>
            <label>
                <div>
                    Source
                <input className='create-input'
                    type="text"
                    placeholder='Image URL'
                    value={source}
                    onChange={changesource}
                    required
                />
                </div>
            </label>
            <div className='create-buttons'>
            <button type="submit">Upload Photo</button>
            <button onClick={handleCancel}>Cancel</button>
            </div>

        </form>
        </div>
        </>
    )
}

export default CreatePhotoPage
