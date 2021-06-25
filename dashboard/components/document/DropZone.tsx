import React from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import UploadIcon from '../icons/UploadIcon';

interface DropZoneProps {
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections?: FileRejection[],
    event?: DropEvent
  ) => void;
}

function DropZone({ onDrop }: DropZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div
      {...getRootProps()}
      className={`
      w-full border rounded h-14 flex cursor-pointer mt-4 ${
        isDragActive
          ? 'border-neutral-400 border-1 border-solid'
          : 'border-neutral-400 border-1 border-dashed'
      }
      `}
      role="button"
    >
      <input className="dropzone-input" {...getInputProps()} accept="image/*" />
      <div className=" flex items-center flex-row justify-center my-auto text-neutral-400 w-full focus:outline-none focus:shadow-none ">
        <p>Adjuntar Archivo</p>
        <UploadIcon className="w-5 ml-3" />
      </div>
    </div>
  );
}

export default DropZone;
