import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CardioWarmups from "./pages/CardioWarmups";
import StretchingWarmups from "./pages/StretchingWarmups";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardio-warmups" element={<CardioWarmups />} />
          <Route path="/stretching-warmups" element={<StretchingWarmups />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
