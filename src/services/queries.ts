import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation registerUser($name: String!, $email: String!, $phoneNumber: String!, $stream: ID!, $courseLevel: ID!) {
    registerUser(
      input: {
        name: $name
        email: $email
        phone_number: $phoneNumber
        stream: $stream
        courseLevel: $courseLevel
      }
    ) {
      status
      message
    }
  }
`;


export const sendOTP = gql`
    query GenerateOTP($phoneNumber: String!, $isResend: Boolean!) {
        generateOTP(
            input: {phone_number: $phoneNumber, isResend_otp: $isResend}) {
                data {
                    response
                }
            }
    }
`;


export const verifyOtpQuery = gql`
    query VerifyOTP($phoneNumber: String!, $userOtp: String!) {
        verifyOTP(input: {phone_number: $phoneNumber, otp: $userOtp}) {
            data {
                id
                attributes {
                    name
                    username
                    email
                    phone_number
                    roles
                    permissions
                    token
                }
            }
        }
    }
`;