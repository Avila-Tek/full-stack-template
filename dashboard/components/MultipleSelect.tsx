import React from 'react';

type MultipleSelectValue = {
  value: string;
  text: string;
  selected?: boolean;
};

interface MultipleSelectProps {
  values: Array<MultipleSelectValue>;
  selected?: Array<string>;
  name: string;
  label: string;
  placeholder: string;
  onChange: (values: string[]) => void;
}

export default function MultipleSelect({
  values,
  selected: _selected = [],
  name,
  label,
  placeholder,
  onChange,
}: MultipleSelectProps) {
  const [options, setOptions] = React.useState<Array<MultipleSelectValue>>(
    values?.map((value) => {
      const index =
        _selected?.findIndex((option) => value.value === option) ?? -1;
      if (index !== -1) {
        value.selected = true;
      } else {
        value.selected = false;
      }
      return value;
    }) ?? []
  );
  const [selected, setSelected] = React.useState<Array<MultipleSelectValue>>(
    _selected
      ?.map((_id) => {
        const [element] = values.filter((value) => value.value === _id);
        if (element) {
          element.selected = true;
          return element;
        }
        return null;
      })
      ?.filter((x) => !!x) ?? []
  );
  React.useEffect(
    function updateValuesMultipleSelect() {
      onChange(selected.map(({ value }) => value));
    },
    [selected, onChange]
  );
  const [show, setShow] = React.useState(false);
  const select = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { value } = e.currentTarget.dataset;
    const [element] = options
      .slice()
      .filter((option) => option.value === value);
    if (element && !element.selected) {
      const index = options.lastIndexOf(element);
      setOptions((option) => [
        ...option.slice(0, index),
        { ...option[index], selected: true },
        ...option.slice(index + 1),
      ]);
      setSelected((__selected) => [...__selected, element]);
    }
  };
  const remove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { value } = e.currentTarget.dataset;
    const index = options.findIndex((_select) => _select.value === value);
    e.preventDefault();
    setSelected((__selected) =>
      __selected.filter((_select) => _select.value !== value)
    );
    setOptions((_options) => [
      ..._options.slice(0, index),
      { ..._options[index], selected: false },
      ..._options.slice(index + 1),
    ]);
  };
  return (
    <>
      <label htmlFor={name} className="hidden">
        <select name={name} id={name} className="hidden">
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </label>
      <div>
        <span className="text-gray-700">{label}</span>
        <div className="inline-block relative w-full">
          <div className="flex flex-col items-center relative">
            <div className="w-full">
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div
                className="my-2 p-1 flex border border-gray-200 bg-white rounded focus:outline-none focus:shadow-outline w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setShow(!show);
                }}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                role="button"
              >
                <div className="flex flex-auto flex-wrap">
                  {selected.map((value) => (
                    <div
                      key={value.value}
                      className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-primary-500 bg-gray-100 border border-primary-300"
                    >
                      <div className="text-xs font-normal leading-none max-w-full flex-initial">
                        {value.text}
                      </div>
                      <div className="flex flex-auto flex-row reverse">
                        <button
                          type="button"
                          data-value={value.value}
                          onClick={remove}
                        >
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  {selected.length === 0 && (
                    <label className="flex-1" htmlFor="placeholder">
                      <input
                        disabled
                        name="placeholder"
                        id="placeholder"
                        placeholder={placeholder}
                        className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                      />
                    </label>
                  )}
                </div>
                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                  <button
                    type="button"
                    className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      setShow(!show);
                    }}
                  >
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full px-4">
              <div className="absolute shadow bg-gray-100 z-40 w-full left-0 rounded max-h-40 overflow-y-auto">
                <div className={`flex-col w-full ${show ? 'flex' : 'hidden'}`}>
                  {options.map((value) => (
                    <div key={value.value}>
                      <button
                        type="button"
                        className={`cursor-pointer w-full border-gray-100 hover:bg-gray-100 ${
                          value.selected ? 'border-primary-500 border-l-2' : ''
                        }`}
                        data-value={value.value}
                        onClick={select}
                      >
                        <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                          <div className="w-full items-center flex">
                            <div className="mx-2 leading-6">{value.text}</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
