'use client';
import Table from './Table';

import TableContent from './TableContent';
import Footer from './TableFooter';
import Header from './TableHeader';
import Pagination from './TablePagination';
import SearchInput from './TableSearchInput';

export default Object.assign(Table, {
  Content: TableContent,
  Footer,
  Header,
  Pagination,
  SearchInput,
});
