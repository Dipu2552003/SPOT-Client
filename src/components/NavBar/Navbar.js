import React from "react";
import "./Navbar.css";
import { Profileinlarge1 } from "../ProfileContent/Profile";
import $ from "jquery";
import { useState } from "react";
import { useCookies } from "react-cookie";

let countloginsignup = 0;

const Navbar = (props) => {
  // const book = props.book;
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [cookies, setCookie] = useCookies(["user"]);
  let buttonlogin,
    buttonloginbig,
    trophyandquestion,
    trophyandquestionsmall,
    logoutsmall;
  var well = {
    boxShadow: "0px 4px 0px 0px #f0f0f0",
  };
  if (cookies.jwttokenloginuser) {
    trophyandquestion = (
      <div class="ml-auto" style={{ display: "flex" }}>
        <div class="d-none d-md-block navbar-nav">
          <a href="#items-navbar" class="fainbox nav-item nav-link">
            <i class="fas fa-inbox"></i>
          </a>
        </div>

        <div class="d-none d-md-block navbar-nav">
          <a href="#items-navbar" class="fainbox nav-item nav-link">
            <i class="fas fa-trophy"></i>
          </a>
        </div>

        <div class="d-none d-md-block navbar-nav">
          <a href="#items-navbar" class="fainbox nav-item nav-link">
            <i class="fas fa-question-circle"></i>
          </a>
        </div>
      </div>
    );
    trophyandquestionsmall = (
      <li class="nav-item d-flex mx-auto">
        <div class="d-block d-md-none">
          <a href="#navlinksnew" class="fainbox nav-link">
            <i class="fas fa-inbox"></i>
          </a>
        </div>

        <div class="d-block d-md-none">
          <a href="#navlinksnew" class="fainbox nav-link">
            <i class="fas fa-trophy"></i>
          </a>
        </div>

        <div class="d-block d-md-none">
          <a href="#navlinksnew" class="fainbox nav-link">
            <i class="fas fa-question-circle"></i>
          </a>
        </div>
      </li>
    );
    logoutsmall = (
      <li class="nav-item mx-auto">
        <a href="logout" class="nav-link text-truncate">
          <i class="fas fa-house"></i>
          <span class="ms-1">Logout</span>
        </a>
      </li>
    );
  } else {
    buttonlogin = (
      <button
        type="button"
        class="d-block d-md-none btn btn-outline-primary"
        id="loginbuttonfor"
        data-toggle="modal"
        data-target="#loginModal"
      >
        Login
      </button>
    );
    buttonloginbig = (
      <button
        type="button"
        class="btn btn-outline-primary nav-item "
        data-toggle="modal"
        data-target="#loginModal"
        id="loginbuttonfor"
      >
        Login
      </button>
    );
  }

  const postLoginData = async (usernameget, passwordget) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameget,
          password: passwordget,
        }),
      });
      const resjson = await res.json();

      // Log the response for debugging
      console.log("Response JSON:", resjson);

      if (res.status === 200) {
        setCookie("jwttokenloginuser", resjson.token, {
          path: "/",
          expires: new Date(Date.now() + 60000000),
        });
        setCookie("userid", resjson.userId, {
          path: "/",
          expires: new Date(Date.now() + 60000000),
        });
        console.log(resjson.token);
        window.alert("Login successful");
        window.location.reload();
      } else {
        window.alert(resjson.error);
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const postSignData = async (
    namesign,
    emailsign,
    usernamesign,
    passwordsign
  ) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: namesign,
          email: emailsign,
          username: usernamesign,
          password: passwordsign,
        }),
      });
      const resjson = await res.json();
      if (res.status === 201) {
        window.alert(resjson.message);
        window.location.reload();
        // Log the response for debugging
        console.log("User ID:", resjson.userId);
        console.log("Response JSON:", resjson);

        // Check if userId is defined
      } else {
        window.alert(resjson.error);
      }
    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

  const submitdataforloginorsignup = () => {
    var chckorloginorsignupvariable = $("#loginuserconfirmidtochange").attr(
      "name"
    );

    if (chckorloginorsignupvariable === "loginuserconfirm") {
      if (user.username === "" || user.password === "") {
        console.log("not eligible for login");
      } else {
        let usernameget = user.username;
        let passwordget = user.password;
        postLoginData(usernameget, passwordget);
      }
    } else if (chckorloginorsignupvariable === "signupuserconfirm") {
      let namesign = $(".nameremove1").val();
      let emailsign = $(".emailremove1").val();
      let usernamesign = $("#user-usernamename").val();
      let passwordsign = $("#user-password").val();

      if (
        !namesign ||
        !emailsign ||
        !usernamesign ||
        !passwordsign ||
        namesign === "" ||
        emailsign === "" ||
        usernamesign === "" ||
        passwordsign === ""
      ) {
        console.log("not eligible for signup");
      } else {
        postSignData(namesign, emailsign, usernamesign, passwordsign);
      }
    }
  };

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const signupmodalclick = () => {
    if (countloginsignup % 2 === 0) {
      var nameinput = `<div class='form-group'><input required type='text' class='nameremove1 form-control' id='user-name' placeholder='Name..' name='name'/></div>`;
      var emailinput = `<div class='form-group'><input required type='email' class='emailremove1 form-control' id='email-name' placeholder='Email..' name='email'/></div>`;

      $(".fornname").prepend(nameinput);
      $(".fornname").prepend(emailinput);
      $(".signupmodalclick").text("Have an account? Login");
      $(".loginmodalLabelchange").text("Sign Up");
      $("#loginuserconfirmidtochange")
        .text("SignUp")
        .attr("name", "signupuserconfirm");
      $("#user-usernamename").attr("placeholder", "Create a username..");
      $("#user-password").attr("placeholder", "Create a password..");
      countloginsignup += 1;
    } else {
      $(".nameremove1").remove();
      $(".emailremove1").remove();
      $(".signupmodalclick").text("Don't have an account? Sign up");
      $("#user-usernamename").attr("placeholder", "Username..");
      $("#user-password").attr("placeholder", "Password..");
      $(".loginmodalLabelchange").text("Login");
      $("#loginuserconfirmidtochange").text("Login");
      $("#loginuserconfirmidtochange").attr("name", "loginuserconfirm");
      countloginsignup += 1;
    }
  };

  return (
    <div>
      <nav
        class="fixed-top navbar navbar-expand-md navbar-light bg-light"
        style={well}
      >
        <div class="container-fluid">
          <div class="navbar-brand d-flex" style={{ fontWeight: "400" }}>
            <a href="/home" style={{ textDecoration: "none" }}>
              <i class="fab fa-stack-overflow"></i>&nbsp;SPOT
            </a>
          </div>
          {buttonlogin}
          <button
            type="button"
            class="navbar-toggler"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            &nbsp;
            <div class="d-flex">
              <input
                type="text"
                class="form-control searchmainnav"
                placeholder="Search a question.."
              />
              &nbsp;
              <button type="button" class="btn btn-outline-primary">
                <i class="fa fa-search"></i>
              </button>
            </div>
            {/* <div class> */}
            {trophyandquestion}
            <div class="row ml-auto">
              <div class="col-5  d-flex d-sm-none d-none d-md-block">
                {buttonloginbig}
              </div>
              <div class="col-1">
                <Profileinlarge1 />
              </div>
            </div>
            <div class="navbar-nav"></div>
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
      </nav>

      {/* Modal For Login & Signup */}
      <div
        class="modal fade"
        id="loginModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="loginmodalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title loginmodalLabelchange"
                id="loginmodalLabel"
              >
                Login
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="fornname form-group">
                {/* <label for="recipient-name" class="col-form-label">Username:</label> */}
                <input
                  type="text"
                  class="form-control"
                  id="user-usernamename"
                  placeholder="Username.."
                  value={user.username}
                  name="username"
                  onChange={handleInputs}
                  required
                />
              </div>
              <div class="form-group">
                {/* <label for="message-text" class="col-form-label">Password:</label> */}
                <input
                  type="password"
                  class="form-control"
                  id="user-password"
                  placeholder="Password.."
                  value={user.password}
                  name="password"
                  onChange={handleInputs}
                  required
                />
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-7 col-sm-7 col-12 col-md-7">
                  <div class="row">
                    <div class="col-lg-4 col-sm-4 col-6 col-md-4">
                      <input
                        type="submit"
                        onClick={submitdataforloginorsignup}
                        name="loginuserconfirm"
                        id="loginuserconfirmidtochange"
                        class="btn btn-primary"
                      />
                    </div>
                    <div class="col-lg-3 col-sm-3 col-6 col-md-4">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>

                <div class="col-lg-5 col-sm-5 col-12 col-md-5">
                  <a
                    href="#navlinksnew"
                    class="signupmodalclick"
                    onClick={signupmodalclick}
                  >
                    Don't have an account? Sign up
                  </a>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>

      {/* End of Modal */}

      {/*Sidebar Start*/}
      <div
        class="offcanvas offcanvas-start w-100"
        tabindex="-1"
        id="offcanvas"
        data-bs-keyboard="false"
        data-bs-backdrop="false"
      >
        <div class="offcanvas-header align-items-end flex-row-reverse">
          {/*<h6 class="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>*/}
          <button
            type="button"
            class="btn-close text-reset border border-danger"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body px-0">
          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu"
          >
            <li class="nav-item mx-auto">
              <a
                href="#navlinksnew"
                class="nav-link text-truncate"
                style={{ fontSize: "30px" }}
              >
                <i class="fab fa-stack-overflow"></i>&nbsp;AskOverflow
              </a>
            </li>
            <li class="nav-item mx-auto">
              <a href="#navlinksnew" class="nav-link text-truncate">
                <i class="fas fa-tachometer-alt"></i>
                <span class="ms-1">Home</span>
              </a>
            </li>
            <li class="mx-auto">
              <a
                href="#submenu1"
                data-bs-toggle="collapse"
                class="nav-link text-truncate"
              >
                <i class="fas fa-globe-africa"></i>
                <span class="ms-1">Questions</span>{" "}
              </a>
            </li>
            <li class="mx-auto">
              <a href="#navlinksnew" class="nav-link text-truncate">
                <i class="fas fa-tags"></i>
                <span class="ms-1">Tags</span>
              </a>
            </li>
            <li class="mx-auto">
              <a
                href="#submenu1"
                data-bs-toggle="collapse"
                class="nav-link text-truncate"
              >
                <i class="fas fa-users"></i>
                <span class="ms-1">Users</span>{" "}
              </a>
            </li>
            <li class="mx-auto">
              <a
                href="#submenu1"
                data-bs-toggle="collapse"
                class="nav-link text-truncate"
              >
                <i class="fas fa-briefcase"></i>
                <span class="ms-1">Jobs</span>{" "}
              </a>
            </li>
            <li class="mx-auto">
              <a href="#custo" class="nav-link text-truncate">
                <i class="fas fa-users"></i>
                <span class="ms-1">Teams</span>{" "}
              </a>
            </li>
            <li class="nav-item d-flex mx-auto">{trophyandquestionsmall}</li>

            <li class="mx-auto">
              <Profileinlarge1 />
            </li>

            {logoutsmall}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
