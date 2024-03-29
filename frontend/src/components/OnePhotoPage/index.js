import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getAllPhotos, getOnePhoto, deletePhoto } from '../../store/photos'
import { useHistory } from 'react-router-dom';
import { getAllComments, createComment, deleteComment } from '../../store/comments';
import './index.css'

function OnePhotoPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const userId = useSelector(state => state.session.user && state.session.user.id)
    const photo = useSelector(state => state.photos[id] && state.photos[id])
    const commentArr = Object.values(useSelector(state => state.comments && state.comments)).filter(comment => comment.photoId === Number(id))
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([]);

    const changeComment = e => setComment(e.target.value)

    useEffect(() => {
        dispatch(getAllPhotos())
        dispatch(getOnePhoto(id))
        dispatch(getAllComments())
    }, [dispatch, id])

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
        setErrors([])
        const data = { userId, photoId, body }

        const createdComment = await dispatch(createComment(data))
        .then(() => dispatch(getAllComments()))
        .catch(
            async(res) => {
                const validations = await res.json()

                if(validations && validations.errors)
                    setErrors(validations.errors)
            }
        )
        if(createdComment)
            await dispatch(getAllComments())
            setComment('')
    }

    const handleDeleteComment = async (e, commentId) => {
        e.preventDefault()
        await dispatch(deleteComment(commentId))
        .then(() => getAllComments())
    }


    return (
        <>  <div className='all-photos'>
                <Link to='/photos'>All Photos</Link>
            </div>
            {photo && <h2>{photo.photoName}</h2>}
            {photo && <img src={`${photo.source}`} className='onephoto' alt={photo.photoName}></img>}
            {photo && userId && photo.userId === userId ?
                <span><button onClick={handleEditPhoto}>Edit Photo</button>
                <button onClick={handleDeletePhoto}>Delete Photo</button></span>
                : <></>}

            {commentArr && commentArr.map(comment => {
                return (
                    <div key={comment.id} className='comments'>
                        <span className='username'>{comment?.User?.username}</span>
                        <span className='comment-body'>{` ${comment?.body}`}</span>

                        {comment.userId === userId ? <button onClick={e => handleDeleteComment(e, comment.id)} className='delete-button'>Delete Comment</button> : <></>}

                    </div>
                )
            })}
            {user &&
            <form onSubmit={handleCreateComment}>
            <div className='errors'>
                <ul>
                    {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            </div>
                <input
                    placeholder='Add a Comment'
                    value={comment}
                    onChange={changeComment}
                />
                <button type='submit'>Add Comment</button>
            </form>
            }

        </>
    )
}

export default OnePhotoPage
