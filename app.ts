// eslint-disable-next-line
require("dotenv").config()
import { graphqlHTTP } from "express-graphql"
import { createApplication, createModule, gql } from "graphql-modules"
import express from "express"
import { Directory, FileVersion, File } from "@prisma/client"
import { directoryModule } from "./directory"
import { fileModule } from "./file"
import { fileVersionModule } from "./fileVersion"

const mainModule = createModule({
  id: "main-module",
  dirname: __dirname,
  typeDefs: [
    gql`
    interface FileNode {
      id: ID!
      name: String!
      createdAt: String!
      updatedAtAt: String!
    }
    type Query {
      searchFiles(query:String!): [FileNode]
    }
    `,
  ],
  resolvers: {
    FileNode: {
      __resolveType(obj: File | FileVersion | Directory) {
        if (Object.prototype.hasOwnProperty.call(obj, "parentId"))
          return "Directory"
        if (Object.prototype.hasOwnProperty.call(obj, "directoryId"))
          return "File"
        if (Object.prototype.hasOwnProperty.call(obj, "fileId"))
          return "FileVersion"
      },
    },
    Query: () => [],
  },
})

const api = createApplication({
  modules: [mainModule, directoryModule, fileModule, fileVersionModule],
})
const app = express()
const port = 3000

app.use("/graphql", (req, res, next) => {
  graphqlHTTP({
    schema: api.schema,
    customExecuteFn: api.createExecution(),
    graphiql: process.env.NODE_ENV === "development",
  })(req, res).catch(next)
})

app.listen(port, () => {
  console.log(`Application running on port ${port}.`)
})
