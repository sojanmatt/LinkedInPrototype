import React, { Component } from "react";
import { HorizontalBar, Bar, Line, Pie } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      savedJobData: props.savedJobData,
      clickJobData: props.clickJobData
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
            data={this.state.clickJobData}
            options={{
              title: {
                display: false,
                text: "Clicks Per Job Posting", // + this.props.location,
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
          {/* <Line
            data={this.state.savedJobData}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "Saved Jobs ", //+ this.props.location,
                fontSize: 25
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
          /> */}
          <Bar
            data={this.state.savedJobData}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "Saved Jobs", // + this.props.location,
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
                text: "Trace Diagram ", // + this.props.location,
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

export default Chart;