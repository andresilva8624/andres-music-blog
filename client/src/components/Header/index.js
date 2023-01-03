import React from 'react';
import coverImage from '../../images/room2.jpg';

function Header(props) {

  return (
    <header className="flex-row space-between px-1">
      <h1>Welcome to Andre's Music Blog <span><h3>Home for Guitarists ©</h3></span></h1>
     
      
      <img src={coverImage} alt="wooden background"></img>
      {props.children}
      
    </header>
    
  );
  
}

export default Header;
