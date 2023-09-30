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
  }
  

  type Query {
    listRepositories(developerToken: String): [Repository]
    
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
          }));
          console.log(repositories);
          return repositories;
        } catch (error) {
          console.error("Error fetching repositories:", error);
          throw new Error("Failed to fetch repositories");
        }
      },
     
    },
  },
});

export default server;
