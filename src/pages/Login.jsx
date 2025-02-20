import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { userLogin, setUser, handleGoogleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        form.reset();
        navigate(location?.state ? location.state : "/");
        toast.success("Welcome back!");
      })
      .catch((error) => {
        toast.error(`${error.code}`);
      });
  };

  return (
    <div className="hero my-24 font-inter">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="uppercase text-center font-semibold text-3xl font-montserrat">
            Welcome Back
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-default text-white hover:bg-light hover:border-light ">
              Login
            </button>
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSignIn}
              className=" btn bg-base-200 hover:bg-base-100"
            >
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </button>
            <p className="text-sm text-center mt-3">
              Don’t have an account?{" "}
              <Link
                className="text-default font-bold hover:underline"
                to="/register"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
