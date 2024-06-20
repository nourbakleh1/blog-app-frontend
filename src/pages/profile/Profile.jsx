import "./profile.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import { deleteUserProfile, getUserData } from "../../ApiCall/userSlice";
import Post_list from "../../components/posts/Post_list";
import { UpdateProfileImage } from "../../ApiCall/userSlice";
import { logout } from "../../ApiCall/authSlice";
import { Oval } from "react-loader-spinner";



const Profile = () => {
  const dispatch = useDispatch();
  const { user,isLoading,isError,error} = useSelector((state) => state.user);
  const {user:auth}=useSelector((state)=>{
    return state.auth
  });
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    const promise=dispatch(getUserData(id));
    return ()=>{
      promise.abort();
    }
  }, [id]);
  
  const navigate = useNavigate();
 

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("ther is no file!");
    const formData= new FormData();
    formData.append("image",file);
    dispatch(UpdateProfileImage(formData)).unwrap().then((resolve)=>{
      swal({
        title: resolve?.message,
        
        icon: "success",
      })
  }).catch((err)=>{
    console.log(err)
  })
  }
  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteUserProfile(user?._id)).unwrap().then((res)=>{
          dispatch(logout());
          navigate("/")
          
        });
        
      }
    });
  };

  if(isLoading) {
    return (
    <div className="profile-loader">
      <Oval
        height={120}
        width={120}
        color="#000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="grey"
        strokeWidth={3}
        strokeWidthSecondary={3}
        />
    </div>
  )}
  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : user?.profilePhoto?.url}
            alt=""
            className="profile-image"
          />
         
            {auth?._id == user?._id && <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button  className="upload-profile-photo-btn bg-white_color" type="submit">
                upload
              </button>
            </form>}
         
        </div>
        <h1 className="profile-username">{user?.username}</h1>
        <p className="profile-bio">{user?.bio}</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(user?.createdAt).toDateString()}</span>
        </div>
        
         {auth?._id == user?._id ?<button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn"
          >
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>:"" } 
        
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{user?.username} Posts</h2>
       
        <Post_list posts={user?.posts}/>



          
        
      </div>
      {auth?._id == user?._id &&
        <button onClick={deleteAccountHandler} className="flex mx-auto bg-red_color text-white_color p-2 border-x-slate-950 border-x-8   shadow-inner shadow-white">
          Delete Your Account
        </button>
      }
       
        {updateProfile && (
        <UpdateProfileModal
          user={user}
          setUpdateProfile={setUpdateProfile}
        />
      )}
     
    </section>
  );
};

export default Profile;
