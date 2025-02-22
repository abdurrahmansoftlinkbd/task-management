import PropTypes from "prop-types";

const CloseOut = ({ setIsAddingTask }) => {
  return (
    <form method="dialog" className="modal-backdrop">
      <button
        onClick={() => {
          setIsAddingTask(false);
        }}
      >
        close
      </button>
    </form>
  );
};

CloseOut.propTypes = {
  setIsAddingTask: PropTypes.func,
};

export default CloseOut;
