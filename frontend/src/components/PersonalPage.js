import React, { Component } from 'react';
import $ from 'jquery';
import '../App.css';
import Header from './resume/Header';
import About from './resume/About';
import Resume from './resume/Resume';

class PersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: {}
    };
  }

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    return (
      <div className='PersonalWebsite'>
        <Header data={this.state.resumeData.main}/>
        <About data={this.state.resumeData.main}/>
        <Resume data={this.state.resumeData.resume}/>
      </div>
    );
  }
}


export default PersonalPage;