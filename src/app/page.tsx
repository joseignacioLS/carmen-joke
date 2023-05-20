"use client";

import { useEffect, useState } from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import EventBusyIcon from "@mui/icons-material/EventBusy";

import styles from "./page.module.scss";

const getDateString = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  let month = (date.getUTCMonth() + 1).toString();
  let day = date.getUTCDate().toString();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
};

const jokes = [
  {
    joke: (
      <span>
        {"Checking Carmen's next week agenda"}
        <br />
        <HourglassBottomIcon />
      </span>
    ),
    time: 4,
    className: "joke",
  },
  {
    joke: <ErrorIcon fontSize="large" />,
    time: 2,
    className: "warning",
  },
  {
    joke: (
      <span>
        {"Checking Carmen's next month agenda"}
        <br />
        <HourglassBottomIcon />
      </span>
    ),
    time: 4,
    className: "joke",
  },
  {
    joke: <ErrorIcon fontSize="large" />,
    time: 2,
    className: "warning",
  },
  {
    joke: (
      <span>
        {"Checking Carmen's next year agenda"}
        <br />
        <HourglassBottomIcon />
      </span>
    ),
    time: 4,
    className: "joke",
  },
  {
    joke: <ErrorIcon fontSize="large" />,
    time: 2,
    className: "warning",
  },
];

export default function Home() {
  const [queryDate, setQueryDate] = useState("");
  const [state, setState] = useState("waiting");
  const [jokeIndex, setJokeIndex] = useState(0);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    setState("checking");
  };

  const reset = () => {
    setQueryDate(getDateString());
    setState("waiting");
    setJokeIndex(0);
  };

  useEffect(() => {
    setQueryDate(getDateString());
  }, []);

  useEffect(() => {
    if (state !== "checking") return;
    if (jokeIndex >= jokes.length) return setState("checked");
    setTimeout(() => {
      setJokeIndex((oldValue) => oldValue + 1);
    }, jokes[jokeIndex].time * 1000);
  }, [jokeIndex, state]);
  return (
    <main className={styles.main}>
      <h1 className={styles.delayed1s}>
        Is Carmen available?{" "}
        {state === "checked" ? (
          <EventBusyIcon fontSize="large" />
        ) : (
          <CalendarMonthIcon fontSize="large" />
        )}
      </h1>
      <div className={styles.body}>
        {state === "waiting" && (
          <form className={styles.delayed2s}>
            <span>When would you like to meet Carmen?</span>
            <input
              type="date"
              value={queryDate}
              onChange={(e) => {
                setQueryDate(e.target.value);
              }}
            />
            <button className={styles.button} onClick={handleSubmit}>
              Check
            </button>
          </form>
        )}
        {state === "checking" && jokeIndex < jokes.length && (
          <div className={styles.jokeContainer}>
            <h2 className={styles[jokes[jokeIndex].className]}>
              {jokes[jokeIndex].joke}
            </h2>
          </div>
        )}
        {state === "checked" && (
          <div className={styles.resolution}>
            <h2>
              We appreciate your interest, but Carmen is not available
              <br />
              <br />
              Ever
            </h2>
            <button className={styles.button} onClick={reset}>
              Check again?
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
