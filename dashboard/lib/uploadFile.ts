import { v4 as uuid } from 'uuid';

export default async function uploadFile(
  file: File,
  path: string = 'cursos'
): Promise<string> {
  if (!file) {
    return '-';
  }
  const [firebase] = await Promise.all([
    import('firebase/app'),
    import('firebase/storage'),
  ]);
  if (firebase.apps.length <= 0) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_apiKey,
      authDomain: process.env.NEXT_PUBLIC_authDomain,
      databaseURL: process.env.NEXT_PUBLIC_databaseURL,
      projectId: process.env.NEXT_PUBLIC_projectId,
      storageBucket: process.env.NEXT_PUBLIC_storageBucket,
      messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
      appId: process.env.NEXT_PUBLIC_appId,
    });
  }
  if (file) {
    const ref = firebase
      .storage(firebase.app())
      .ref(`${path}/${uuid()}-${file.name}`);
    const url = await (await ref.put(file)).ref.getDownloadURL();
    return url as string;
  }
  throw new Error("Can't upload a not File object");
}
