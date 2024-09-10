import useRoutesCustom from "./hooks/useRoutesCustom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
export const NotificationContext = React.createContext();
function App() {
  const handleNotification = (content,type) => {
    return toast[type](content, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      // closeOnClick: true,
      pauseOnHover: true,
      // progress: undefined,
      // theme: "light",
      // transition: Bounce,
    });
  };

  const routes = useRoutesCustom();
  return (
    <NotificationContext.Provider value={{ handleNotification }}>
      {routes}
      <ToastContainer />
    </NotificationContext.Provider>
  );
}

export default App;
