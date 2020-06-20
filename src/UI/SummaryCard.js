import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardActionArea } from "@material-ui/core";
import timeConverter from "../functions/timeConverter";
import timeFromNow from "../functions/timeFromNow";

//max lines of summary
const summaryLength = 2;

export const SummaryCard = ({
  title,
  content,
  timestamp,
  highlight,
  highlightText,
  to = "#",
  onClick,
  children,
  ...rest
}) => (
  <Card
    style={{
      backgroundColor: "#555",
    }}
    {...rest}
  >
    <CardActionArea
      onClick={onClick}
      style={{
        font: "unset",
      }}
    >
      <Link to={to} style={{ textDecoration: "none" }}>
        <CardContent
          style={{
            width: "100%",
            padding: "16px",
            paddingLeft: highlight ? "24px" : null,
            WebkitBoxSizing: "border-box",
          }}
        >
          {/*border highlight*/}
          {highlight && (
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
          {/*highlight text*/}
          <h5
            style={{
              float: "right",
              textAlign: "right",
              color: "#ff9800",
              margin: "0px",
            }}
          >
            {highlightText}
          </h5>
          {/*title*/}
          <h3
            style={{
              color: "#fff",
              margin: "0px",
              marginBottom: "8px",
            }}
          >
            {title}
          </h3>

          {/*content*/}
          <p
            style={{
              color: "#fff",
              margin: "0px",
              //Clamp down to summaryLength
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: summaryLength,
              WebkitBoxOrient: "vertical",
            }}
          >
            {content}
          </p>

          {children}

          {/*timestamp*/}
          <p style={{ color: "#bbb", margin: "0px", marginTop: "8px" }}>
            {timestamp}
          </p>
        </CardContent>
      </Link>
    </CardActionArea>
  </Card>
);

export const AnnCard = ({ read, timestamp, ...rest }) => (
  <SummaryCard
    elevation={read ? 3 : 10}
    highlight={!read}
    highlightText={read ? null : "NEW!"}
    timestamp={"Posted on " + timeConverter(timestamp)}
    {...rest}
  />
);

export const QnaCard = ({ asked, answered, timestamp, ...rest }) => (
  <SummaryCard
    elevation={asked && answered ? 3 : 10}
    highlight={asked && answered}
    highlightText={asked ? (answered ? "ANSWERED!" : "Your Question") : null}
    timestamp={"Asked on " + timeConverter(timestamp)}
    style={{ opacity: answered ? "1" : "0.5" }}
    {...rest}
  />
);

export const RemCard = ({ timestamp, ...rest }) => (
  // > 1 week - green,  low priority
  // > 1 day  - orange, medium priority
  // < 1 day  - red,    high priority

  <SummaryCard
    content={"Due in " + timeFromNow(timestamp)}
    timestamp={"Due on " + timeConverter(timestamp)}
    {...rest}
  >
    <div
      style={{
        width: "100%",
        height: "8px",
        borderRadius: "4px",
        backgroundColor: "#444",
      }}
    >
      <div
        style={{
          width: remWidth(timestamp),
          height: "100%",
          borderRadius: "4px",
          backgroundColor: remColor(timestamp),
        }}
      />
    </div>
  </SummaryCard>
);

function remWidth(timestamp) {
  const diff = timestamp.toDate() - Date.now();
  const week = 1000 * 60 * 60 * 24 * 7;

  //overdue
  if (diff <= 0) return "100%";

  //more than a week
  if (diff > week) return "8px";

  return (1 - diff / week) * 100 + "%";
}

function remColor(timestamp) {
  const diff = timestamp.toDate() - Date.now();
  const week = 1000 * 60 * 60 * 24 * 7;
  const day = 1000 * 60 * 60 * 24;

  //more than a week - green
  if (diff > week) return "#4caf50";

  //more than a day - orange
  if (diff > day) return "#ff9800";

  //less than a day - red
  return "#f44336";
}

export const PtCard = ({ onClick, to, title, content, ...rest }) => (
  <Card
    style={{
      backgroundColor: "#555",
    }}
    {...rest}
  >
    <CardActionArea
      onClick={onClick}
      style={{
        font: "unset",
      }}
    >
      <Link to={to} style={{ textDecoration: "none" }}>
        <CardContent
          style={{
            width: "100%",
            padding: "16px",
            paddingLeft: "24px",
            WebkitBoxSizing: "border-box",
          }}
        >
          {/*border highlight*/}
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
          {/*content*/}
          <p
            style={{
              color: "#fff",
              margin: "0px",
              float: "right",
              textAlign: "right",
            }}
          >
            {content}
          </p>
          {/*title*/}
          <h3
            style={{
              color: "#fff",
              margin: "0px",
            }}
          >
            {title}
          </h3>
        </CardContent>
      </Link>
    </CardActionArea>
  </Card>
);
