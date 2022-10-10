/* eslint-disable no-nested-ternary */
import React from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export type IOption = {
  _id: string;
  name: string;
  disabled?: boolean;
};

interface MultipleSelectProps {
  onChangeSelect: (selectedoptions: any, name: string) => void;
  options: IOption[];
  defaultSelect?: IOption[] | [];
  label: string;
  resetSelection?: boolean;
  setResetSelection?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  actionName: string;
  description: string;
}

export default function MultipleSelect({
  label,
  onChangeSelect,
  options,
  defaultSelect = [],
  className = '',
  actionName,
  description,
  resetSelection = false,
  setResetSelection,
  ...props
}: MultipleSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<IOption[]>([]);
  const [defaultOptions, setDefaultOptions] = React.useState<IOption[]>([]);

  function isSelectedOptions(value: IOption) {
    return !!selectedOptions.find((el) => el._id === value._id);
  }

  function handleSelect(value: IOption) {
    if (!isSelectedOptions(value)) {
      const selectedOptionsUpdated = [
        ...selectedOptions,
        options.find((el) => el === value),
      ];
      setSelectedOptions(selectedOptionsUpdated as unknown as IOption[]);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value: IOption) {
    const selectedOptionsUpdated = selectedOptions.filter(
      (el) => el._id !== value._id
    );
    setSelectedOptions(selectedOptionsUpdated);
    setIsOpen(true);
  }

  React.useEffect(() => {
    if (
      defaultSelect?.length > 0 &&
      selectedOptions.length === 0 &&
      defaultOptions.length === 0
    ) {
      setSelectedOptions(defaultSelect);
      setDefaultOptions(defaultSelect);
    }
  }, [defaultSelect]);

  React.useEffect(() => {
    if (resetSelection && setResetSelection) {
      setSelectedOptions([]);
      setResetSelection(false);
    }
  }, [resetSelection]);

  React.useEffect(() => {
    onChangeSelect(selectedOptions, actionName);
  }, [selectedOptions]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-full h-full ">
        <span className="text-neutral-200 text-sm font-medium mb-2 ">
          {label}
        </span>
        <Combobox
          as="div"
          value={selectedOptions}
          onChange={(e: any) => {
            handleSelect(e);
          }}
        >
          {() => (
            <div className="relative ">
              <span className="block w-full  h-[42px]">
                <Combobox.Button
                  className="cursor-default relative w-full h-full rounded border-[0.5px] bg-white pl-3 pr-10 py-2 text-left border-neutral-100 transition ease-in-out duration-150 "
                  onClick={() => setIsOpen(!isOpen)}
                  //  open={isOpen}
                >
                  <span
                    className={`block truncate text-text-black font-light tracking-wider ${
                      description ? 'text-neutral-100 text-sm font-light' : ''
                    }`}
                  >
                    {selectedOptions.length < 1
                      ? description
                      : `${selectedOptions.map((op) => ` ${op.name}`)}`}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="h-5 w-5 text-neutral-100"
                      aria-hidden="true"
                    />
                  </span>
                </Combobox.Button>
              </span>

              <Transition
                unmount={false}
                show={isOpen}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options
                  static
                  className="absolute w-full max-h-60 rounded py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none  sm:leading-5  mt-1 bg-white shadow-lg z-50"
                >
                  {options.map((option) => {
                    const selected = isSelectedOptions(option);
                    return (
                      <Combobox.Option
                        key={option._id}
                        value={option}
                        disabled={option.disabled ?? false}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? 'bg-primary-400 text-white'
                              : option.disabled
                              ? 'text-neutral-100 cursor-not-allowed'
                              : 'text-gray-900'
                          }`
                        }
                      >
                        {({ active }) => (
                          <>
                            <span
                              className={`block truncate font-light tracking-wider  ${
                                selected ? 'font-medium' : ''
                              }`}
                            >
                              {option.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-primary-400'
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    );
                  })}
                </Combobox.Options>
              </Transition>
            </div>
          )}
        </Combobox>
      </div>
    </div>
  );
}
