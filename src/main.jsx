
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./routes/Router";
import { Provider } from "react-redux";
import store from "./store";
import { LocationProvider } from './context/LocationContext';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <LocationProvider>
    <Provider store={store}>
      <Toaster position="top-center"
        toastOptions={{
          duration: 3000,
        }} />
      <App />
    </Provider>
  </LocationProvider>
);
