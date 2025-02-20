import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, setUser, updateUserProfile, handleGoogleSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photourl = form.photourl.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({
          displayName: name,
          photoURL: photourl,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            toast.error(`Unable to update profile. ${error}`);
          });
        toast.success("Welcome to RecoHub");
      })
      .catch((error) => toast.error(`${error.code}`));
    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Create your account</h2>
            <p className="text-sm text-base-content/60 mt-2">
              Join us to get started with your journey
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email address</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
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
                placeholder="Create a password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Create Account
              </button>
            </div>

            <div className="divider text-base-content/60">or continue with</div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full"
            >
              <FcGoogle className="text-xl mr-2" />
              Google
            </button>

            <p className="text-center text-base-content/70 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
