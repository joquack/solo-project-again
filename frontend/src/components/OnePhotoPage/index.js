import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllPhotos, getOnePhoto, deletePhoto } from '../../store/photos'
import { useHistory } from 'react-router-dom';
import { getAllComments, createComment, deleteComment } from '../../store/comments';
import './index.css'

function OnePhotoPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user && state.session.user.id)
    // const userId = user.id
    const photo = useSelector(state => state.photos[id] && state.photos[id])
    const commentArr = Object.values(useSelector(state => state.comments && state.comments)).filter(comment => comment.photoId == id)
    // console.log('1 COMPONENT HEREEE ***************************', commentArr)
    const [comment, setComment] = useState('')
    // const [name, setName] = useState(photo.photoName || 'duck')

    const changeComment = e => setComment(e.target.value)

    useEffect(() => {
        dispatch(getAllPhotos())
        dispatch(getOnePhoto(id))
        dispatch(getAllComments())
    }, [dispatch])

    const handleEditPhoto = e => {
        e.preventDefault()
        history.push(`/edit/${id}`)
    }

    const handleDeletePhoto = async e => {
        e.preventDefault()
        await dispatch(deletePhoto(id))
        history.push('/photos')
    }

    const handleCreateComment = async e => {
        const body = comment
        const photoId = id
        e.preventDefault()
        const data = { userId, photoId, body }
        await dispatch(createComment(data))
        .then(() => dispatch(getAllComments()))
        setComment('')
    }

    const handleDeleteComment = async (e, commentId) => {
        e.preventDefault()
        // console.log('DELETE BUTTONNNNNNNNNNNNNNNNNNNNNNNNNN', commentId)
        await dispatch(deleteComment(commentId))
        .then(() => getAllComments())
    }

    return (
        <>
            {photo && <h2>{photo.photoName}</h2>}
            {photo && <img src={`${photo.source}`}></img>}
            <span><button onClick={handleEditPhoto}>Edit Photo</button></span>
            <span><button onClick={handleDeletePhoto}>Delete Photo</button></span>
            {commentArr && commentArr.map(comment => {
                return (
                    <div key={comment.id}>
                        <span className='username'>{comment?.User?.username}</span>{` ${comment?.body}`}
                        <button onClick={e => handleDeleteComment(e, comment.id)}>Delete Comment</button>
                    </div>
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
