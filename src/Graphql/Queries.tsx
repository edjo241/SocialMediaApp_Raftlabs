import { useQuery ,gql} from '@apollo/client';

export const GET_USERS=gql`
query {
  getAllUsers {
    displayName
    email
    uid
  }
}

`
export const FETCH_POSTS=gql`
  query {
    fetchPosts{
      caption
      imageUrl
      timestamp
      username
      id
    }
  }
`

export const FETCH_COMMENTS=gql`
query($input: GetDataInput!) {
  fetchComment(input: $input) {
    text
  }
}
`