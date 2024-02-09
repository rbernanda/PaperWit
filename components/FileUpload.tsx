"use client";
import { uploadToS3 } from "@/lib/s3";
import { Inbox, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const FileUpload = () => {
  const [loading, setIsLoading] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const res = await axios.post("/api/create-chat", { file_key, file_name });
      return res.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    async onDrop(acceptedFiles) {
      const file = acceptedFiles[0];
      const SIZE_LIMIT = 10 * 1024 * 1024; // 10 mb

      if (file.size > SIZE_LIMIT) {
        toast.error("Upload file size limit is 10 mb");
        return;
      }

      try {
        setIsLoading(true);
        const data = await uploadToS3(file);

        if (!data.file_key || !data.file_name) {
          toast.error("Error uploading file");
          return;
        }

        mutate(data, {
          onSuccess: (data) => {
            // toast.success(data.message);
            console.log(data, "DATA");
          },
          onError: (error) => {
            console.log(error);
            toast.error("Error creating file chat");
          },
        });
      } catch (error) {
        console.log(error);
        toast.error("Error uploading file");
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "flex flex-col items-center justify-center border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8",
        })}
      >
        <input {...getInputProps()} disabled={isPending || loading} />
        {isPending || loading ? (
          <>
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Tuning your file to GPT
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop your PDF here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
