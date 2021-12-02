import { gql } from '@apollo/client'


export const GET_ERROR = gql`
  query getError {
    error @client
  }
`
