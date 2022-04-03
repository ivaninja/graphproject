import { createModule, gql } from "graphql-modules"
import { prismaClient } from "../prisma"

export const fileModule = createModule({
  id: "file-module",
  dirname: __dirname,
  typeDefs: [
    gql`
      type File implements FileNode {
        id: ID!
        name: String!
        createdAt: String!
        updatedAtAt: String!
        directoryId: String!
        versions: [FileVersion]!
      }
      extend type Query {
        getAllFiles: [File]!
      }
    `,
  ],
  resolvers: {
    Query: {
      getAllFiles: () => {
        return prismaClient().file.findMany()
      },
    },
  },
})
