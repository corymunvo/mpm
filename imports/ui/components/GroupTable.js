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

const GroupTable = ({ summary, groups, page, pages, loading }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Groups</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Rights</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group._id}>
              <TableCell>{group.name}</TableCell>
              <TableCell>
                <pre>{JSON.stringify(group.rights, null, 2)}</pre>
              </TableCell>
              <TableCell>
                <AnchoredLink to={`/edit-group/${group._id}`}>
                  Edit
                </AnchoredLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        {summary ? (
          <AnchoredLink color="primary" to="/groups">
            See more groups
          </AnchoredLink>
        ) : (
          <Pagination count={pages} page={page} />
        )}
      </div>
    </React.Fragment>
  );
};

GroupTable.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  groups: PropTypes.array,
  loading: PropTypes.bool,
  summary: PropTypes.bool,
};

export { GroupTable };
