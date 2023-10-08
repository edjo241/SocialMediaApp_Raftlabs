import {gql} from '@apollo/client';

export const IMAGE_UPLOAD=  gql`

scalar Upload

mutation uploadImage(
    $image:Upload!
    $caption:String!
    $username:String!
)   {
    uploadImage(
        image:$image
        caption:$caption
        username:$username
    )   {
        username
        caption
    }
    
}

`
export const COMMENT_UPLOAD=gql`
  mutation($text: String!, $username: String!, $postId: String!) {
  uploadComment(text: $text, username: $username, postId: $postId) 
    
  
}
`