import React from "react";
import { useLocation } from "react-router-dom";

const RepositoryDetails = () => {
  const { state } = useLocation();
  const repository = state.repo;
  return (
    <div className="bg-dark pb-4 vh-100">
      <h4 className="text-center bg-primary p-3 text-white">
        Here is the all the details of the repository with id {repository.id}
      </h4>
      <div className="container mt-4 d-flex justify-content-center align-items-center">
        <div className="card col-lg-6 col-12 mt-3">
          <div className="card-header">
            <h4 className="card-title text-center">Repository Details</h4>
          </div>
          <div className="card-body">
            <table class="table text-center">
              <tbody>
                <tr>
                  <th scope="row">ID</th>
                  <td>{repository.id}</td>
                </tr>
                <tr>
                  <th scope="row">Name</th>
                  <td>{repository.name}</td>
                </tr>
                <tr>
                  <th scope="row">Size</th>
                  <td colspan="2">{repository.size}</td>
                </tr>
                <tr>
                  <th scope="row">Owner</th>
                  <td colspan="2">{repository.owner.login}</td>
                </tr>
                <tr>
                  <th scope="row">Visibility</th>
                  <td colspan="2">{repository.visibility}</td>
                </tr>
                <tr>
                  <th scope="row">Forks Count</th>
                  <td colspan="2">{repository.forks_count}</td>
                </tr>
                <tr>
                  <th scope="row">Language</th>
                  <td colspan="2">{repository.language}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetails;
