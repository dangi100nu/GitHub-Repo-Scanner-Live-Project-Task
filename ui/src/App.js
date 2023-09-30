import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import RepositoryList from "./components/RepositoryList";
import RepositoryDetails from "./components/RepositoryDetails";
import MultiSelectRepo from "./components/MultiSelectRepo";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<RepositoryList />} />
          <Route path="/repodetails" element={<RepositoryDetails />} />
          <Route path="/multiselectrepo" element={<MultiSelectRepo />} />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
