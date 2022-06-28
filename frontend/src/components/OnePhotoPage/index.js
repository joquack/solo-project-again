import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getOnePhoto, deletePhoto} from '../../store/photos'
import { useHistory } from 'react-router-dom';
import { getAllComments } from '../../store/comments';
import './index.css'

function OnePhotoPage () {
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const photo = useSelector(state => state?.photos)[id]
    const commentArr = Object.values(useSelector(state => state.comments)).filter(comment => comment.photoId == id)
    console.log('1 COMPONENT HEREEE ***************************', commentArr)

    useEffect(() => {
        dispatch(getOnePhoto(id))
        dispatch(getAllComments())
    },[dispatch, id])

    const handleEditClick = e => {
        e.preventDefault()
        history.push(`/edit/${id}`)
    }

    const handleDeleteClick = e => {
        dispatch(deletePhoto(id))
        history.push('/photos')
    }

    return (
        <>
            <h2>{photo.photoName}</h2>
            <img src={`${photo.source}`}></img>
            <span><button onClick={handleEditClick}>Edit Photo</button></span>
            <span><button onClick={handleDeleteClick}>Delete Photo</button></span>
            {commentArr.map(comment => {
                return (
                    <>
                    <div key={comment.id}><span className='username'>{comment.User.username}</span>{` ${comment.body}`}</div>
                    </>
                )
            })}
            {/* <textarea></textarea> */}
        </>
    )
}

export default OnePhotoPage
