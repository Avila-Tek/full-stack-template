import { schemaComposer } from 'graphql-compose';
import { S3Payload, SignS3Input, TSignS3Input } from './s3.dto';
import * as s3Service from './s3.service';

export const signS3 = schemaComposer.createResolver<
  any,
  {
    data: TSignS3Input;
  }
>({
  name: 'signS3',
  kind: 'mutation',
  description: '...',
  type: S3Payload,
  args: {
    data: SignS3Input,
  },
  async resolve({ args }) {
    const { signedRequest, url } = await s3Service.signS3Service(args?.data);
    return {
      signedRequest,
      url,
    };
  },
});

export const s3Mutations = {
  signS3,
};
