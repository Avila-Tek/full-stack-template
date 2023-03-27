import { S3, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { TSignS3Input } from './s3.dto';

export async function signS3Service(body: TSignS3Input) {
  const bucketName = process?.env?.AWS_BUCKET_NAME ?? '';
  const s3 = new S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    endpoint: 'sfo3.digitaloceanspaces.com/prueba',
    region: process.env.AWS_REGION,
  });
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: body.filename,
    ContentType: body.filetype,
    ACL: 'public-read',
  });
  const oneHrInSec = 60 * 60;
  const signedRequest = await getSignedUrl(s3, command, {
    expiresIn: oneHrInSec,
  });
  const url = `https://avilatek.sfo3.digitaloceanspaces.com/prueba/${body.filename}`;
  return {
    signedRequest,
    url,
  };
}
