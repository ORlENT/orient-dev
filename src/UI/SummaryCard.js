import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardActionArea } from "@material-ui/core";
import timeConverter from "../functions/timeConverter";

//max lines of summary
const summaryLength = 2;

export const SummaryCard = ({
  title,
  content,
  timestamp,
  highlight,
  highlightText,
  to,
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

          {/*timestamp*/}
          <p style={{ color: "#bbb", margin: "0px" }}>
            {timeConverter(timestamp)}
          </p>
        </CardContent>
      </Link>
    </CardActionArea>
  </Card>
);

export const AnnCard = ({ read, ...rest }) => (
  <SummaryCard
    elevation={read ? 3 : 10}
    highlight={!read}
    highlightText={read ? null : "NEW!"}
    {...rest}
  />
);

export const QnaCard = ({ asked, answered, ...rest }) => (
  <SummaryCard
    elevation={asked && answered ? 3 : 10}
    highlight={asked && answered}
    highlightText={asked ? (answered ? "ANSWERED!" : "Your Question") : null}
    style={{ opacity: answered ? "1" : "0.5" }}
    {...rest}
  />
);

export const RemCard = ({ ...rest }) => <SummaryCard {...rest} />;
