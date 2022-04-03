import { createModule, gql } from "graphql-modules"
import { prismaClient } from "../prisma"

export const fileVersionModule = createModule({
  id: "fileVersion-module",
  dirname: __dirname,
  typeDefs: [
    gql`
      type FileVersion implements FileNode {
        id: ID!
        name: String!
        createdAt: String!
        updatedAtAt: String!
        fileId: String!
        mimeType: String!
        size: Int!
      }
      extend type Query {
        getAllFileVersions: [FileVersion]!
      }
    `,
  ],
  resolvers: {
    Query: {
      getAllFileVersions: () => {
        return prismaClient().fileVersion.findMany()
      },
    },
  },
})
