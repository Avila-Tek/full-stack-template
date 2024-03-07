'use client';

import { useSession } from 'next-auth/react';

export default function UserInfo() {
  // const { data } = useSession();
  // if (data) {
  //   <div className="">
  //     UserInfo:
  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //   </div>;
  // }
  return <div>UserInfo: null</div>;
}
