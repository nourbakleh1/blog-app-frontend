import { Link, useNavigate, useParams } from "react-router-dom";
import "./post-details.css";
import { useEffect, useState } from "react";
import {  toast } from "react-toastify";
import AddComment from "../../components/Comment/AddComment";
import CommentList from "../../components/Comment/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostDitails, toggleLike, updateImagePost } from "../../ApiCall/postSlice";

const PostDetails = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {id} =useParams();
  const [file,setFile]=useState(null);
  const[updatepost,setUpdatePost]=useState(false);
  const {singlePost}=useSelector((state)=>state.reducer.post);
  const {users:user}=useSelector((state)=>{
    return state.reducer.auth
  });
    
    
  useEffect(()=>{
    window.scrollTo(0,0);
    const promise=dispatch(getPostDitails(id));
    return ()=>{
      promise.abort();
    }
  },[id]);
    
    const updateImageSubmitHandler=(e)=>{
        e.preventDefault();
        if(!file){
            return toast.warning("there is no file!");
        }
        const formData= new FormData();
        formData.append("image",file);

        dispatch(updateImagePost({id,formData}));
    }
    //delete post handeler
   const deletePostHandler = ()=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((resulve)=>{
            dispatch(deletePost(id)).unwrap().then((resulve)=>{
              swal({

                title: resulve.message,
                icon: "success",
                
              }).then((isOk)=>{
                navigate("/posts");
              })
            }).catch((error)=>{
              console.log(error.message)
            })
          });
    }
    const isFound =singlePost?.likes?.find((el)=> el == user?._id)
  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          src={file? URL.createObjectURL(file): singlePost?.image?.url}
          alt=""
          className="post-details-image"
        />
        
          {
            singlePost?.user?._id == user?._id && <form
            onSubmit={updateImageSubmitHandler}
            className="update-post-image-form"
          >
            <label htmlFor="file" className="update-post-label">
              <i className="bi bi-image-fill"></i>
              Select new image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button  type="submit">upload</button>
          </form> 
          }
        
      </div>
      <h1 className="post-details-title">{singlePost?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={singlePost?.user?.profilePhoto.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/posts/profile/${singlePost?.user?._id}`}>{singlePost?.user?.username}</Link>
          </strong>
          <span>{new Date(singlePost?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">
        {singlePost?.description}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est
        reprehenderit, molestiae officia non corrupti iusto, molestias quod
        repellat, distinctio temporibus explicabo? Placeat, dolorum atque fugiat
        vitae suscipit ratione quo? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Vero est reprehenderit, molestiae officia non corrupti
        iusto, molestias quod repellat, distinctio temporibus explicabo?
        Placeat, dolorum atque fugiat vitae suscipit ratione quo?
      </p>
      <div className="post-details-icon-wrapper">
      {user &&
        <div>
          <i onClick={()=>dispatch(toggleLike(id))} className={isFound ? 'bi bi-hand-thumbs-up-fill':'bi bi-hand-thumbs-up'}></i>
        
        <small>{singlePost?.likes?.length} likes</small>
      </div>
      }
        
        
        {
          singlePost?.user?._id == user?._id && <div>
            <i onClick={()=>setUpdatePost((prev)=>!prev)} className="bi bi-pencil-square"
            ></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        }
         
        
      </div>
     <AddComment/>
     <CommentList comments={singlePost?.comments} />
     {
      updatepost && <UpdatePostModal post={singlePost} setUpdatePost={setUpdatePost}/>
     }
    </section>
  )
}

export default PostDetails;