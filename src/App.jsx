import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/PostsPage";
import CreatePost from "./pages/create-post/CreatePost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import Error from "./pages/Error-page/Error";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";

function App() {
  const {user}=useSelector((state)=>{
    return state.auth});
    
  return (
    <>
    <BrowserRouter>
    <ToastContainer theme="colored" position="top-center"/>

    <Header/>
    
    <div className="container m-auto">
    <Routes>
      <Route  path="/" element={<Home />} ></Route>
      
      <Route  path="/login" element={user ?<Navigate to="/"/>: <Login />} ></Route>
      <Route  path="/register" element={user ?<Navigate to="/"/>:<Register />} ></Route>
      <Route  path="/forgot-password" element={user ?<Navigate to="/"/>:<ForgotPassword />} ></Route>
      <Route  path="/reset-password" element={user ?<Navigate to="/"/>:<ResetPassword />} ></Route>
      <Route  path="/users/:user_id/verify/:token" element={user ?<Navigate to="/"/>:<VerifyEmail />} ></Route>






      <Route path="posts">
      <Route  index={true} element={<PostsPage />} />
      <Route  path="details/:id" element={<PostDetails />} />
      <Route  path="categories/:category" element={<Category />} />
      <Route path='profile/:id' element=<Profile/> />
      <Route  path="createPost" element={user? <CreatePost /> : <Navigate to="/"/>} />
      </Route>
     



      <Route  path="/admin-dashboard" element={user?.isAdmin ?<AdminDashboard />:<Navigate to="/"/>} />
      <Route  path="/admin-dashboard/users-table" element={<UsersTable />} />
      <Route  path="/admin-dashboard/posts-table" element={<PostsTable />} />
      <Route  path="/admin-dashboard/categories-table" element={<CategoriesTable />} />
      <Route  path="/admin-dashboard/comments-table" element={<CommentsTable />} />





      <Route  path="/*" element={<Error />} />




      

    </Routes>
    </div>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
