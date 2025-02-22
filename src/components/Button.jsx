import PropTypes from "prop-types";

const Button = ({ text }) => {
  return (
    <button
      type="submit"
      className="btn bg-default border-default text-white hover:bg-dark hover:border-dark"
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
};

export default Button;
