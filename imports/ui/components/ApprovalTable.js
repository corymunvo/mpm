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

const ApprovalTable = ({ summary, packages, page, pages }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Pending Approvals</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Submitted On</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Conflicts?</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map((package) => (
            <TableRow key={package.id}>
              <TableCell>{package.submittedOn}</TableCell>
              <TableCell>{package.name}</TableCell>
              <TableCell>{package.description}</TableCell>
              <TableCell>{package.conflicts ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <AnchoredLink to={`/view-package/${package._id}`}>
                  View
                </AnchoredLink>
                {!package.conflicts && ' | '}
                {!package.conflicts && <a href="#">Approve</a>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        {summary ? (
          <AnchoredLink color="primary" to="/package-approval">
            See more packages
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
  packages: PropTypes.array,
  loading: PropTypes.bool,
  summary: PropTypes.bool,
};

export { ApprovalTable };
