import React from 'react';
import '../App';
import Footer2 from './Footer2';
import Header from './Header';

const Rankings = () => {
  return (
    <div>
        <Header />
      <h1>Auditor Rankings</h1>
      <p>This is the start of the Auditor Ranking Dashboard, though we are working on continually expanding it. We are also working on a way to make it more interactive, so that you can sort and filter the data even more.
            Currently, we take eight public data points and then rank the auditors based on those, those as more data is entered, and more audits are gathered, then the rankings will continually fluctuate, though this report will always be here. 
            Soon enough, we'll open up our github to let others contribute to this project. 
        </p>
      <center><iframe title="Report Section" width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiZWMxZGM5NTgtOGFhMS00ZjliLWI4NTMtNjAwYjc4YTc3YzQ4IiwidCI6ImNkMjEzNjNiLWNmMDMtNDcwMi1iOTliLWUxZDJlNThhZTk2ZiIsImMiOjZ9&pageName=ReportSection29b208b81918bc1e3da4" frameborder="0" allowFullScreen="true"></iframe></center>
      <Footer2 />
    </div>
  );
};

export default Rankings;
