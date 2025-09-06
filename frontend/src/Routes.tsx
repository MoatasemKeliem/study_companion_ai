import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPage from "./pages/MyPage";
import Admin from "./pages/Admin/Admin";
import AdminSummaries from "./pages/Admin/AdminSummaries";
import AdminFlashcards from "./pages/Admin/AdminFlashcards";
import AdminQuestions from "./pages/Admin/AdminQuestions";
import GenerateFlashcard from "./pages/GenerateFlashcard";
import GenerateSummary from "./pages/GenerateSummary";
import GenerateQuestions from "./pages/GenerateQuestions";
import MyFlashcards from "./pages/MyFlashcards";
import MySummaries from "./pages/MySummaries";
import MyQuestions from "./pages/MyQuestions";
import SingleSummary from "./pages/SingleSummary";
import SingleFlashcard from "./pages/SingleFlashcard";
import SingleQuestion from "./pages/SingleQuestion";
import Home from "./pages/Home";
import ProtectedRoute from "./component/ProtectedRoute";

const ADMIN = "ADMIN";

export const routes = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        }, {
            path: "/home",
            element: <Home />,
        }, {
            path: "/myPage",
            element: <ProtectedRoute><MyPage /></ProtectedRoute>,
        },
        {
            path: "/admin",
            element: <ProtectedRoute requiredRole={ADMIN}><Admin /></ProtectedRoute>,
        },
        {
            path: "/admin/adminSummary",
            element: <ProtectedRoute requiredRole={ADMIN}><AdminSummaries /></ProtectedRoute>,
        },
        {
            path: "/admin/adminFlashcards",
            element: <ProtectedRoute requiredRole={ADMIN}><AdminFlashcards /></ProtectedRoute>,
        },
        {
            path: "/admin/adminQuestions",
            element: <ProtectedRoute requiredRole={ADMIN}><AdminQuestions /></ProtectedRoute>,
        }, {
            path: "/Generate/generateSummary",
            element: <ProtectedRoute><GenerateSummary /></ProtectedRoute>,
        }, {
            path: "/Generate/generateFlashcard",
            element: <ProtectedRoute><GenerateFlashcard /></ProtectedRoute>,
        }, {
            path: "/Generate/generateQuestion",
            element: <ProtectedRoute><GenerateQuestions /></ProtectedRoute>,
        }, {
            path: "/myFlashcards",
            element: <ProtectedRoute><MyFlashcards /></ProtectedRoute>,
        }, {
            path: "/mySummaries",
            element: <ProtectedRoute><MySummaries /></ProtectedRoute>,
        }, {
            path: "/myQuestions",
            element: <ProtectedRoute><MyQuestions /></ProtectedRoute>,
        }, {
            path: "/singleSummary/:id",
            element: <ProtectedRoute><SingleSummary /></ProtectedRoute>,
        }, {
            path: "/singleFlashcard/:id",
            element: <ProtectedRoute><SingleFlashcard /></ProtectedRoute>,
        }, {
            path: "/singleQuestion/:id",
            element: <ProtectedRoute><SingleQuestion /></ProtectedRoute>,
        }, {
            path: "/unAuthorized",
            element: <SingleQuestion />,
        },

    ]
}])