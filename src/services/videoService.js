import { getVideos as fetchVideos } from '../mock/videos';

export async function getVideos() {
  return fetchVideos();
}
