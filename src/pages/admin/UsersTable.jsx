import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUserProfile, getAllUSERS } from "../../ApiCall/userSlice";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { AllUsers } = useSelector(state => state.user);

  // const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    const prom=dispatch(getAllUSERS());
    return ()=>{
      prom.abort();
    }
  }, []);

  // Delete User Handler
  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUserProfile(userId));
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {AllUsers?.map((user, index) => (
              <tr key={user?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={user?.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{user?.username}</span>
                  </div>
                </td>
                <td>{user?.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/posts/profile/${user?._id}`}>View Profile</Link>
                    </button>
                    <button onClick={() => deleteUserHandler(user?._id)}>
                      Delete User
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

export default UsersTable;
