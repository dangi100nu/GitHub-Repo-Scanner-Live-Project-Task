import { ApolloServer } from "@apollo/server";
import axios from "axios";

const server = new ApolloServer({
  typeDefs: `
  type Owner {
    login: String
  }

  type Repository {
    id: Int
    name: String
    size: Int
    owner: Owner
    visibility: String
    language : String
    forks_count: Int
    branch: String
  }

  type Repositorydetail{
    sha: String
  }
  

  type Query {
    listRepositories(developerToken: String): [Repository]
    RepositoriesDetails(developerToken: String owners: String repo: String branch: String): [Repositorydetail]
  }
`,
  resolvers: {
    Query: {
      listRepositories: async (_, { developerToken }) => {
        try {
          const response = await axios.get(
            "https://api.github.com/user/repos",
            {
              headers: {
                Authorization: `Bearer ${developerToken}`,
              },
            }
          );
          const repositories = response.data.map((repo) => ({
            id: repo.id,
            name: repo.name,
            size: repo.size,
            owner: {
              login: repo.owner.login,
            },
            visibility: repo.visibility,
            forks_count: repo.forks_count,
            language: repo.language,
            branch: repo.default_branch,
          }));
          console.log(repositories);
          return repositories;
        } catch (error) {
          console.error("Error fetching repositories:", error);
          throw new Error("Failed to fetch repositories");
        }
      },
      RepositoriesDetails: async (_, {developerToken, owners, repo, branch }) => {
        try {
          const response = await axios.get(
            `https://api.github.com/repos/${owners}/${repo}/git/trees/${branch}`,
            {
              headers: {
                Authorization: `Bearer ${developerToken}`,
              },
            }
          );
          const RepositoriesDetail = response.data.tree.map((repo) => ({
            sha: repo.path,
            
          }));
          console.log(RepositoriesDetail);
          return RepositoriesDetail;
        } catch (error) {
          console.error("Error fetching repositories:", error);
          throw new Error("Failed to fetch repositories");
        }
      },
    },
  },
});

export default server;
