import React from "react";
import { useCookies } from "react-cookie";

const Profileinlarge1 = () => {
  const [cookies] = useCookies(["jwttokenloginuser"]);

  let profile = null;

  const handleLogOut = () => {
    alert("heelo");
    document.cookie =
      "jwttokenloginuser" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/";
  };

  if (cookies.jwttokenloginuser) {
    profile = (
      <div className="dropdown .d-lg-none .d-xl-block">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
            width="30"
            height="30"
            alt="avatar"
            className="rounded-circle"
          />
        </button>
        <ul
          className="dropdown-menu dropdown-menu-lg-end"
          aria-labelledby="dropdownMenu2"
        >
          <li>
            <a className="dropdown-item" href="/user">
              Profile
            </a>
          </li>

          <li>
            <a className="dropdown-item" onClick={handleLogOut}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }

  return <div className="dropdown .d-lg-none .d-xl-block">{profile}</div>;
};

const Profileinsmall = () => {
  const handleLogOut = () => {
    alert("logout successful");
    localStorage.removeItem("jwttokenloginuser");
    window.location.href = "/logout";
  };
  return (
    <div className="dropdown d-md-none d-lg-none d-xl-none">
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        id="dropdownMenu2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
          width="30"
          height="30"
          alt="avatar"
          className="rounded-circle"
        />
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
        <li>
          <a className="dropdown-item" href="/user">
            Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/user">
            My Questions
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="logout" onClick={handleLogOut}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export { Profileinsmall, Profileinlarge1 };
