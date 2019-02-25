import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import sample from './Redux.pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';
 
class MyApp extends Component {
  state = {
    numPages: 11,
    pageNumber: 1,
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
 
    return (
      <div>
        <Document
          file={sample}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          {
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ),
                )
              }
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}

export default MyApp;