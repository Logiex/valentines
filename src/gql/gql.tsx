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
    $FriendOnly: Boolean
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
        friendOnly: $FriendOnly
      }
    ) {
      _id
      email
    }
  }
`;

export const MYMATCHESQUERY = gql`
  query MyQuery {
    valentineMatches {
      matchType
      round
      score
      valentines {
        _id
        discord
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
  }
`;
