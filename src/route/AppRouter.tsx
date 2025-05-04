import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "../Pages/home/homepage";
import { ROUTES } from "../const/routes.const";
import NotFoundPage from "../Pages/not-found-page";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* homepage */}
        <Route path={ROUTES.ROOT.HOME} element={<Homepage />} />

        {/* not found routes */}
        <Route path={ROUTES.ROOT.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
