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
    const [img, setImg] = useState(null)
    const [errors, setErrors] = useState([]);

    const changeName = e => setPhotoName(e.target.value)
    const changesource = e => setSource(e.target.value)
    const changeImg = e => {
        const file = e.target.files[0];
        setImg(file);
    }

    useEffect(() => {
        let errArr = []

        if(img && !((/\.(gif|jpe?g|pdf|png|)$/i).test(img.name)))
            errArr.push('Not a valid file type')

        setErrors(errArr)
    },[img])

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors([])
        const data = {
            userId: userId,
            photoName: photoName,
            img: img
        }

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
                    <div className='form-input-file'>Server Img</div>
                    <input className='create-input-file'
                        type="file"
                        accept='image/*'
                        onChange={changeImg}
                        />
                    </div>
                </label>
            <div className='create-buttons'>
            <button type="submit" disabled={errors.length}>Upload Photo</button>
            <button onClick={handleCancel}>Cancel</button>
            </div>

        </form>
        </div>
        </>
    )
}

export default CreatePhotoPage
