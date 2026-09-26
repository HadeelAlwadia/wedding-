import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            direction: "rtl",
            fontFamily: "inherit",
            borderRadius: "14px",
            padding: "12px 18px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
};

export default App;