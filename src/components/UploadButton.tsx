"use client";

import { useResources } from "@/hooks/useResources";
import { Upload } from "lucide-react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

import { CloudinaryResourceT } from "@/types/Cloudinary";

const UploadButton = () => {
  const { addResorces } = useResources({ disabledFetch: true });
  function handleOnSuccess(result: CloudinaryUploadWidgetResults) {
    addResorces([result.info as CloudinaryResourceT]);
  }
  return (
    <CldUploadButton
      className="cursor-pointer"
      options={{
        autoMinimize: true,
        tags: [String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)],
      }}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={handleOnSuccess}
    >
      <span className="flex gap-2 items-center">
        <Upload className="w-4 h-4" /> Upload
      </span>
    </CldUploadButton>
  );
};

export default UploadButton;
