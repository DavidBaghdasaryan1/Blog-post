import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'

function CreatePost( { isAuth}) {
  const[title, setTitle] = useState("")
  const[postText, setPostText] = useState("")

  const postsCollectionRef = collection(db, "posts")
  let navigate = useNavigate()
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title: title, 
      text: postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate('/');
  }
  useEffect(() => {
    if(!isAuth){
      navigate('/login')
    }
  }, [])

  return (
    <div className='createPostPage'>
      <div className="cpContainer">
        <h1>Create post</h1>
        <div className="inputGp">
          <label htmlFor="title">Title: </label>
          <input 
            type='text'
            value={title}
            placeholder='Title...' 
            onChange={(event) => {
              setTitle(event.target.value)}
            }
          />
        </div>
        <div className="inputGp">
        <label htmlFor="title">Post: </label>
          <textarea
            placeholder='post..' 
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
          />
        </div>
        <button onClick={createPost}>Post</button>
      </div>
    </div>
  )
}

export default CreatePost