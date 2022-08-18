import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import { createContext, useContext, useEffect, useState } from "react";
import Carousel from "./Components/Carousel";
const Context = createContext();
function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState("");
  const [users, setUsers] = useState({});
  const [id, setId] = useState(1);
  useEffect(() => {
    console.log(JSON.stringify(users, null, 2));
  }, [users]);
  return (
    <div className="App">
      <Context.Provider
        value={{ cart, setCart, user, setUser, users, setUsers, id, setId }}
      >
        <Navbar />
        <Carousel />
        <Products />
      </Context.Provider>
    </div>
  );
}

export default App;
export function CartState() {
  return useContext(Context);
}
