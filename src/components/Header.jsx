import { Plus } from "lucide-react";
import PropTypes from "prop-types";

const Header = ({ setIsAddingTask }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-semibold font-title">My Tasks</h2>
      </div>
      <button
        className="btn bg-default border-default text-white hover:bg-dark hover:border-dark font-title"
        onClick={() => setIsAddingTask(true)}
      >
        <Plus size={20} />
        Add New Task
      </button>
    </header>
  );
};

Header.propTypes = {
  setIsAddingTask: PropTypes.func,
};

export default Header;
