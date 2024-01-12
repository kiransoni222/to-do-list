import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import todoReducer from "@reducers/todoReducer";
import ToDo from "./components/ToDo";
import "./App.css";

const store = createStore(todoReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="max-w-lg w-full mx-auto my-0 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">To Do List</div>
          <p className="text-gray-700 text-base">What needs to be done?</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <ToDo />
        </div>
      </div>
    </Provider>
  );
}

export default App;
