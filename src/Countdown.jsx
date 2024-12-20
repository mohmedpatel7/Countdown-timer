import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; //External css for react app..

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState(""); //Hold user selected date & time..
  const [remainingTime, setRemainingTime] = useState(null); //Hold remaining time..

  // Function to calculate the time difference and update the remainingTime state
  const calculateTimeLeft = () => {
    if (!targetDate) return; // If no date is selected, do nothing

    const now = new Date();
    const target = new Date(targetDate);
    const timeDifference = target - now; // Calculate the time difference in milliseconds

    // If the target time has already passed
    if (timeDifference <= 0) {
      setRemainingTime(null);
      alert("Countdown Complete!");
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); //Caculate days
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24); //Caculate hours
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60); //Caculate minutes
    const seconds = Math.floor((timeDifference / 1000) % 60); //Caculate seconds

    // Left time..
    setRemainingTime({ days, hours, minutes, seconds });
  };

  //Display time..
  useEffect(() => {
    let timer;
    if (remainingTime) {
      timer = setInterval(calculateTimeLeft, 1000);
    }
    return () => clearInterval(timer); // Clear the interval on component unmount or when remainingTime changes
  }, [remainingTime, targetDate]);

  //function to start count down..
  const startCountdown = () => {
    if (!targetDate) {
      alert("Please select a valid date and time!"); // Alert if no date is selected
      return;
    }
    calculateTimeLeft();
  };

  return (
    <div className="container text-center py-5">
      <h1 className="mb-4">Countdown Timer</h1>
      {/* Input Section */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <label htmlFor="datetime" className="form-label">
            Select Date and Time:
          </label>
          <input
            type="datetime-local" // Input type for date and time selection
            id="datetime"
            className="form-control mb-3"
            value={targetDate} // Controlled input linked to targetDate state
            onChange={(e) => setTargetDate(e.target.value)} // Update state on change
          />
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={startCountdown}>
              Start
            </button>

            <button
              className="btn btn-primary ms-2"
              onClick={() => {
                setRemainingTime("");
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>{" "}
      <br />
      {/* Display Remaining Time */}
      {remainingTime && (
        <div className="timer-display border rounded p-4 mt-4">
          <h2 className="mb-3">Time Remaining:</h2>
          {/* Display formatted time left */}
          <p className="fs-5 fw-bold">
            {remainingTime.days} Days : {remainingTime.hours} Hours :{" "}
            {remainingTime.minutes} Minutes : {remainingTime.seconds} Seconds
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
