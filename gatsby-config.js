require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "AWSAppSync",
        fieldName: "posts",
        url: `${process.env.AWS_APPSYNC_API_URL}`,
        headers: {
            "x-api-key": `${process.env.AWS_APPSYNC_API_KEY}`,
        },
        refetchInterval: 60,
      },
    },
  ]
}