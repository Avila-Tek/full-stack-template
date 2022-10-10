import React from 'react';
import { validateString } from 'avilatek-utils';
import { v4 as uuid } from 'uuid';
import { Input } from './Input';
import { CloseIcon } from '../icons';

interface TagsInputProps {
  updateTags: React.Dispatch<
    React.SetStateAction<
      {
        text: string;
        id: string;
      }[]
    >
  >;
  tags: { text: string; id: string }[];
}

function TagsInput({ tags = [], updateTags }: TagsInputProps) {
  const [_tags, setTags] = React.useState<{ text: string; id: string }[]>([]);
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    updateTags(_tags);
  }, [_tags, updateTags]);

  React.useEffect(() => {
    if (_tags?.length === 0 && tags?.length > 0) {
      setTags(tags);
    }
  }, [tags]);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { key } = e;
    if (validateString(text) && String(text).length < 127 && key === 'Enter') {
      setTags((__tags) => {
        if (__tags.length === 0) {
          return [{ text, id: uuid() }];
        }
        const filtered = __tags.filter((tag) => tag.text !== text);
        if (filtered.length > 0) {
          return [...filtered, { text, id: uuid() }];
        }
        return __tags;
      });
      setText('');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const deleteTag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const { id } = e.currentTarget.dataset;
    setTags(_tags.slice().filter((tag) => tag.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-0 flex-wrap items-start bg-white text-base leading-6 w-full ">
      <ul className="mr-2 p-0 flex flex-row flex-wrap min-w-0">
        {_tags.map((tag) => (
          <li
            key={tag.id}
            className="flex justify-between mb-1 ml-1 h-fit bg-primary-400 text-white rounded text-sm break-words "
          >
            <span className="pl-2 break-words ">{tag.text}</span>
            <button
              className="p-0 m-auto ml-2 focus:outline-none px-1 h-full rounded-tr rounded-br bg-primary-300"
              type="button"
              data-id={tag.id}
              onClick={deleteTag}
            >
              <CloseIcon className="w-4 h-4 m-auto p-0" />
            </button>
          </li>
        ))}
      </ul>
      <label htmlFor="text" className="flex-1 bg-transparent w-full">
        <span className="sr-only">Valor de la Variante</span>
        <Input
          type="text"
          name="text"
          id="text"
          className="flex-1 "
          placeholder="Presione ENTER para agregar"
          onKeyUp={onKeyUp}
          onChange={onChange}
          value={text}
        />
      </label>
    </div>
  );
}

export default TagsInput;
