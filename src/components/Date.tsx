import { useEffect, useState } from "react";
import "./Date.css";
export const DateTime = (): JSX.Element => {
  var [date, setDate] = useState<Date>(new Date());
  const weekday: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    var timer: ReturnType<typeof setInterval> = setInterval(() => {
      var now: number = new Date().getTime();
      var setupTime: number = parseInt(
        localStorage.getItem("setupTime") || "{}"
      );
      if (setupTime == null) {
        localStorage.setItem("setupTime", now.toString());
      } else {
        if (now - setupTime > 24 * 60 * 60 * 1000) {
          localStorage.clear();
          localStorage.setItem("setupTime", now.toString());
        }
      }
      setDate(new Date());
    }, 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className="sticky-notes">
      <table className="box">
        <tbody>
          <tr>
            <td className="date" rowSpan={2} colSpan={2}>
              {date.getDate()}
            </td>
            <td className="month">
              {date.toLocaleString("en-us", { month: "short" })}
            </td>
            <td className="day" rowSpan={2}>
              {weekday[date.getUTCDay()]}
            </td>
          </tr>
          <tr>
            <td className="year">{date.getFullYear()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DateTime;
