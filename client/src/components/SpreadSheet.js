import React, { useState, useEffect } from "react";
import "./SpreadSheet.css";

function SpreadSheet({ sheet, isOpen }) {

  return (
    <div>
      {isOpen ? (
        <section className="table">
          <table>
            <thead>
              <tr>
                <th>Expense</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {sheet.map((data, idx) => (
                <tr key={data.__rowNum__}>
                  <th>{data.Expense}</th>
                  <th>{data.Amount}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}
    </div>
  );
}

export default SpreadSheet;
