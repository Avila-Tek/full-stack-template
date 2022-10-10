export const SignS3Input = `
input SignS3Input {
  filename: String!
  filetype: String!
}
`;

export type TSignS3Input = {
  filename: string;
  filetype: string;
};

export const S3Payload = `
  type S3Payload {
    signedRequest: String!
    url: String!
  }
`;
