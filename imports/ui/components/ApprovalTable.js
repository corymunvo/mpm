import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { Title, AnchoredLink } from '.';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const ApprovalTable = ({ summary, approvals, page, pages }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Pending Approvals</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Conflicts?</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {approvals.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.conflicts ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <a href="/">View</a>
                {!row.conflicts && ' | '}
                {!row.conflicts && <a href="#">Approve</a>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        {summary ? (
          <AnchoredLink color="primary" to="/package-approval">
            See more approvals
          </AnchoredLink>
        ) : (
          <Pagination count={pages} page={page} />
        )}
      </div>
    </React.Fragment>
  );
};

ApprovalTable.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  approvals: PropTypes.array,
  loading: PropTypes.bool,
  summary: PropTypes.bool,
};

export { ApprovalTable };
