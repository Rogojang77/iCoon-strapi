export const useStrapiAsyncDataFirst = (cacheKey: string, fn: () => any) => {
    return useAsyncData(
    cacheKey,
    () => new Promise((resolve, reject) => {
       fn()
         .then((res: any) => resolve(res.data?.[0] || {}))
         .catch((error: any) => reject(error));
    })
  );
}