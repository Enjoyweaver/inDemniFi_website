import React from "react";
import Footer2 from "./Footer2";

const sectionItemStyle = {
  marginTop: "10px",
  marginBottom: "65px",
  padding: "15px",
  border: "1px solid lightgray",
  borderRadius: "5px",
  backgroundColor: "rgba(166, 166, 166, 0.3)",
};

const Certifications = () => {
  return (
    <div>
      <section
        style={{
          fontSize: "1.7em",
          textAlign: "center",
          color: "lightblue",
          width: "70vw",
        }}
      >
        <h2>Crypto Risk and Insurance Certifications</h2>

        <p>
          inDemniFi is committed to enhancing the safety and security of the
          Web3 ecosystem by providing comprehensive risk assessment, insurance,
          and training solutions. We recognize the critical role of skilled
          professionals in identifying, analyzing, and mitigating crypto-related
          risks. To address this need, we are developing a series of
          certifications and training programs for five key roles:
        </p>

        <div>
          <ul style={{ listStyleType: "none", marginBottom: "80px" }}>
            <li>Crypto Exploit Technician</li>
            <li>Certified Crypto Exploit Specialist</li>
            <li>Chartered Crypto Exploit Underwriter</li>
            <li>Chartered Crypto Exploit Actuary</li>
            <li>Certified Crypto / DeFi Auditor</li>
          </ul>
        </div>
      </section>
      <section
        style={{
          fontSize: "1.3em",
          textAlign: "center",
          color: "lightblue",
          width: "70vw",
        }}
      >
        <div style={sectionItemStyle}>
          <h2>Crypto Exploit Technician</h2>

          <p>
            The Crypto Exploit Technician role is open to individuals worldwide
            interested in contributing crypto exploit data to our database. You
            can provide this information through our dedicated forms, developed
            on the Deform App platform. Access these forms through their{" "}
            <a
              href="https://app.deform.cc/"
              style={{
                color: "inherit",
                textDecoration: "underline",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#004aad")}
              onMouseLeave={(e) => (e.target.style.color = "inherit")}
            >
              website
            </a>{" "}
            and easily create your own. Follow them on{" "}
            <a
              href="https://twitter.com/deformapp"
              style={{
                color: "inherit",
                textDecoration: "underline",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#004aad")}
              onMouseLeave={(e) => (e.target.style.color = "inherit")}
            >
              Twitter
            </a>
            .
          </p>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <a
                href="https://indemnifi.deform.cc/exploit"
                style={{ color: "inherit", textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = "#004aad")}
                onMouseLeave={(e) => (e.target.style.color = "inherit")}
              >
                Click here for the Exploit Form{" "}
              </a>
            </div>
          </div>
          <p>
            After completing 10 complete and error-free submissions, then you
            will earn the "Crypto Exploit Technician" certification, verified
            permanently on-chain with an NFT, giving you trustless rights to
            future earnings with inDemniFi.
          </p>

          <h3>Key Responsibilities:</h3>
          <ul style={{ listStyleType: "none" }}>
            <li>
              Be the primary source of exploit information, ensuring
              reliability, honesty, and accuracy.
            </li>
            <li>
              Stay up todate on the most recent exploits and report timely.
            </li>
            <li>Collaborate to verify and authenticate exploit information.</li>
            <li>
              Ensure provided data adheres to standardized formats for analysis.
            </li>
          </ul>

          <h3>Contribution to Web3 Safety:</h3>
          <ul style={{ listStyleType: "none" }}>
            <li>
              Provide crucial, reliable, and consistent exploit data for Web3
              security.
            </li>
            <li>
              Enhance web3 security by improving research and investigative
              techniques.
            </li>
            <li>
              Promote a security culture in the Web3 community by sharing
              reliable data.
            </li>
          </ul>
        </div>
        <div style={sectionItemStyle}>
          <h2>Certified Crypto Exploit Specialist</h2>

          <p>
            The Certified Crypto Exploit Specialist (CCES) certification is
            designed for individuals who specialize in verifiying, organizing,
            researching, and analyzing crypto exploit data. CCES professionals
            play a crucial role in providing the foundation for risk assessment
            and underwriting processes.
          </p>

          <h3>Key Responsibilities:</h3>

          <div>
            <ul style={{ listStyleType: "none" }}>
              <li>
                Gather and collect data from various sources related to crypto
                exploits.
              </li>
              <li>
                Organize and analyze crypto exploit data to identify trends and
                patterns.
              </li>
              <li>
                Develop and implement data management and analysis
                methodologies.
              </li>
              <li>
                Prepare reports and presentations to communicate findings to
                stakeholders.
              </li>
            </ul>

            <h3>Contribution to Web3 Safety:</h3>

            <ul style={{ listStyleType: "none" }}>
              <li>
                Enhanced understanding of crypto exploit risks and
                vulnerabilities.
              </li>
              <li>
                Improved data-driven decision-making for risk mitigation
                strategies.
              </li>
              <li>
                Development of effective prevention and response measures.
              </li>
            </ul>
          </div>
        </div>
        <div style={sectionItemStyle}>
          <h2>Chartered Crypto Exploit Underwriter</h2>

          <p>
            The Chartered Crypto Exploit Underwriter (CCEU) certification is for
            individuals who possess expertise in assessing and underwriting
            crypto-related risks individually and against an industry. CCEU
            professionals are responsible for evaluating the likelihood and
            severity of crypto exploits and determining appropriate underwriting
            frameworks and criteria.
          </p>

          <h3>Key Responsibilities:</h3>

          <div>
            <ul style={{ listStyleType: "none" }}>
              <li>
                Conduct comprehensive risk assessments of crypto projects and
                protocols.
              </li>
              <li>
                Analyze crypto exploit data to identify potential risks and
                vulnerabilities.
              </li>
              <li>
                Develop and implement underwriting guidelines and risk
                management strategies.
              </li>
              <li>
                Evaluate insurance applications and determine underwriting
                profitibility.
              </li>
            </ul>

            <h3>Contribution to Web3 Safety:</h3>

            <ul style={{ listStyleType: "none" }}>
              <li>
                Accurate assessment of crypto-related risks to ensure fair and
                equitable insurance underwriting.
              </li>
              <li>
                Development of tailored insurance products to address specific
                Web3 risks.
              </li>
              <li>
                Promotion of risk awareness and mitigation practices among Web3
                participants.
              </li>
            </ul>
          </div>
        </div>
        <div style={sectionItemStyle}>
          <h2>Chartered Crypto Exploit Actuary</h2>

          <p>
            The Chartered Crypto Exploit Actuary (CCEA) certification is
            designed for individuals who specialize in applying actuarial
            principles to crypto risk assessment and insurance. CCEAs play a
            critical role in developing and managing actuarial models for
            crypto-related risks.
          </p>

          <h3>Key Responsibilities:</h3>

          <div>
            <ul style={{ listStyleType: "none" }}>
              <li>
                Develop and maintain actuarial models for crypto exploit risks.
              </li>
              <li>
                Analyze historical and emerging crypto exploit data to inform
                model development.
              </li>
              <li>
                Conduct actuarial studies to assess the financial impact of
                crypto exploits.
              </li>
              <li>
                Provide actuarial advice on risk management strategies and
                insurance pricing.
              </li>
            </ul>
          </div>

          <h3>Contribution to Web3 Safety:</h3>

          <div>
            <ul style={{ listStyleType: "none" }}>
              <li>
                Development of sophisticated risk assessment models for
                crypto-related risks.
              </li>
              <li>
                Improved pricing of crypto insurance products based on actuarial
                principles.
              </li>
              <li>
                Sound actuarial guidance for risk management and insurance
                decisions in the Web3 space.
              </li>
            </ul>
          </div>
        </div>

        <div style={sectionItemStyle}>
          <h2>Certified Crypto Auditor</h2>

          <p>
            The Certified Crypto Auditor (CCA) certification is reserved for
            individuals with proven expertise in open-logic programming
            languages and a thorough understanding of exploit vulnerabilities
            within the Web3 ecosystem. CCAs are entrusted with assessing and
            ensuring the integrity and security of crypto.
          </p>

          <h3>Key Responsibilities:</h3>

          <ul style={{ listStyleType: "none" }}>
            <li>
              Conduct comprehensive audits and assessments of smart contracts
              and dApps for vulnerabilities and exploit risks.
            </li>
            <li>
              Verify the adherence of crypto applications to established
              security standards and best practices.
            </li>
            <li>
              Identify and report potential exploit vulnerabilities and security
              loopholes within decentralized systems.
            </li>
            <li>
              Collaborate with developers to enhance code security and mitigate
              identified vulnerabilities.
            </li>
          </ul>

          <h3>Contribution to Web3 Safety:</h3>

          <ul style={{ listStyleType: "none" }}>
            <li>
              Ensure the credibility and security of crypto applications by
              identifying and rectifying potential exploit vulnerabilities.
            </li>
            <li>
              Facilitate the creation and maintenance of auditable, secure, and
              transparent decentralized systems within the Web3 ecosystem.
            </li>
            <li>
              Promote a security-conscious culture by educating developers and
              stakeholders on best security practices and vulnerability
              remediation.
            </li>
          </ul>
        </div>

        <h2>inDemniFi's Commitment to Training</h2>

        <p>
          inDemniFi is committed to providing comprehensive training programs
          for individuals pursuing the CET, CCES, CCEU, and CCEA certifications.
          Our training programs will cover the latest knowledge and skills
          required to investigate, analyze, and underwrite crypto-related risks
          and contribute to the safety and security of the Web3 ecosystem.
        </p>
        <p>
          We believe that by empowering individuals with the necessary
          expertise, we can foster a more resilient and secure Web3 environment
          for all.
        </p>
      </section>
      <Footer2 />
    </div>
  );
};

export default Certifications;
