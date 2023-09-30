import React from "react";
import { useLocation } from "react-router-dom";

const MultiSelectRepo = () => {
  const location = useLocation();
  const { selectedRepositories } = location.state || {};
  return (
    <>
      <div className="bg-dark pb-4">
        <h4 className="text-center bg-primary p-3 text-white">
          Selected Repositories
        </h4>
        <ul>
          {selectedRepositories &&
            selectedRepositories.map((repo) => (
              <div className="container d-flex justify-content-center align-items-center mt-4" key={repo.id}>
                <div className="card col-lg-6 col-12 mt-3">
                  <div className="card-header">
                    <h4 className="card-title text-center">
                      Repository Details
                    </h4>
                  </div>
                  <div className="card-body">
                    <table class="table text-center">
                      <tbody>
                        <tr>
                          <th scope="row">ID</th>
                          <td>{repo.id}</td>
                        </tr>
                        <tr>
                          <th scope="row">Name</th>
                          <td>{repo.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Size</th>
                          <td colspan="2">{repo.size}</td>
                        </tr>
                        <tr>
                          <th scope="row">Owner</th>
                          <td colspan="2">{repo.owner.login}</td>
                        </tr>
                        <tr>
                          <th scope="row">Visibility</th>
                          <td colspan="2">{repo.visibility}</td>
                        </tr>
                        <tr>
                          <th scope="row">Forks Count</th>
                          <td colspan="2">{repo.forks_count}</td>
                        </tr>
                        <tr>
                          <th scope="row">Language</th>
                          <td colspan="2">{repo.language}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
        </ul>
      </div>
      {/* <h4 className="text-center bg-primary p-3 text-white">
        multiple Repositories data 
      </h4>
       */}
    </>
  );
};

export default MultiSelectRepo;
