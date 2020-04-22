import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Title, AnchoredLink } from ".";
import moment from "moment";
import { approvePackage } from "../../api/packages";
import { Auth } from "../Auth";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const PackageTable = ({ title, approvals, summary, packages, page, pages }) => {
  const classes = useStyles();

  const handleApproval = (packageId) => {
    approvePackage.call({ packageId }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        history.push("/package-history");
      }
    });
  };

  const options = (package) => (
    <>
      <AnchoredLink
        size="small"
        color="primary"
        // component="button"
        to={`/view-package/${package._id}`}
      >
        View
      </AnchoredLink>
      {!package.conflicts && Auth.isAdmin() && (
        <>
          |
          <Link
            size="small"
            color="primary"
            href="#"
            // component="button"
            onClick={() => handleApproval(package._id)}
          >
            Approve
          </Link>
        </>
      )}
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

            {approvals ? (
              <>
                <TableCell>Conflicts?</TableCell>
                <TableCell>Options</TableCell>
              </>
            ) : (
              <>
                <TableCell>Approved On</TableCell>
                <TableCell>Approved By</TableCell>
                <TableCell>Status</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map((package) => (
            <TableRow key={package._id}>
              <TableCell>{package.name}</TableCell>
              <TableCell>{package.description}</TableCell>
              <TableCell>
                {moment(package.submittedOn).format("MM/DD/YYYY")}
              </TableCell>
              <TableCell>{package.submittedBy}</TableCell>
              {approvals ? (
                <>
                  <TableCell>{package.conflicts ? "Yes" : "No"}</TableCell>
                  <TableCell>{options(package)}</TableCell>
                </>
              ) : (
                <>
                  <TableCell>
                    {moment(package.approvedOn).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell>{package.approvedBy}</TableCell>
                  <TableCell>{package.status}</TableCell>
                </>
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
  approvals: PropTypes.bool,
  page: PropTypes.number,
  pages: PropTypes.number,
  packages: PropTypes.array,
  loading: PropTypes.bool,
  summary: PropTypes.bool,
};

export { PackageTable };
