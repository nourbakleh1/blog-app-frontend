import "./comment-list.css";
import swal from "sweetalert";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";
// import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../ApiCall/postSlice";
import { DeleteComment } from "../../ApiCall/CommentsSlice";
// import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
    }).then((resolve)=>{
      dispatch(DeleteComment(commentId)).unwrap().then((resolve)=>{
        swal({
          title: resolve.message,
          
          icon: "success",
          
        })
      })
    })
    
    
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div key={comment?._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-username">{comment.username}</div>
            <div className="comment-item-time">
            {/* 2 hours
              <Moment fromNow ago>
                {comment.createdAt}
              </Moment>{" "}
              ago */}
            </div>
          </div>
          <p className="comment-item-text">{comment.text}</p>
          
            <div className="comment-item-icon-wrapper">
              {
                comment?.user == user?._id | user?.isAdmin ?
                <i
                onClick={() => deleteCommentHandler(comment?._id)}
                className="bi bi-trash-fill"
              ></i>
                :""}
              {comment?.user == user?._id &&
                <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square"
              ></i>
              }
            </div>
          
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
