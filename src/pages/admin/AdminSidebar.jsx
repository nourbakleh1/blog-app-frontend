import { NavLink } from "react-router-dom";


const AdminSidebar = () => {
    return ( 
        <div className="admin-sidebar">
            <NavLink end to="/admin-dashboard" className="admin-sidebar-title">
                <i className="bi bi-columns"></i>
                Dashboard
            </NavLink>
            <ul className="admin-dashboard-list">
                <NavLink 
                 className="admin-sidebar-link" 
                 to="/admin-dashboard/users-table">
                    <i className="bi bi-person"></i>
                    Users
                </NavLink>
                <NavLink className="admin-sidebar-link" to="/admin-dashboard/posts-table">
                    <i className="bi bi-file-post"></i>
                    Posts
                </NavLink>
                <NavLink className="admin-sidebar-link" to="/admin-dashboard/categories-table">
                    <i className="bi bi-tag-fill"></i>
                    Categories
                </NavLink>
                <NavLink className="admin-sidebar-link" to="/admin-dashboard/comments-table">
                    <i className="bi bi-chat-left-text"></i>
                    Comments
                </NavLink>
            </ul>
        </div>
     );
}
 
export default AdminSidebar;