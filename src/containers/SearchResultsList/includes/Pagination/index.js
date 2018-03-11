import React from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableRow, TablePagination } from 'material-ui/Table';

const style = {
  table: {
    width: '100%',
    minWidth: '100%',
  },
};

const Pagination = (props) => {
  const { onChangePage, count, currentPage } = props;

  return (
    <Table style={style.table}>
      <TableBody>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[]}
            count={count}
            rowsPerPage={10}
            page={currentPage}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={onChangePage}
          />
        </TableRow>
      </TableBody>
    </Table>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default Pagination;
