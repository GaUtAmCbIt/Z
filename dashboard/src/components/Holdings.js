import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { VerticalGraphs } from "./VerticalGraphs";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("https://zerodhaclonebygautam.onrender.com/allHoldings").then((res) => {
      console.log(res.data);
      setAllHoldings(res.data);
    });
  }, []);

  const labels = allHoldings.map((i) => i["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Prices ",
        data: allHoldings.map((i) => i["price"]),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((i, index) => {
            const curValue = i.price * i.qty;
            const isProfit = curValue - i.qty * i.avg >= 0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = i.isLoss ? "loss" : "profit";
            return (
              <tr key={index}>
                <td>{i.name}</td>
                <td>{i.qty}</td>
                <td>{i.avg.toFixed(2)}</td>
                <td>{i.price.toFixed(2)}</td>
                <td>{curValue}</td>
                <td className={profClass}>
                  {(curValue - i.qty * i.avg).toFixed(2)}
                </td>
                <td className={profClass}>{i.net}</td>
                <td className={dayClass}>{i.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraphs data={data} />
    </>
  );
};

export default Holdings;
