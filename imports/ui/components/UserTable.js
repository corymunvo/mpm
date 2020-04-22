import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import Table from "@material-ui/core/Table";
import Link from "@material-ui/core/Link";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { Title, AnchoredLink } from ".";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const UserTable = ({ summary, users, page, pages, handleClickOpen }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                {user.profile && user.profile.isAdmin ? (
                  "Admin"
                ) : user.profile && user.profile.group ? (
                  user.profile.group.name
                ) : (
                  <Link
                    size="small"
                    color="primary"
                    component="button"
                    onClick={() => handleClickOpen(user._id)}
                  >
                    Assign Group
                  </Link>
                )}
              </TableCell>
              <TableCell>
                <Link size="small" color="primary" component="button">
                  Edit
                </Link>{" "}
                |{" "}
                <Link size="small" color="primary" component="button">
                  Reset Password
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        {summary ? (
          <AnchoredLink color="primary" to="/users">
            See more users
          </AnchoredLink>
        ) : (
          <Pagination count={pages} page={page} />
        )}
      </div>
    </React.Fragment>
  );
};

UserTable.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  users: PropTypes.array,
  loading: PropTypes.bool,
  summary: PropTypes.bool,
};

export { UserTable };
