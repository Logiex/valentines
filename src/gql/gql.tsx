import { gql } from "@apollo/client";

export const MYVALENTINEPROFILEQUERY = gql`
  query MyQuery {
    myValentineProfile {
      _id
      discord
      email
      gender
      instagram
      name
      wants
      interests {
        name
        score
      }
    }
  }
`;

export const CREATEVALENTINEPROFILE = gql`
  mutation MyMutation(
    $Name: String!
    $Gender: Gender!
    $Wants: Gender!
    $Email: String!
    $Interests: [GQLInterestInput!]!
    $Instagram: String!
    $Discord: String!
  ) {
    createValentineProfile(
      input: {
        name: $Name
        gender: $Gender
        wants: $Wants
        email: $Email
        interests: $Interests
        discord: $Discord
        instagram: $Instagram
      }
    ) {
      _id
      email
    }
  }
`;
