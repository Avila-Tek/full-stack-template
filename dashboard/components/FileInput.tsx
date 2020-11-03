import React from 'react';

interface FileInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label: string;
  required?: boolean;
  setFile?: React.Dispatch<React.SetStateAction<File>>;
}

export default function FileInput({
  name,
  label,
  placeholder = 'Seleccione un Archivo',
  setFile,
  ...rest
}: FileInputProps) {
  const [fileName, setFileName] = React.useState(placeholder);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      setFile(file);
    }
  };
  return (
    <div className="mb-4">
      <p className="mb-1 text-gray-700">
        {label}
        {rest.required && <span className="text-red-500"> * </span>}
      </p>
      <label
        htmlFor={name}
        className="appearance-none bg-gray-100 text-gray-700 border rounded-md py-2 px-3 text-base leading-6 w-full flex flex-wrap hover:bg-primary-500 hover:text-white items-center justify-center"
      >
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 mr-1"
        >
          <path d="M8 17a5 5 0 01-.916-9.916 5.002 5.002 0 019.832 0A5.002 5.002 0 0116 17m-7-5l3-3m0 0l3 3m-3-3v12" />
        </svg>
        <span className="text-base">{fileName}</span>
        <input
          type="file"
          className="absolute cursor-pointer opacity-0 flex-1"
          name={name}
          onChange={onChange}
          {...rest}
        />
      </label>
    </div>
  );
}
