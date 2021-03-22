import React, { useState } from "react";

import BackButton from "../components/BackButton";
import ContentButton from "../components/ContentButton";
import Background from "../components/Background";
import Bench from "../components/Bench";
import styled from "styled-components";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { Document, Page } from "react-pdf";
import pdf from "../pdf/ArdashWorksheet-MVP Student Handbook_FinalPages_3Feb21.pdf";
//! This PDF must be import to display

const Wrapper = styled.div`
  height: 100%;
  .pdfViewer {
    position: absolute;
    top: 16%;
    overflow: scroll;
    width: auto;
    height: 800px;
    right: 15%;
  }

  .bench {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .characterViewer{
    position: absolute;
    left: 10%;
    bottom: 10%;
  }
`;

const Ardash = () => {
  const chra = localStorage.getItem("character");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <Wrapper>
      <Background>
        <div className="character-name">
          <img
            src={JSON.parse(chra).image.source}
            alt={JSON.parse(chra).image.alt}
            className="characterViewer"
          />
        </div>
        <Document
          file={pdf}
          className="pdfViewer"
          options={{ workerSrc: "/public/pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              className="something"
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
          ))}
        </Document>
        <a width="320" height="240"
          className="hollow button primary"
          style={{ position:'absolute', right:"22%", bottom:"10%"}}
          href={pdf}
          >
          Download PDF Here
        </a>
        
        <Bench className="bench"></Bench>
      </Background>
      <BackButton />
      <ContentButton />
    </Wrapper>
  );
};
export default withRouter(Ardash);
