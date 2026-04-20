import { NavLink, Routes, Route } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  return (
    <div className="container py-4 App">
      <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <img
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="OctoFit app logo"
              className="app-logo me-2"
            />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofitNav"
            aria-controls="octofitNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofitNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/workouts">
                  Workouts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h1 className="h3 card-title">Welcome to OctoFit Tracker</h1>
                <p className="card-text text-muted">
                  Use the navigation menu to explore activities, workouts, teams, users, and the leaderboard.
                </p>
                <NavLink className="btn btn-primary" to="/activities">
                  Browse Activities
                </NavLink>
              </div>
            </div>
          }
        />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
