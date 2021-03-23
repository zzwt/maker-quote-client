import { gql } from '@apollo/client';
export const AuthorWithQuotes = gql`
  query getAuthor($id: ID!) {
    author(id: $id) {
      name
      title
      desc
      pic {
        url
      }
      quotes {
        id
        content
        author {
          name
          title
          pic {
            url
          }
        }
        tags {
          id
          name
          color
        }
      }
    }
  }
`;

export const SearchAuthorName = gql`
  query getAuthor($name: String!) {
    authors(where: { name_contains: $name }, limit: 10, sort: "name") {
      name
    }
  }
`;

export const SearchAuthorNameByAll = gql`
  query getAuthorByAll($name: String!) {
    authors(where: { name_contains: $name }) {
      id
      name
      title
      pic {
        url
      }
      quotes {
        content
      }
    }
  }
`;
