import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { Title } from '.';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const PackageTable = ({ summary, packages, page, pages, loading }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Package History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Submitted On</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Approved On</TableCell>
            <TableCell>Approved By</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.submittedOn}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.approvedOn}</TableCell>
              <TableCell>{row.approvedBy}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        {summary ? (
          <AnchoredLink color="primary" to="/package-history">
            See more approvals
          </AnchoredLink>
        ) : (
          <Pagination count={pages} page={page} />
        )}
      </div>
    </React.Fragment>
  );
};

PackageTable.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  packages: PropTypes.array,
  loading: PropTypes.bool,
  summary: PropTypes.bool,
};

export { PackageTable };
