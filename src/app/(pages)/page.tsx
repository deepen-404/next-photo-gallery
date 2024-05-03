import MediaGallery from "@/components/MediaGallery";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function Home() {
  const { resources } = await cloudinary.api.resources_by_tag(
    String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)
  );
  return (
    <div className="h-full mt-6">
      <MediaGallery
        tag={String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)}
        resources={resources}
      />
    </div>
  );
}
