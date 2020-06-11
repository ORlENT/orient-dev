import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardActionArea } from "@material-ui/core";
import timeConverter from "../functions/timeConverter";

//max length of summary
const summaryLength = 100;

const SummaryCard = ({ title, content, timestamp, read, onClick, to }) => (
  <Card
    elevation={read ? 3 : 10}
    style={{
      backgroundColor: "#555",
    }}
  >
    <CardActionArea
      onClick={onClick}
      style={{
        font: "unset",
      }}
    >
      <Link
        to={to}
        style={{
          display: "flex",
          position: "relative",
          textDecoration: "none",
        }}
      >
        {/*read/unread border highlight*/}
        {!read && (
          <div
            style={{
              width: "8px",
              backgroundColor: "#ff9800",
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
            }}
          />
        )}
        <CardContent
          style={{
            width: "100%",
            padding: "16px",
            paddingLeft: read ? "16px" : "24px",
          }}
        >
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
          <p
            style={{
              color: "#fff",
              margin: "0px",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            {content.length > summaryLength
              ? content.slice(0, summaryLength) + "..."
              : content}
          </p>

          {/*timestamp*/}
          <p style={{ color: "#bbb", margin: "0px" }}>
            {timeConverter(timestamp)}
          </p>
        </CardContent>
      </Link>
    </CardActionArea>
  </Card>
);

export default SummaryCard;
