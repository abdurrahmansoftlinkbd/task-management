import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="navbar container w-11/12 mx-auto">
      <div className="navbar-start">
        <Link className="text-2xl font-semibold font-title text-default">
          Task Management
        </Link>
      </div>
      <div className="navbar-end gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="avatar btn btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              <img
                referrerPolicy="no-referrer"
                src={user?.photoURL}
                alt={user?.displayName}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a>{user?.displayName}</a>
            </li>
          </ul>
        </div>
        <a className="btn" onClick={logOut}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Navbar;
