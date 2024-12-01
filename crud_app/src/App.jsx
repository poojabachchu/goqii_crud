import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from "./createUser";
import ShowUsers from "./ShowUsers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

function App() {
    // Show the specific page for path specified there
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<ShowUsers apiBaseUrl={apiBaseUrl} />}
                    />
                    <Route
                        path="/create_user"
                        element={<CreateUser apiBaseUrl={apiBaseUrl} />}
                    />

                    <Route
                        path="/modify_user/:id"
                        element={<CreateUser apiBaseUrl={apiBaseUrl} />}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
