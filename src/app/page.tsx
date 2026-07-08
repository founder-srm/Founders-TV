import HomeClient from "@/components/HomeClient";
import { getLatestVideos } from "@/services/videos";

export default async function Page() {
  const videos = await getLatestVideos();

  return <HomeClient videos={videos} />;
}