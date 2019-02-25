import React, { Component } from "react";
import { HorizontalBar, Line, Pie, Bar } from "react-chartjs-2";

class RecruiterChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toptenjobdata: this.props.toptenjobdata,
      lasttenjobdata: this.props.lasttenjobdata
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City"
  };

  render() {
    return (
      <div className="chart row">
        <div className="col-md-6">
          <HorizontalBar
            data={this.state.toptenjobdata}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "Applications per month for first 10 postings", // + this.props.location,
                fontSize: 25
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
          />
        </div>
        <div className="col-md-6">
          <Bar
            data={this.state.lasttenjobdata}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "Jobs with fewer applicants", //+ this.props.location,
                fontSize: 25
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
          />
        </div>
        {/* <div className="col-md-4">
          <Pie
            data={this.state.chartData}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "City wise applications", // + this.props.location,
                fontSize: 25
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
          />
        </div> */}
      </div>
    );
  }
}

export default RecruiterChart;
