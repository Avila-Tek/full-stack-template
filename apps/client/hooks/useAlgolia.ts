import React from 'react';
import algoliasearch from 'algoliasearch/lite';

export function useAlgolia() {
  const searchClient = React.useMemo(
    () =>
      algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_KEY
      ),
    []
  );
  return searchClient;
}
