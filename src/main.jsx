import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ModalProvider from "@context/ModalProvider";
import SnackbarProvider from "@context/SnackbarProvider";
import { ThemeProvider } from "@mui/material";
import theme from "./configs/muiConfig";
import { Provider } from "react-redux";
import store from "@redux/store";
import routes from "@/routes/route";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ModalProvider>
    </ThemeProvider>
  </Provider>
);