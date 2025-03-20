import { React, useEffect } from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import * as AppConstants from "../common/constants";
import { toast } from 'react-toastify';
import CommonToastContainer from "../common/ToastAlert"

export default function Login({setUser, userInfo}) {
  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo) {      
      navigate("/rrsexpense");
    }
  }, [userInfo]);
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch(`${AppConstants.jsonServerApiUrl}/users`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
   
      var result = res.filter( u => 
              u.userName.toLowerCase() === data.get("userid").toLowerCase() && u.password === data.get("password"));
     
      if(result?.length > 0) {
        setUser(result[0]);
        navigate("/loadingPage");
      } else {
        toast.error("Login failed, required valid credentials.");
      }
      
    })
    .catch((error) => {      
      toast.error(`${error.message}, Login failed`);
    });

  };

  return (
    <div className="login-form">
      <CommonToastContainer/>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 ">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box d-none d-sm-block"
            style={{ background: "#798cc1" }}
          >
            <div className="featured-image mb-3">
              <img
                src={require("../images/1.png")}
                className="img-fluid"
                style={{ marginwidth: "350px" }}
              ></img>
            </div>
            <p className="text-white fs-6 ">Daily Expense Tracker System</p>
            <small className="text-white text-wrap text-center">
              It doesn't matter how much money you earn, what matters is how
              much you save. Use RRS Expenses Manager to track your expenses &
              it is simple way to manage your personal finances.
            </small>
            <br />
            <p className="mt-3 ">
              <small className="text-white text-wrap text-center">
                “Expenses Manager - Just Perfect!”.
              </small>
            </p>
          </div>

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-2 text-center">
                <img src={require("../images/logo.png")} style={{width:60, height:60}} className="avatar-logo img-fluid rounded" alt=""></img>
                <h3>Expense Manager</h3>
                <p>Track your expenses & income </p>
                {/* <p>We are happy to have you back.</p> */}
              </div>
              <form onSubmit={handleSubmit} className="was-validated">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="User ID"
                    id="userid"
                    name="userid"
                    autoComplete="off"
                    required
                    autoFocus
                  ></input>
                </div>

                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Password"
                    id="password"
                    name="password"
                    required
                  ></input>
                </div>

                <div className="input-group mb-3 d-flex justify-content-between">
                  <div className="forgot">
                    <small>
                      <a href="">Forgot Password?</a>
                    </small>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <button
                    className="btn btn-lg btn-warning w-100 fs-6 rounded-5"
                    type="submit"
                  >
                    Login&nbsp;
                    <i className={`fa-solid fa-chevron-right pe-2`}></i>
                  </button>
                </div>
              </form>

              <div className="row">
                <small>
                  Don't have account? <NavLink to="/register">Register</NavLink>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="row text-center">
          <a className="text-muted footer-text">
            All copy right reserved @2025 by RK
          </a>
        </div>
      </div>
    </div>
  );
}
