import React, { useMemo } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { CSVLink } from 'react-csv';

const BookTable = ({ data, page, handlePageChange, handleSearch }) => {
  const columns = useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      {
        Header: 'Author',
        accessor: 'author_name',
        Cell: ({ value }) => value?.join(', ') || '',
      },
      { Header: 'First Published', accessor: 'first_publish_year' },
      {
        Header: 'Subjects',
        accessor: 'subject',
        Cell: ({ value }) => value?.join(', ') || '',
      },
    ],
    []
  );

  const headers = [
    { label: 'Title', key: 'title' },
    { label: 'Author', key: 'author_name' },
    { label: 'First Published', key: 'first_publish_year' },
    { label: 'Subjects', key: 'subject' },
  ];

  const formattedData = data.map((book) => ({
    title: book.title,
    author_name: book.author_name?.join(', ') || '',
    first_publish_year: book.first_publish_year,
    subject: book.subject?.join(', ') || '',
  }));

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page: tablePage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <div>
      <input
        type="text"
        placeholder="Search books..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {tablePage.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>{' '}
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>
      </div>
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous Page
        </button>
        <span>Page {page}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={!canNextPage}>
          Next Page
        </button>
      </div>
      <CSVLink
        data={formattedData}
        headers={headers}
        filename="books.csv"
        target="_blank"
        className="download-csv-button"
    >
        Download CSV
      </CSVLink>
    </div>
  );
};

export default BookTable;



