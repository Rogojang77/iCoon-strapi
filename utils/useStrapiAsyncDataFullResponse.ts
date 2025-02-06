export const useStrapiAsyncDataFullResponse = (cacheKey: string, fn: () => any) => {
    return useAsyncData(
      cacheKey,
      () =>
        new Promise((resolve, reject) => {
          fn()
            .then((res: any) => resolve(res || {}))
            .catch((error: any) => reject(error));
        })
    );
}