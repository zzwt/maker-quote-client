import { gql } from '@apollo/client';
export const TagsWithCount = gql`
  query {
    tagsWithCount {
      id
      name
      count
      color
    }
  }
`;

export const GetQuotes = gql`
  query getQuotes($filter: JSON, $limit: Int!, $start: Int!) {
    quotes(where: $filter, limit: $limit, start: $start) {
      id
      content
      tags {
        id
        name
        color
      }
      author {
        id
        name
        title
        pic {
          url
        }
      }
    }
    quotesCount(where: $filter)
  }
`;

// export const GetQutoesByTag = gql`
//   query getQuotesByTag($tagId: ID!) {
//     quotes(where: { tags_in: $tagId }) {
//       id
//       content
//       tags {
//         name
//         color
//       }
//       author {
//         id
//         name
//         title
//         pic {
//           url
//         }
//       }
//     }
//   }
// `;

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

export const GetAutoSuggestionNames = gql`
  query getAutoSuggestionNames($name: String!) {
    authors(where: { name_contains: $name }, limit: 10, sort: "name") {
      name
    }
  }
`;

export const SearchAllAuthorsByName = gql`
  query searchAllAuthorsByName(
    $filter: JSON!
    $limit: Int!
    $start: Int!
    $sort: String!
  ) {
    authors(where: $filter, limit: $limit, start: $start, sort: $sort) {
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
    authorsCount(where: $filter)
  }
`;
