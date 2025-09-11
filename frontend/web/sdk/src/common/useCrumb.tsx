import sdk from '@/core';

/**
 * 获取面包屑
 * @see https://reactrouter.com/6.30.1/hooks/use-matches
 */
const useCrumb = () => {
  let matches = sdk.client.matches;

  let crumbs = matches
    // @ts-ignore
    .filter((match) => Boolean(match.handle?.crumb))
    // @ts-ignore
    .map((match) => match.handle.crumb(match.data));

  return crumbs;
};

export { useCrumb };
