import React, { Component } from 'react';

class Header extends Component {
  render() {
    if(this.props.data){
      var name = this.props.data.name;
      var occupation= this.props.data.occupation;
      var city= this.props.data.address.city;
      var networks= this.props.data.social.map(function(network){
        return <li key={network.name}><a href={network.url} target='_blank' rel='noopener noreferrer'><i className={network.className} /></a></li>
      })
    }

    return (
      <header id="home" className='align-content-center'>
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

          <div className='navbar-nav'>
            <ul id="nav" className="nav align-content-center">
              <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
              <li><a className="smoothscroll" href="#about">About</a></li>
              <li><a className="smoothscroll" href="#resume">Resume</a></li>
            </ul>
          </div>

        </nav>

        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline">I'm {name}.</h1>
            <h3>I am a <span>{occupation}</span> based in <span>{city}</span>. Currently employed by <span>JP Morgan Chase & CO.</span> specializing in <span>cloud base application development and microservices.</span></h3>
            <hr />
            <ul className="social">
              {networks}
            </ul>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about"><i className="icon-down-circle" /></a>
        </p>
      </header>
    );
  }
}

export default Header;
