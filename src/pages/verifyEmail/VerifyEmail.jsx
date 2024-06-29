import "./verify-email.css";
import { Link,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyToken } from "../../ApiCall/authSlice";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector(state => state.reducer.auth);
  
  const { user_id, token } = useParams();
  
  useEffect(() => {
    dispatch(verifyToken({user_id, token}));
  }, [user_id, token]);

  return (
    <section className="verfiy-email">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check verify-email-icon"></i>
          <h1 className="verfiy-email-title">
            Your email address has been successfully verified
          </h1>
          <Link to="/login" className="verify-email-link">
            Go To Login Page
          </Link>
        </>
      ) : (
        <>
          <h1 className="verify-email-not-found">Not Found</h1>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
