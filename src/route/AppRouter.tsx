import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "../pages/home/homepage";
import { ROUTES } from "../const/routes.const";
import NotFoundPage from "../pages/not-found-page";
import Layout from "../layout";
import AboutPage from "../pages/about/about";
import ContactPage from "../pages/contact/contact";
import BooksPage from "../pages/book/BooksPage";
import BookDetails from "../pages/bookdetails/BookDetails";
import { AdminLayout } from "../components/AdminLayout";
import { Dashboard } from "../pages/admin/Dashboard";
import { Books } from "../pages/admin/Books";
import { Users } from "../pages/admin/Users";
import { Borrowings } from "../pages/admin/Borrowings";
import { Fines } from "../pages/admin/Fines";
import { Reports } from "../pages/admin/Reports";
import { Settings } from "../pages/admin/Settings";
import Notifications from "../pages/admin/Notifications";
import Reservations from "../pages/admin/Reservations";
import { SearchPage } from "../pages/admin/Search";
import { Profile } from "../pages/admin/Profile";
import { Login } from "../pages/Login";
import AdminRoutes from "./wrapper/admin-route-wrapper";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* login route */}
        <Route path={ROUTES.ROOT.LOGIN} element={<Login />} />

        {/* homepage */}
        <Route element={<Layout />}>
          <Route path={ROUTES.ROOT.HOME} element={<Homepage />} />
          <Route path={ROUTES.USER.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.USER.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.USER.BOOK} element={<BooksPage />} />
          <Route path={ROUTES.USER.BOOKDETAILS} element={<BookDetails />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminRoutes />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.ADMIN.BOOKS} element={<Books />} />
            <Route path={ROUTES.ADMIN.USERS} element={<Users />} />
            <Route path={ROUTES.ADMIN.BORROWING} element={<Borrowings />} />
            <Route path={ROUTES.ADMIN.FINES} element={<Fines />} />
            <Route path={ROUTES.ADMIN.REPORTS} element={<Reports />} />
            <Route path={ROUTES.ADMIN.SETTINGS} element={<Settings />} />
            <Route
              path={ROUTES.ADMIN.NOTIFICATION}
              element={<Notifications />}
            />
            <Route path={ROUTES.ADMIN.RESERVATION} element={<Reservations />} />
            <Route path={ROUTES.ADMIN.SEARCH} element={<SearchPage />} />
            <Route path={ROUTES.ADMIN.PROFILES} element={<Profile />} />
          </Route>
        </Route>

        {/* not found routes */}
        <Route path={ROUTES.ROOT.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
