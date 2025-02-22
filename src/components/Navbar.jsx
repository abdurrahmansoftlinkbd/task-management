import { Menu, X } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PropTypes from "prop-types";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <button
          className="btn btn-ghost lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="flex-none gap-4">
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
            <li onClick={logOut}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  setIsSidebarOpen: PropTypes.func,
};

export default Navbar;
