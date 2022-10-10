import aws from 'aws-sdk';
import { TSignS3Input } from './s3.dto';

export async function signS3Service(body: TSignS3Input) {
  const bucketName = process?.env?.AWS_BUCKET_NAME ?? '';
  const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com/prueba');
  const s3Params = {
    Bucket: bucketName,
    Key: body?.filename,
    Expires: 60 * 5,
    ContentType: body.filetype,
    ACL: 'public-read',
  };
  const s3 = new aws.S3({
    apiVersion: '2021-07-26',
    endpoint: spacesEndpoint,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  const signedRequest = s3.getSignedUrl('putObject', s3Params);
  const url = `https://avilatek.sfo3.digitaloceanspaces.com/prueba/${body.filename}`;
  return {
    signedRequest,
    url,
  };
}
