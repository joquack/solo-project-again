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
    const commentArr = Object.values(useSelector(state => state.comments)).filter(comment => comment.photoId == id)
    // console.log('1 COMPONENT HEREEE ***************************', commentArr)
    const [comment, setComment] = useState('')

    const changeComment = e => setComment(e.target.value)

    useEffect(() => {
        dispatch(getOnePhoto(id))
        dispatch(getAllComments())
    }, [dispatch, id])

    const handleEditPhoto = e => {
        e.preventDefault()
        history.push(`/edit/${id}`)
    }

    const handleDeletePhoto = e => {
        dispatch(deletePhoto(id))
        history.push('/photos')
    }

    const handleCreateComment = e => {
        e.preventDefault()
        const data = { userId, id, comment }
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
            <form>
                <input
                    placeholder='Add a Comment'
                    value={comment}
                    onChange={changeComment}
                />

            </form>
        </>
    )
}

export default OnePhotoPage
