import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Circle, Close, Done } from "@mui/icons-material";
import { Button } from "@mui/material";
import FlexEvenly from "Components/FlexEvenly";
import FlexBetween from "Components/FlexBetween";
import { changeAppointmentStatus } from "./AppointmentData";
export function createData(
  aid,
  time,
  status,
  date,
  contactNumber,
  email,
  message,
  name
) {
  return {
    aid,
    time,
    status,
    AllData: {
      Date: date,
      "Contact Number": contactNumber,
      Email: email,
      Message: message,
      Name: name,
    },
  };
}

function Row({ changeStatus, row }) {
  // const = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.aid}
        </TableCell>
        <TableCell align="right">{row.time}</TableCell>
        <TableCell align="right">
          {row.status === 0 ? (
            <Box sx={{ color: "blue" }}>Pending</Box>
          ) : row.status === 1 ? (
            <Box sx={{ color: "green" }}>Done</Box>
          ) : (
            <Box sx={{ color: "red" }}>Canceled</Box>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                All Data
              </Typography>
              <Table size="small" aria-label="purchases">
                {row?.AllData &&
                  Object.keys(row?.AllData).map((m) => {
                    return (
                      <TableRow key={m}>
                        <TableCell sx={{ fontWeight: "700" }} width={"30%"}>
                          {m}
                        </TableCell>
                        <TableCell color="Primary">{row.AllData[m]}</TableCell>
                      </TableRow>
                    );
                  })}
              </Table>
              {new Date().toISOString().substring(0, 10) ===
                row?.AllData.Date && (
                <FlexBetween>
                  <FlexEvenly gap={"1rem"} width={"100%"} padding={"1rem"}>
                    <Button
                      disabled={!(row.status === 0)}
                      onClick={() => changeStatus(1, row.aid)}
                      sx={{ width: "2rem", background: "blue", color: "white" }}
                    >
                      <Done />
                    </Button>
                    <Button
                      onClick={() => changeStatus(-1, row.aid)}
                      disabled={!(row.status === 0)}
                      sx={{ width: "2rem", background: "red", color: "white" }}
                    >
                      <Close />
                    </Button>
                  </FlexEvenly>
                </FlexBetween>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function CollapsibleTable({ data }) {
  const [rows, setRows] = React.useState(data);
  // console.log(rows, data);
  const [refresh, setRefresh] = React.useState(0);
  const changeStatus = (newStatus, aid) => {
    rows.find((f) => f.aid === aid).status = newStatus;
    setRows(rows);
    setRefresh(refresh + 1);
    changeAppointmentStatus({ aid: aid, status: newStatus });
  };
  React.useEffect(() => {
    // console.log("r");
    setRows(data);
  }, [refresh, data]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: "700" }}>Appointment ID</TableCell>
            <TableCell sx={{ fontWeight: "700" }} align="right">
              Time
            </TableCell>
            <TableCell sx={{ fontWeight: "700" }} align="right">
              Status
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <Row key={row.aid} row={row} changeStatus={changeStatus} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
