export const useStrapiAsyncData = (cacheKey: string, fn: () => any, returnFullResponse?: boolean) => {
    return useAsyncData(
      cacheKey,
      () =>
        new Promise((resolve, reject) => {
          fn()
            .then((res: any) => resolve(returnFullResponse ? res : res?.data))
            .catch((error: any) => reject(error));
        })
    );
}