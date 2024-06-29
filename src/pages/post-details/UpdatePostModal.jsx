import { useState, useEffect } from "react";
import "./update-post.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../ApiCall/categorySlice";
import { updatePost } from "../../ApiCall/postSlice";
import { useNavigate } from "react-router-dom";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { Allcategory } = useSelector((state) => state.reducer.category);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);
  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    let id=post?._id;
    let dataX={title, category, description};
    dispatch(updatePost({id,dataX})).unwrap().then((resolve)=>{
    setUpdatePost(false);
    });
    
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  return (
    <div className="update-post">
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => setUpdatePost((prev)=>{return !prev})}
            className="bi bi-x-circle-fill update-post-form-close"
          ></i>
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input
          type="text"
          className="update-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="update-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          {Allcategory?.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          className="update-post-textarea"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="update-post-bt bg-blue-400 w-fit m-auto p-2 ">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
