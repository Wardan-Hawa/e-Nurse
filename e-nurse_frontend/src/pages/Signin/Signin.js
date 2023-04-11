// import "bootstrap/dist/css/bootstrap.css";
import { useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"
// import "./Signin.css";
// import logo from '../SignUp/logon.png'


const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
 console.log(authCtx);
  const signIn = async () => {
    const account = emailRef.current.value;
    const password = passwordRef.current.value;
    const response = await fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({
        account,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.success) {
        authCtx.signIn(json.data, json.data.token);
        navigate("/");
    } else {
      window.alert(json.messages[0]);
    }
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-10  col-md-8  col-lg-6 ">
          <div
            style={{
              fontFamily: "Medium",
            }}
            class="Sign-in my-5 p-5"
          >
            {/* <div class="logo mb-4">
              <img
                className="img"
                src={logo}
                alt="Hola"
              ></img>
            </div> */}
            <h1 class="login-title mb-4">Login</h1>
            <div class="form-field mb-3">
              <label htmlFor="email" for="email" class="mb-2">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                class="form-control"
              ></input>
            </div>
            <div class="form-field mb-3">
              <label
                htmlFor="password"
                ref={passwordRef}
                for="password"
                class="mb-2"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                class="form-control"
              ></input>
            </div>
            <div class="row mt-5 align-items-center">
              <div class="col-5">
                <NavLink to={"/"}>Sign Up Now!</NavLink>
              </div>
              <div class="col-7">
                <button onClick={signIn} class="ms-3 btn btn-bright cyan  bg-color text-white">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
