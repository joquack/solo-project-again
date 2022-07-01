import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {updatePhoto} from '../../store/photos'

function EditPhotoPage () {
    const {id} = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const history = useHistory()

    const [photoName, setPhotoName] = useState("");
    const [errors, setErrors] = useState([]);

    const changeName = e => setPhotoName(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors([])
        const data = {photoName}

        const edittedPhoto = await dispatch(updatePhoto(data, id))
        .catch(
            async(res) => {
                const validations = await res.json()

                if(validations && validations.errors)
                    setErrors(validations.errors)
            }
        )

        if(edittedPhoto)
            history.push(`/photos/${id}`)
    }

    const handleCancel = e => {
        e.preventDefault()
        history.push(`/photos/${id}`)
    }

    return(
        <div>
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
            <button type="submit">Make Change</button>
            <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default EditPhotoPage
