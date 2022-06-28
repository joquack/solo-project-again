import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePhoto, deletePhoto } from '../../store/photos'
import { useHistory } from 'react-router-dom';
import { getAllComments, createComment } from '../../store/comments';
import './index.css'

function OnePhotoPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const photo = useSelector(state => state?.photos)[id]
    // console.log('1 COMPONENT HEREEE ***************************', commentArr)
    const commentArr = Object.values(useSelector(state => state?.comments)).filter(comment => comment.photoId == id)
    const [comment, setComment] = useState('')

    const changeComment = e => setComment(e.target.value)

    useEffect(() => {
        dispatch(getOnePhoto(id))
        dispatch(getAllComments())
    }, [dispatch])

    const handleEditPhoto = e => {
        e.preventDefault()
        history.push(`/edit/${id}`)
    }

    const handleDeletePhoto = e => {
        dispatch(deletePhoto(id))
        history.push('/photos')
    }

    const handleCreateComment = e => {
        const body = comment
        const photoId = id
        e.preventDefault()
        const data = { userId, photoId, body }
        dispatch(createComment(data))
    }

    return (
        <>
            <h2>{photo.photoName}</h2>
            <img src={`${photo.source}`}></img>
            <span><button onClick={handleEditPhoto}>Edit Photo</button></span>
            <span><button onClick={handleDeletePhoto}>Delete Photo</button></span>
            {commentArr.map(comment => {
                return (
                    <>
                        <div key={comment.id}><span className='username'>{comment.User.username}</span>{` ${comment.body}`}</div>
                    </>
                )
            })}
            <form onSubmit={handleCreateComment}>
                    <input
                        placeholder='Add a Comment'
                        value={comment}
                        onChange={changeComment}
                    />
                <button type='submit'>Add Comment</button>
            </form>
        </>
    )
}

export default OnePhotoPage
