import React, { Component } from 'react';
import { ProgressBar } from './ProgressBar';

export class ProgressDemo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        jobs: {}
    }
    console.log("SignalR connection: ", props.signalRConnection);
    this.updateJob = this.updateJob.bind(this);
    this.spawnNewJob = this.spawnNewJob.bind(this);

    props.signalRConnection && props.signalRConnection.on("UpdateJobProgress", (jobId, progress) => this.updateJob(jobId, progress));
  }

  updateJob(jobId, progress) {
      console.log("Should update job: " + jobId + " with progress " + progress);
      let jobs = this.state.jobs;
      if (jobs[jobId] != null) {
        jobs[jobId] = progress;
        this.setState({
            jobs: jobs
        });
      }
  }

  async spawnNewJob() {
    const jobRespons = await fetch('weatherforecast/backgroundjob/' + this.props.signalRConnection.connection.connectionId);
    jobRespons.json().then((jobId) => {
      let jobs = this.state.jobs;
      jobs[jobId] = 0;
      this.setState({
          jobs: jobs
      });
    });
  }

  render() {
    return (
      <>
        <h1>ProgressDemo</h1>
        <button className="btn btn-primary" onClick={() => this.spawnNewJob()}>Start new job</button>
          {
              Object.keys(this.state.jobs).map((jobKey) => (
                <div key={"job_" + jobKey}>
                  <p>progress {jobKey}: {this.state.jobs[jobKey]}</p>
                  <ProgressBar progress={this.state.jobs[jobKey]} />
                </div>
              ))
          }
      </>
    );
  }
}
