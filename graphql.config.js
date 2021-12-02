module.exports = {
    projects: {
      db: {
        schema: "packages/back/schema.graphql",
        extensions: {
          endpoints: {
            default: {
              url: "http://localhost:7000",
            },
          },
        },
      },
    },
  }