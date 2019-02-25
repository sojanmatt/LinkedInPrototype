import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import sample from './Redux.pdf'
// import sample from 'C:/Users/akil/Desktop/LinkedIn_ProjectTeam_1/LinkedIn-Team1/LinkedIn-Backend/uploads/resume-samples.pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { connect } from "react-redux";
import axios from "axios";
import Header from '../Header/Header';
import {Redirect} from 'react-router';
 
class ViewApplicantResumePDF extends Component {
  constructor(props){
    super(props);
    this.state = {
      numPages: 11,
      pageNumber: 1,
      resumeDisplay : ""
    }
}
  


  async componentDidMount(){
    if(this.props.ViewApplicantResume) {
    var resume = null;
    console.log("resumeresumeresume",this.props.ViewApplicantResume.resume);
      var data = {
        "resumeName": this.props.ViewApplicantResume.resume
      }
                 await axios.post('http://localhost:3001/download/'+ this.props.ViewApplicantResume.resume)
            .then(async (response)  => {
              resume = 'data:image/jpg;base64, ' + response.data;
            })

            this.setState({
              resumeDisplay: resume
            })
      
  }

  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    var redirectVar = null;

        if(!this.props.loginStateStore) {
            redirectVar = <Redirect to= "/signup"/>
        }
    const { pageNumber, numPages } = this.state;
 
    return (
      <div>
        {redirectVar}
        <Header/>
        <Document
          file={this.state.resumeDisplay}
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

// export default MyApp;
const mapStateToProps = state =>({
  ViewApplicantResume : state.ViewApplicantResume.result,
  loginStateStore : state.Login.result
});

//export default JobDisplayPage;
export default connect(mapStateToProps, {})(ViewApplicantResumePDF);