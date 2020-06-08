import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@material-ui/core";

//timestamp to date converter
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + " " + month + " " + year;
  return time;
}

//max length of summary
const summaryLength = 100;

const SummaryCard = ({
  title = "Title",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  timestamp = Date.now(),
  read,
  to,
}) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <Card
      elevation={read ? 3 : 10}
      style={{
        backgroundColor: "#555",
        display: "flex",
      }}
    >
      {/*read/unread border highlight*/}
      {!read && (
        <div
          style={{
            minHeight: "100%",
            width: "8px",
            backgroundColor: "#ff9800",
          }}
        />
      )}
      <CardContent style={{ width: "100%", padding: "16px" }}>
        {/*read/unread NEW!*/}
        {!read && (
          <h5
            style={{
              float: "right",
              textAlign: "right",
              color: "#ff9800",
              margin: "0px",
            }}
          >
            NEW!
          </h5>
        )}

        {/*title*/}
        <h3
          style={{
            color: "#fff",
            margin: "0px",
          }}
        >
          {title}
        </h3>

        {/*content*/}
        <p style={{ color: "#fff", margin: "0px" }}>
          {content.length > summaryLength
            ? content.slice(0, summaryLength) + "..."
            : content}
        </p>

        {/*timestamp*/}
        <p style={{ color: "#bbb", margin: "0px" }}>
          {timeConverter(timestamp)}
        </p>
      </CardContent>
    </Card>
  </Link>
);

export default SummaryCard;
