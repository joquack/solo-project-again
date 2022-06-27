import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CreatePhotoPage() {
    const user = useSelector(state => state.session.user)
    const userId = user.id

    const [photoName, setPhotoName] = useState("");
    const [source, setSource] = useState("");

    const changeName = e => setPhotoName(e.target.value)
    const changesource = e => setSource(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault()

        const data = {userId, photoName, source}
    }

    return (
        <>
        <h1>Create New Photo</h1>
        <form>
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
            <button type="submit">Upload Song</button>
        </form>
        </>
    )
}

export default CreatePhotoPage
