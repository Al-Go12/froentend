import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import DropdownOptions from './DropdownOptions';
import Loader from './loader';



import { BASE_URL } from '../constant/api_url'

import deletePostApi from '../api/DeletePostApi';



import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import UpdatePostApi from '../api/UpdatePostApi';

import PostModal from './postModal'
import getPostDetailApi from '../api/getPostDetailApi';
import likePostApi from '../api/likePostApi';
import createCommentApi from '../api/createCommentApi';
import deleteCommentApi from '../api/deleteCommentApi';
import { NavLink } from 'react-router-dom';
const DisplayPicture = "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"



const PostDetailModal = ({ isVisible, onClose, postID,onDelete }) => {
  console.log('checking', postID)

  const [post, setPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false)
  // const [postId,setPostId] = useState()
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState('')

  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const [showPostDetailModal, setShowPostDetailModal] = useState(false)
  const [initialCaption, setInitialCaption] = useState('');
  const [initialImage, setInitialImage] = useState(null);
  const [isPortrait, setIsPortrait] = useState('')
  const user = useSelector(state => state.authentication_user.userProfile)
  const updateCaption = (newCaption) => {
    setInitialCaption(newCaption);
  };

  const fetchData = async () => {
    try {
      console.log('postdetailModal', postID)
      const data = await getPostDetailApi(postID);
      setPost(data);

      console.log('Data received from API:', data);
      setComments(data.comments)
      updateCaption(data.body)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    console.log('checking', postID)
    setLoading(true)
    if (postID) {
      console.log("checking use effect")
      fetchData();
    }
    setLoading(false)
  }, [postID]);

  if (!isVisible) return null;





  const handleDeletePost = async (postId) => {
    try {
      await deletePostApi(postId, fetchData)
      toast.success('Post Deleted Successfully.', {
        position: 'top-center',
      })
      onDelete(postId);
      onClose()
    } catch (error) {
      toast.error('Post Not Deleted.', {
        position: 'top-center',
      })
    }
  }


  const handleReportPost = async (postId) => {
    try {

      console.log('before api', postId)






    }
    catch (error) {
      toast.error('Failure,post not Resported!', {
        position: 'top-center'
      })
    }
  }

  const handleUpdatePost = () => {
    //   setPostId(postID)

    const postToUpdate = post
    console.log('postToUpdate', postToUpdate)
    if (postToUpdate) {
      console.log('inside handlupdatePost', postToUpdate.body, postToUpdate.img)
      setInitialCaption(postToUpdate.body)
      setInitialImage(postToUpdate.img)
    }
    fetchData()
    setShowPostModal(true)
  }

  const closePostModal = () => {
    setShowPostModal(false)
    setShowPostDetailModal(false)
  }


  const toggleLikePost = async (postId) => {
    try {
      setLoading(true)
      await likePostApi(postId, fetchData);
      setLoading(false)
    } catch (error) {
      toast.error("Failure, Post not Liked!", {
        position: "top-center",
      });
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await createCommentApi(postID, comment)
      setComment('')
      fetchData();
      setLoading(false)
    } catch (error) {
      toast.error('Failure, comment not posted.!', {
        position: "top-center",
      });
    }
  }

  const deleteComment = async (commentId) => {
    await deleteCommentApi(commentId)
    fetchData();
  }

  const highlightForm = () => {
    inputRef.current.focus();
  };


  if (loading) {
    return <Loader />; // Render loader component while data is being fetched
  }


  return (
    <div
      className="z-10 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center "
      id="wrapper"
    >
      <ToastContainer />
      <PostModal isVisible={showPostModal} onClose={closePostModal} postID={postID} initialCaption={initialCaption} initialImage={initialImage} updateCaption={updateCaption} />

      <div className="m-2 w-3/5 flex flex-col p-2 rounded">
        <button className="text-white text-xl place-self-end" onClick={onClose}>
          x
        </button>
        <div className=" p-2 rounded" style={{ backgroundColor: 'rgb(38,38,38)' }} >
          <div className="flex content-between shadow-lg flex-grow">
            <div className="flex flex-wrap content-center justify-center rounded-r-md w-1/2">
              <img
                className="w-100 bg-center bg-no-repeat bg-cover rounded-l-md"
                src={`${BASE_URL}` + post?.img}
                alt="post_here"
                onLoad={(event) => {
                  const img = event.target;
                  const ratio = img.width < img.height ? '255px' : '85px';
                  setIsPortrait(ratio)
                }}
              />

            </div>


            <div className="flex flex-wrap content-between justify-start p-4 rounded-l-md  w-1/2 overflow-y-auto " style={{ position: 'relative' }}>
              <div className="w-full">
                <div className="flex items-center space-x-4 border-b-2  border-gray-100">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={post?.author?.display_pic ? `${BASE_URL}${post.author.display_pic}` : DisplayPicture}
                      alt="user"
                    />
                  </div>
                  <div>
                    <>
                      <h1 className="text-xl font-semibold">


                        <NavLink to={`/profile/${post?.author?.email}`} className="mb-2 mr-3 ms-2 mt-2 text-md font-bold cursor-pointer leading-tight text-[#262626] text-decoration-none" >
                          {post?.author?.username}
                        </NavLink>

                      </h1>
                      <small className="text-gray-400">{post?.body}</small>
                    </>
                  </div>
                </div>
                <br />
                <div className="space-x-4 border-b-2  border-gray-100" style={{ minHeight: '205px' }}>
                  <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-white ">Comments</label>

                  <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto" style={{ maxHeight: isPortrait }}>
                    {comments ? comments.map((cmnt) => (
                      <li key={cmnt.id} className="border-none">

                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              className="w-8 h-8 rounded-full border"
                              src={cmnt?.user?.display_pic ? `${BASE_URL}${cmnt.user.display_pic}` : DisplayPicture}
                              
                              alt="comment_user"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm pt-3 font-medium text-white">
                              {cmnt.user.username}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {cmnt.body}
                            </p>
                          </div>
                          <small className="text-gray-400">{cmnt.created_time} ago</small>
                          {cmnt.user.email === user.email && (
                            <span><button onClick={() => deleteComment(cmnt.id)} className='text-black text-md mr-2'>x</button></span>
                          )}
                        </div>
                      </li>
                    )) : (
                      <h1 className='flex justify-center align-middle'>Not Comments yet..!</h1>
                    )}
                  </ul>
                </div>
                <br />
                <div className='interaction' style={{ position: 'absolute', bottom: '0', left: '10', width: '90%' }}>
                  <div className="flex items-center space-x-4">
                    <div className="p-0">
                      <div className="flex flex-row gap-4">
                        {post?.likes?.includes(user?.id) ? (
                          <button
                            className="inline-block p-0 text-xs font-medium leading-normal"
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={() => {
                              toggleLikePost(post.id, true);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="28"
                              viewBox="0 -960 960 960"
                              width="28"
                            >
                              <path
                                d="m480-121-41-37q-106-97-175-167.5t-110-126Q113-507 96.5-552T80-643q0-90 60.5-150.5T290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.5T880-643q0 46-16.5 91T806-451.5q-41 55.5-110 126T521-158l-41 37Z"
                                style={{ fill: "red" }}
                              />
                            </svg>
                          </button>
                        ) : (
                          <button
                            className="inline-block p-0 text-xs font-medium leading-normal  text-white"
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={() => {
                              toggleLikePost(post.id, true);
                            }}
                          >
                            <span className="material-symbols-outlined">
                              <FavoriteBorderIcon />
                            </span>
                          </button>
                        )}
                        <button
                          className="inline-block p-0 text-xs font-medium leading-normal  text-white"
                          type="button"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          onClick={highlightForm}
                        >
                          <span className="material-symbols-outlined">
                            <ChatBubbleOutlineIcon />
                          </span>
                        </button>

                        <button className='text-white'>
                          <DropdownOptions post={post} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost} handleReportPost={handleReportPost} />
                        </button>


                        {/* 
<DropdownOptions post={post} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost} />
*/}

                      </div>
                      <p className='text-white'>{post?.likes_count ?? 0}&nbsp;likes&nbsp;&nbsp;
                        {post?.comments_count ?? 0}comments</p>
                    </div>
                  </div>

                  < form onSubmit={postComment}>
                    <label htmlFor="search" className="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                      {/*    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <img className="w-8 h-10 text-gray-500 dark:text-gray-400" aria-hidden="true" src={`${BASE_URL}` + post?.author?.display_pic} alt='user'></img>

                        </div>
                        */}
                      <input ref={inputRef} value={comment} onChange={(e) => setComment(e.target.value)} type="search" id="search" className="block w-full pt-4 pb-4 pl-9 ml-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your comment here.!" required />
                      <button type="submit" className="text-white absolute right-2.5 bottom-3.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailModal
