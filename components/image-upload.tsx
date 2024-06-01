"use client";

import * as React from "react";
import { toast } from "sonner";

import { UploadButton } from "@/lib/utils";

type ImageUploadProps = {
  onChange: (url?: string) => void;
};

export const ImageUpload = ({ onChange }: ImageUploadProps) => {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        onChange(res[0].url);
        toast.success("Image uploaded.");
      }}
      onUploadError={(error: Error) => {
        console.log({ error });
        // Do something with the error.
        toast.error("Failed to upload image.");
      }}
      className="mt-0 gap-0 ut-button:h-14 ut-button:w-full ut-button:rounded-full ut-button:bg-transparent ut-button:text-transparent ut-button:outline-none ut-button:ring-0 ut-button:ring-offset-0 ut-allowed-content:hidden"
    />
  );
};
