import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footerIcons">
        <a
          href="https://github.com/OriBerco"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a
          href="http://linkedin.com/in/oriberco/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a
          href="https://github.com/OriBerco"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="http://linkedin.com/in/oriberco/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
      <h6>Ori Berco &copy; {new Date().getFullYear()}</h6>
    </div>
  );
}
