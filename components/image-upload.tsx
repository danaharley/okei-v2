"use client";

import * as React from "react";

import { UploadButton } from "@/lib/utils";
import { toast } from "sonner";

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
      className="ut-button:bg-transparent ut-button:text-transparent ut-allowed-content:hidden ut-button:rounded-full ut-button:outline-none ut-button:ring-0 ut-button:ring-offset-0 ut-button:h-14 ut-button:w-full mt-0 gap-0"
    />
  );
};
