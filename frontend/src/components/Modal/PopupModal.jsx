import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function PopupModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg p-8">
        <button onClick={onClose} className="block ml-auto">
          <IoCloseOutline className="text-3xl" />
        </button>

        <p>{message}</p>
        <div className="flex gap-4">
          <Link
            to={"/meetings"}
            className="mt-4 px-4 py-2 mx-auto bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            View meetings
          </Link>
          <Link
            to={"/meetings/create"}
            className="mt-4 px-4 py-2 mx-auto bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            Create meeting
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PopupModal;
