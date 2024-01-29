import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaTrash } from 'react-icons/fa';
import { auth } from '../firebase';




function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [postsCollectionRef]);

  const deletePost = async (postId) => {
    const postDoc = doc(db, 'posts', postId);
    await deleteDoc(postDoc);
  };
  
  return (
    <div className='homePage'>
      {postList.map((post) => (
        <div className='posts' key={post.id}>
          <div className='postHeader'>
            <div className='title'>
              <h1>{post.title}</h1>
            </div>
            <div className='deletePost'>
              {isAuth && post.author.id === auth.currentUser.uid && <button onClick={() => deletePost(post.id)}><FaTrash /></button>}
            </div>
          </div>
          <div className='postContainer'>{post.text}</div>
          <h3>@{post.author.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Home;