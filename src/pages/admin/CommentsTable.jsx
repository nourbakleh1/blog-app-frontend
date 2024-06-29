import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  DeleteCommentAdmin, getAllComments } from "../../ApiCall/CommentsSlice";
const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.reducer.comments);

  useEffect(() => {
    const promise=dispatch(getAllComments());

    return ()=>{
      promise.abort();
    }

  }, []);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeleteCommentAdmin(commentId));
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((comment,index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={comment?.user?.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">
                      {comment?.user?.username}
                    </span>
                  </div>
                </td>
                <td>{comment?.text}</td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCommentHandler(comment?._id)}>
                      Delete Comment
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommentsTable;
