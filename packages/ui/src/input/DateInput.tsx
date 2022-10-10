import React from 'react';
import dayjs from 'dayjs';
import { ArrowIcon } from '../icons';
import {
  getNextMonth,
  getPreviousMonth,
  refactorDate,
  WEEK_DAYS,
  months,
} from '../utils';

interface DateInputProps {
  label?: string;
  value: string;
  error?: string;
  open?: boolean;
  size?: 'small' | 'medium';
  setState: (value: string) => void;
}

export default function DateInput({
  label,
  value,
  error,
  open = false,
  size = 'small',
  setState,
}: DateInputProps) {
  const today = dayjs()?.startOf('day');
  const [show, setShow] = React.useState<boolean>(open);
  const ref = React.useRef<HTMLDivElement>(null);

  // Input hooks
  const [month, setMonth] = React.useState(today.month());
  const [year, setYear] = React.useState(today.year());

  // Visual hooks
  const [days, setDays] = React.useState<number[]>([]);
  const [offset, setOffset] = React.useState<number[]>([]);
  const [hasPreviousMonth, setHasPreviousMonth] = React.useState<boolean>(true);

  const goToPreviousMonth = () => {
    const previousMonth = getPreviousMonth(month, year);
    setMonth(previousMonth.month);
    setYear(previousMonth.year);
  };

  const goToNextMonth = () => {
    const nextMonth = getNextMonth(month, year);

    setMonth(nextMonth.month);
    setYear(nextMonth.year);
  };

  React.useEffect(
    function syncMonthData() {
      setDays([...Array(months[month]?.days)]);
      setOffset([
        ...Array(today?.set('month', month)?.startOf('month')?.day() ?? 2 - 1),
      ]);
      setHasPreviousMonth(today.month() !== month);
    },
    [month]
  );

  return (
    <div className="w-full relative" ref={ref}>
      {/* Input UI for not open cases */}
      <button
        type="button"
        className={`w-full text-sm ${open ? 'hidden' : 'flex'}`}
        onClick={(e) => {
          e.preventDefault();
          setShow((_show) => !_show);
        }}
      >
        {value}
      </button>
      {/* Calendar */}
      <div
        className={`flex-col justify-center items-center rounded-xl bg-white shadow-md ${
          !open ? 'mt-5 -translate-x-1/4 absolute' : ''
        } ${size === 'small' ? 'w-72 p-6' : 'w-full p-8'} ${
          show ? 'flex' : 'hidden'
        }`}
      >
        {/* Header */}
        <div
          className={`w-full flex justify-between px-2 ${
            size === 'medium' ? 'mb-4' : ''
          }`}
        >
          <button
            disabled={!hasPreviousMonth}
            type="button"
            className={` ${
              !hasPreviousMonth ? 'text-neutral-200' : 'text-primary-700'
            }`}
            onClick={(e) => {
              e.preventDefault();
              goToPreviousMonth();
            }}
          >
            <ArrowIcon className="w-3 h-3 rotate-180" />
          </button>

          <span className="text-neutral-500 font-semibold text-md">
            {months[month]?.name}{' '}
            <span className="text-primary-300">{year}</span>
          </span>

          <button
            type="button"
            className="text-primary-700"
            onClick={(e) => {
              e.preventDefault();
              goToNextMonth();
            }}
          >
            <ArrowIcon className="w-3 h-3" />
          </button>
        </div>

        {/* Days */}
        <div className="w-full grid grid-cols-7 mt-4  gap-3">
          {/* Week days */}
          {WEEK_DAYS?.map((weekDay, index) => (
            <p
              key={`week-day-${index}`}
              className="text-neutral-100 font-semibold text-center text-sm"
            >
              {weekDay}
            </p>
          ))}

          {/* offset */}
          {offset?.map((_, i) => (
            <div key={`offset-${i}`} />
          ))}

          {/* days */}
          {days?.map((_, i) => {
            // Get cell date
            const date = dayjs(`${year}-${month + 1}-${i}`)
              .startOf('day')
              .add(1, 'day');
            // Time validation
            const expired = today.isAfter(date);

            // Get selected date
            const current = dayjs(refactorDate(value)).startOf('day');
            // Validate if day is selected
            const isSelected = current.toISOString() === date.toISOString();

            return (
              <div
                className="w-full flex justify-center"
                key={`calendar-day-${i}`}
              >
                <button
                  disabled={expired}
                  type="button"
                  className={`text-center px-3 py-0 sm:py-1 my-2 ${
                    expired ? 'text-neutral-100 font-medium' : ''
                  } ${
                    isSelected && !expired
                      ? 'bg-primary-300 rounded-full text-white '
                      : ''
                  } ${
                    !isSelected && !expired
                      ? 'text-neutral-400 font-medium'
                      : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setState(date.format('DD/MM/YYYY'));
                    if (!open) setShow(false);
                  }}
                >
                  {i + 1}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
