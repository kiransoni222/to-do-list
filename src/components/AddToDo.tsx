import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "@actions/todoActions";

const AddToDO = () => {
  const [addedItem, setAddedItem] = useState("");
  const dispatch = useDispatch();

  const addNewTodoItem = () => {
    if (addedItem.trim() !== "") {
      dispatch(addTodo({ id: Math.random(), text: addedItem, done: false }));
      setAddedItem("");
    }
  };

  return (
    <>
      <input
        className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={addedItem}
        onChange={(e) => setAddedItem(e.target.value)}
      />
      <button
        className="w-full bg-gray-400 font-bold py-2 px-4 rounded"
        onClick={addNewTodoItem}
      >
        Add
      </button>
    </>
  );
};

export default AddToDO;
