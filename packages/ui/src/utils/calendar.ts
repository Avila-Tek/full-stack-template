export const WEEK_DAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
export const months = [
  { name: 'Enero', days: 31 },
  { name: 'Febrero', days: 28 },
  { name: 'Marzo', days: 31 },
  { name: 'Abril', days: 30 },
  { name: 'Mayo', days: 31 },
  { name: 'Junio', days: 30 },
  { name: 'Julio', days: 31 },
  { name: 'Agosto', days: 31 },
  { name: 'Septiembre', days: 30 },
  { name: 'Octubre', days: 31 },
  { name: 'Noviembre', days: 30 },
  { name: 'Diciembre', days: 31 },
];

// ({month, year}) Gets the month and year before the given month and year
// Example 1: getPreviousMonth(1, 2000) => {month: 12, year: 1999}
// Example 2: getPreviousMonth(12, 2000) => {month: 11, year: 2000}
export function getPreviousMonth(month: number, year: number) {
  const prevMonth = month > 0 ? month - 1 : 11;
  const prevMonthYear = month > 0 ? year : year - 1;
  return { month: prevMonth, year: prevMonthYear };
}

// ({month, year}) Gets the month and year after the given month and year
// Example 1: getNextMonth(1, 2000) => {month: 2, year: 2000}
// Example 2: getNextMonth(12, 2000) => {month: 1, year: 2001}
export function getNextMonth(month: number, year: number) {
  const nextMonth = month < 11 ? month + 1 : 0;
  const nextMonthYear = month < 11 ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
}

// (date) Gets refactor date from DD/MM/YYYY to YYYY-MM-DD
// Example: refactorDate('07/12/2000') => '2000-12-07'
export function refactorDate(date: string) {
  return `${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
}
