import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_REPOSITORIES = gql`
  query ListRepositories($developerToken: String!) {
    listRepositories(developerToken: $developerToken) {
      id
      name
      size
      visibility
      forks_count
      language
      owner {
        login
      }
    }
  }
`;
function RepositoryList() {
  const navigate = useNavigate();
  const [developerToken, setDeveloperToken] = useState("");
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedRepositories, setSelectedRepositories] = useState([]);

  const handleCheckboxClick = (repo) => {
    if (selectedRepositories.some((selectedRepo) => selectedRepo.id === repo.id)) {
      setSelectedRepositories(selectedRepositories.filter((selectedRepo) => selectedRepo.id !== repo.id));
    } else {
      setSelectedRepositories([...selectedRepositories, repo]);
    }
  };

  const handleMultipeRepos = () => {
    if (selectedRepositories.length > 0) {
      navigate("/multiselectrepo", { state: { selectedRepositories } });
    }
  };

  const [fetchRepositories, { loading, error, data }] =
    useLazyQuery(GET_REPOSITORIES);

  const handleTokenChange = (e) => {
    setDeveloperToken(e.target.value);
  };

  const handleDetailsButtonClick = (repo) => {
    navigate("/repodetails", { state: { repo } });
  };
  const handleSubmit = () => {
    fetchRepositories({ variables: { developerToken } });
  };
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center fw-semibold fs-5 vh-100">
        <p>please wait scanning repos...</p>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>

      <h4 className="text-center bg-primary p-3 text-white">
       welcome to GitHub repository scanner system 
      </h4>
      <div className="container-fluid mt-4 d-flex justify-content-center">
        <div className="card border-2 border-secondary col-lg-4 col-md-6 col-12">
          <div className="card-header">
            <h4 className="card-title text-center">
              GitHub Repository Scanner
            </h4>
          </div>
          <div className="card-body">
            <div className="form-group mt-2">
              <label htmlFor="developerToken" className="fw-semibold">
                Access Token:
              </label>
              <input
                type="text"
                id="developerToken"
                className="form-control mt-1 border border-2"
                placeholder="Enter GitHub Token"
                value={developerToken}
                onChange={handleTokenChange}
              />
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Fetch Repositories
              </button>
            </div>
          </div>
        </div>
      </div>
      {data && data.listRepositories.length > 0 && (
        <div>
          <h2 className="text-center mt-5">GitHub Repositories</h2>
          <div className="text-end me-5 mt-4">
            <button
              className="btn btn-primary"
              onClick={() => setShowCheckboxes(!showCheckboxes)}
            >
              {showCheckboxes
                ? `Select(${selectedRepositories.length})`
                : "Scan multiple repos"}
            </button>
            {(selectedRepositories.length === 1 ||
              selectedRepositories.length === 2) && (
              <button
                className="btn btn-primary ms-2"
                onClick={handleMultipeRepos}
              >
                Click to proceed 
              </button>
            )}
          </div>
          <div className="pt-4 table-responsive">
            <table className="table align-middle ">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Owner</th>
                  <th>repo detail</th>
                </tr>
              </thead>
              <tbody>
                {data.listRepositories.map((repo) => (
                  <tr key={repo.name}>
                    <td>
                      {showCheckboxes && (
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxClick(repo)}
                          checked={selectedRepositories.some(
                            (selectedRepo) => selectedRepo.id === repo.id
                          )}
                          disabled={
                            selectedRepositories.length >= 2 &&
                            !selectedRepositories.includes(repo.id)
                          }
                          
                          
                        />
                      )}
                    </td>
                    <td>{repo.name}</td>
                    <td>{repo.size}kb</td>
                    <td>{repo.owner.login}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDetailsButtonClick(repo)}
                      >
                        Fetch all details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default RepositoryList;
