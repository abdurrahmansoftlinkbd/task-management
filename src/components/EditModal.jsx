import PropTypes from "prop-types";

const EditModal = ({
  handleEditSubmit,
  currentTask,
  setCurrentTask,
  setIsEditingTask,
  isUpdating,
}) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold font-title text-default">
          Edit Task
        </h3>
        <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
          <div className="form-control">
            <label className="label font-medium">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={currentTask?.title}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-medium">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={currentTask?.description}
              onChange={(e) =>
                setCurrentTask({
                  ...currentTask,
                  description: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-medium">Category</label>
            <select
              className="select select-bordered w-full"
              value={currentTask?.category}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, category: e.target.value })
              }
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <div className="modal-action flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-outline btn-error hover:text-white"
              onClick={() => {
                setIsEditingTask(false);
                setCurrentTask(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-default border-default text-white hover:bg-dark hover:border-dark"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      {/* Click outside to close */}
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            setIsEditingTask(false);
            setCurrentTask(null);
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );
};

EditModal.propTypes = {
  handleEditSubmit: PropTypes.func,
  currentTask: PropTypes.object,
  setCurrentTask: PropTypes.func,
  setIsEditingTask: PropTypes.func,
  isUpdating: PropTypes.bool,
};

export default EditModal;
