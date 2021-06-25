import React from 'react';
import { v4 as uuid } from 'uuid';
import { useDrag, useDrop } from 'react-dnd';
import { DocumentModel } from '../../models';

import CloseIcon from '../icons/CloseIcon';
import PageIcon from '../icons/PageIcon';
// import firebase from '../../lib/firebase/client';

const type = 'Image';

interface ImageProps {
  src: string;
  id: string;
  name: string;
  index?: number;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  moveImage?: (dragIndex: number, hoverIndex: number) => void;
  updateURLs?: React.Dispatch<React.SetStateAction<DocumentModel[]>>;
  updateSrc?: (id: string, src: string, name: string) => void;
  route?: string;
  down?: boolean;
}

function Image({
  src,
  id,
  onDelete,
  index,
  name,
  moveImage,
  updateURLs,
  updateSrc,
  down,
  route,
}: ImageProps) {
  // const notify = useNotify();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [uploading, setUploading] = React.useState(false);
  React.useEffect(() => {
    if (src && !src.startsWith('http')) {
      const upload = async () => {
        try {
          setUploading(true);
          // const storageRef = firebase.storage(firebase.app()).ref(`${uuid()}`);
          // const url = await (
          //   await storageRef.putString(src, 'data_url')
          // ).ref.getDownloadURL();
          updateURLs((urls) => {
            const i = urls?.findIndex((_url) => _url?.id === id);
            if (i === -1) {
              return [...urls, { src: 'url', name, id }];
            }
            return urls;
          });
          updateSrc(id, 'url', name);
        } catch (err) {
          console.log(err);
        } finally {
          setUploading(false);
        }
      };
      upload();
    }
  }, [src, updateURLs, index, id, updateSrc, name]);
  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = (item as any).index as number;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveImage(dragIndex, hoverIndex);
      (item as any).index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type,
    item: () => ({ type, id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <div
      className={`bg-white my-1 flex flex-row  w-full h-14 items-center rounded py-2 ${
        isDragging || uploading ? 'opacity-25' : 'opacity-100'
      } ${down ? 'items-center justify-center' : 'items-start justify-start'}`}
      ref={ref}
    >
      <a
        download
        target="_blank"
        rel="noopener noreferrer"
        href={src}
        className="w-11/12 text-sm truncate flex flex-row ml-4"
      >
        <PageIcon className="w-5 h-5 mr-3" />
        {name}
      </a>
      <div className="w-1/12">
        <button
          type="button"
          className="flex justify-center items-center"
          onClick={onDelete}
          data-id={id}
          data-index={index}
        >
          <CloseIcon className="w-4 h-4 text-neutral-300" />
        </button>
      </div>
    </div>
  );
}

export default Image;
