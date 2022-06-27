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

    const changeName = e => setPhotoName(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault()
        const data = {photoName}
        dispatch(updatePhoto(data, id))
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
            </form>
        </div>
    )
}

export default EditPhotoPage
