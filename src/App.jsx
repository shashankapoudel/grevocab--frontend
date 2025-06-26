
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import RegisterUser from "./pages/registerUser";
import LoginUser from "./pages/loginUser";
import WordContainer from "./pages/wordContainer";
import UnknownWords from "./pages/unknownWords";
import QuizSection from "./pages/quizSection";
import QuizStartPage from "./pages/quizStartPage";
import Wordsearch from "./pages/wordsearch";
import Pdfviewer from "./pages/pdfviewer";
import { useEffect, useState } from "react";
import ScoreTracker from "./pages/scoreTracker";
import ImproveVocab from "./pages/improveVocab";
import LeaderTable from "./pages/leaderTable";
import SearchWordonDifficulty from "./pages/searchWordonDifficulty";
import SearchWordOnUserDifficulty from "./pages/searchWordOnUserDifficulty";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";



function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (

    <div>
      {!["/login", "/register"].includes(location.pathname) && (
        <Header user={user} setUser={setUser} />
      )}

      <Routes>
        {/* Landing Page (root) */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />

        {/* Public Routes */}
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterUser />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginUser setUser={setUser} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute user={user}>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/wordcontainer"
          element={
            <PrivateRoute user={user}>
              <WordContainer />
            </PrivateRoute>
          }
        />

        <Route
          path="/unknown"
          element={
            <PrivateRoute user={user}>
              <UnknownWords />
            </PrivateRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <PrivateRoute user={user}>
              <QuizSection />
            </PrivateRoute>
          }
        />

        <Route
          path="/quizstart"
          element={
            <PrivateRoute user={user}>
              <QuizStartPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/wordsearch"
          element={
            <PrivateRoute user={user}>
              <Wordsearch />
            </PrivateRoute>
          }
        />

        <Route
          path="/viewpdf"
          element={
            <PrivateRoute user={user}>
              <Pdfviewer />
            </PrivateRoute>
          }
        />

        <Route
          path="/scoretracker"
          element={
            <PrivateRoute user={user}>
              <ScoreTracker />
            </PrivateRoute>
          }
        />

        <Route
          path="/improvevocab"
          element={
            <PrivateRoute user={user}>
              <ImproveVocab />
            </PrivateRoute>
          }
        />

        <Route
          path="/scoretracker/leadertable"
          element={
            <PrivateRoute user={user}>
              <LeaderTable />
            </PrivateRoute>
          }
        />

        <Route
          path="/wordcontainer/difficulty"
          element={
            <PrivateRoute user={user}>
              <SearchWordonDifficulty />
            </PrivateRoute>
          }
        />

        <Route
          path="/wordcontainer/users-difficulty"
          element={
            <PrivateRoute user={user}>
              <SearchWordOnUserDifficulty />
            </PrivateRoute>
          }
        />

        {/* Fallback for unknown routes */}
        <Route
          path="*"
          element={<h1 className="text-center mt-20 text-xl font-semibold">404 - Page Not Found</h1>}
        />
      </Routes>

    </div>

  );
}

export default App;

