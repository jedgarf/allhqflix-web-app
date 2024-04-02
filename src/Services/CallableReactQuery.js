import { useQueryClient } from 'react-query';
import { anime_downloads } from "./AnimeService";


const useCustomQuery = () => {
    const queryClient = useQueryClient();
  
    const getAnimeDownloads = async (url) => {
      await queryClient.fetchQuery(['anime_downloads', { url }], anime_downloads, {
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
        enabled: url !== null,
      });
    };
  
    return {
      ...queryClient,
      getAnimeDownloads,
    };
  };

  export default useCustomQuery;