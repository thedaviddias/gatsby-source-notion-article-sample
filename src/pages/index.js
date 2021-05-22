import * as React from "react"
import { graphql } from "gatsby"

const Article = ({ node }) => {
  const date = new Date(node.createdAt).toLocaleString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );

  return (
  <article>
    <span>{node.category.name}</span>
    <h1>{node.title}</h1>

    <p>By <img loading="lazy" src={node.author[0].avatar_url} alt={node.author[0].name} width="50" height="50" /> {node.author[0].name}</p>

    <p>{date}</p>
    <img loading="lazy" src={node.featured_img.url} alt={node.featured_img.alt} />
    <div dangerouslySetInnerHTML={{__html: node.body}} />
  </article>
  )
}

const IndexPage = ({ data }) => {
  const allNotionArticles = data.notionArticles.edges

  return (
    <main>
      {allNotionArticles.length ? allNotionArticles?.map(({ node }) => (
        <Article node={node} key={node.id} />
      )) : <p>No articles</p>}
    </main>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    notionArticles: allNotionArticle(filter: {published: {eq: true}}) {
      edges{
        node {
          body
          title
          id
          createdAt
          category {
            name
          }
          author {
            avatar_url
            name
          }
          tags {
            name
            id
          }
          featured_img {
            alt
            url
          }
        }
      }
    }
  }
`
