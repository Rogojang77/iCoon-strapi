

export const useStrapiImage = (url: string) => {
    if (url?.startsWith("/")) {
        const media = useStrapiMedia();
        
        return media + url;
    }

    return url
}