const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby with Notion Article`,
  },
  plugins: [
    {
      resolve: `gatsby-source-notion-article`,
      options: {
        token: process.env.NOTION_KEY, // required
        databaseId: process.env.NOTION_DATABASE_ID, // required
      }
    },
  ],
}
