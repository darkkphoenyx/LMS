import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "../pages/home/homepage";
import { ROUTES } from "../const/routes.const";
import NotFoundPage from "../pages/not-found-page";
import Layout from "../layout";
import About from "../pages/home/about";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* homepage */}
        <Route element={<Layout />}>
          <Route path={ROUTES.ROOT.HOME} element={<Homepage />} />
          <Route path={ROUTES.USER.ABOUT} element={<About />} />
        </Route>

        {/* not found routes */}
        <Route path={ROUTES.ROOT.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
