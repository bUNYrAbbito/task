import React, { forwardRef } from "react"; // Needed for older React versions
import "./pdf.css";
import Intro from "../pdfcompo/intro";


const Pdf = forwardRef(function Pdf({ data }, ref) {
  return (
    <div ref={ref} className="pdf-wrapper">
      <Intro data={data}></Intro>
      
    </div>
  );
});

export default Pdf;
