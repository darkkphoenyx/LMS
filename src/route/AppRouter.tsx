import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "../pages/home/homepage";
import { ROUTES } from "../const/routes.const";
import NotFoundPage from "../pages/not-found-page";
import Layout from "../layout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* homepage */}
        <Route element={<Layout />}>
          <Route path={ROUTES.ROOT.HOME} element={<Homepage />} />
        </Route>

        {/* not found routes */}
        <Route path={ROUTES.ROOT.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
