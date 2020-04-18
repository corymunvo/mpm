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

const PackageTable = ({ title, approval, summary, packages, page, pages }) => {
  const classes = useStyles();

  const options = (package) => (
    <>
      <AnchoredLink to={`/view-package/${package._id}`}>View</AnchoredLink>
      {!package.conflicts && ' | '}
      {!package.conflicts && <a href="#">Approve</a>}
    </>
  );

  return (
    <>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Submitted On</TableCell>
            <TableCell>Submitted By</TableCell>
            <TableCell>Approved On</TableCell>
            <TableCell>Approved By</TableCell>
            {approval ? (
              <>
                <TableCell>Conflicts?</TableCell>
                <TableCell>Options</TableCell>
              </>
            ) : (
              <TableCell>Status</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map((package) => (
            <TableRow key={package.id}>
              <TableCell>{package.name}</TableCell>
              <TableCell>{package.description}</TableCell>
              <TableCell>{package.submittedOn}</TableCell>
              <TableCell>{package.submittedBy}</TableCell>
              <TableCell>{package.approvedOn}</TableCell>
              <TableCell>{package.approvedBy}</TableCell>
              {approval ? (
                <>
                  <TableCell>{package.conflicts ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{options(package)}</TableCell>
                </>
              ) : (
                <TableCell>Status</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        {summary ? (
          <AnchoredLink color="primary" to="/package-history">
            See more ...
          </AnchoredLink>
        ) : (
          <Pagination count={pages} page={page} />
        )}
      </div>
    </>
  );
};

PackageTable.propTypes = {
  approval: PropTypes.bool,
  page: PropTypes.number,
  pages: PropTypes.number,
  packages: PropTypes.array,
  loading: PropTypes.bool,
  summary: PropTypes.bool,
};

export { PackageTable };
