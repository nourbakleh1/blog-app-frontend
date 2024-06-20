import "./add-comment.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createComments } from "../../ApiCall/CommentsSlice";
import { useParams } from "react-router-dom";


const AddComment = () => {
   const dispatch=useDispatch();
    const [text, setText] = useState("");
    const {id:postId}=useParams();

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(text.trim() === "") return toast.error("Please write something");
        let data={
            postId,text
        }
        console.log(data)
        dispatch(createComments(data)).unwrap().then((resolve)=>{
            setText("");
        });
    }

    return ( 
        <form onSubmit={formSubmitHandler} className="add-comment">
            <input 
             type="text" 
             placeholder="Add a comment" 
             className="add-comment-input"
             value={text}
             onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="add-comment-btn bg-blue-600">
                Comment
            </button>
        </form>
     );
}
 
export default AddComment;