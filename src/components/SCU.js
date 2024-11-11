import React from "react";
import Footer2 from "./Footer2";

const SCU = () => {
  return (
    <div>
      <section
        id="about"
        className="narrow-section"
        style={{
          fontSize: "1.7em",
          color: "lightblue",
          width: "80vw",
          margin: "0 auto", // Center align content horizontally
        }}
      >
        <p>
          This is the start of the State of Crypto Underwriting Dashboard, which
          will be updated as the Exploit Technicians add exploit data. So check
          back often as it will be updated regularly.
        </p>
      </section>
      <section>
        <iframe
          title="Report Section"
          width="1000"
          height="600"
          src="https://app.powerbi.com/view?r=eyJrIjoiZDJmYmQ2NmItYmRkYi00M2QyLWJmMWUtNDUwODNlY2I5M2MxIiwidCI6ImNkMjEzNjNiLWNmMDMtNDcwMi1iOTliLWUxZDJlNThhZTk2ZiIsImMiOjZ9"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </section>
      <Footer2 />
    </div>
  );
};

export default SCU;
