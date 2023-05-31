import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      success
      message
    }
}
`;

export const RESEND_CODE = gql`
mutation resendCode($resendInput: ResendInput!) {
  resendCode(resendInput: $resendInput) {
    success
    message
  }
}
`;

export const VERIFY_PHONE = gql`
mutation verify($verifyInput: VerifyInput!) {
  verify(verifyInput: $verifyInput) {
    success
    message
  }
}
`;

export const GET_USER = gql`
query getUsers {
  getUsers
}
`