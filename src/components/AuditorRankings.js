import React from "react";
import Footer2 from "./Footer2";

const AuditorRankings = () => {
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
          This is the start of the Auditor Ranking Dashboard, though we are
          working on continually expanding it. We are also working on a way to
          make it more interactive, so that you can sort and filter the data
          even more.
        </p>
        <p>
          Currently, we take eight public data points and then rank the auditors
          based on those. As more data is entered and more audits are gathered,
          the rankings will continually fluctuate. However, this report will
          always be here.
        </p>
        <p>
          Soon enough, we'll open up our GitHub to let others contribute to this
          project.
        </p>
      </section>
      <section>
        <iframe
          title="Report Section"
          width="1000"
          height="600"
          src="https://app.powerbi.com/view?r=eyJrIjoiZWMxZGM5NTgtOGFhMS00ZjliLWI4NTMtNjAwYjc4YTc3YzQ4IiwidCI6ImNkMjEzNjNiLWNmMDMtNDcwMi1iOTliLWUxZDJlNThhZTk2ZiIsImMiOjZ9&pageName=ReportSection29b208b81918bc1e3da4"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </section>
      <Footer2 />
    </div>
  );
};

export default AuditorRankings;
