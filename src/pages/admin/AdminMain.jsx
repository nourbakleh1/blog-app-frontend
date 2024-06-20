import { Link } from "react-router-dom";
import AddCategoryForm from "./AddCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllComments } from "../../ApiCall/CommentsSlice";
import { getAllCategory } from "../../ApiCall/categorySlice";
import { getPostCount } from "../../ApiCall/postSlice";
import { getAllUSERS } from "../../ApiCall/userSlice";

const AdminMain = () => {
    const dispatch = useDispatch();
    const { Allcategory } = useSelector(state => state.category);
    const { AllUsers } = useSelector(state => state.user);
    const { postCount } = useSelector(state => state.post);
    const { comments } = useSelector(state => state.comments);

    useEffect(() => {
        const promise1=dispatch(getAllCategory());
        const promise2=dispatch(getAllUSERS());
        const promise3=dispatch(getPostCount());
        const promise4=dispatch(getAllComments());
    return ()=>{
        promise1.abort();
        promise2.abort();
        promise3.abort();
        promise4.abort();
    }
    }, []);
    
    return ( 
        <div className="amdin-main">
            <div className="admin-main-header">
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Users</h5>
                    <div className="admin-card-count">
                       {AllUsers?.length}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link 
                         to="/admin-dashboard/users-table"
                         className="admin-card-link"
                        >
                           See all users
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-person"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Posts</h5>
                    <div className="admin-card-count">
                        {postCount}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link 
                         to="/admin-dashboard/posts-table"
                         className="admin-card-link"
                        >
                           See all posts
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-file-post"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Categories</h5>
                    <div className="admin-card-count">
                        {Allcategory?.length}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link 
                         to="/admin-dashboard/categories-table"
                         className="admin-card-link"
                        >
                           See all categories
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-tag-fill"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Comments</h5>
                    <div className="admin-card-count">
                        {comments?.length}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link 
                         to="/admin-dashboard/comments-table"
                         className="admin-card-link"
                        >
                           See all comments
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-chat-left-text"></i>
                        </div>
                    </div>
                </div>
            </div>
            <AddCategoryForm />
        </div>
     );
}
 
export default AdminMain;