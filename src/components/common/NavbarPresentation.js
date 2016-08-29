"use strict";

import React, {PropTypes} from "react";

export const NavbarPresentation = () => {

  return (
      <div id="navbarDiv">
        <div className="row">
            <div className="col-md-2">
                <div className="navIconDiv">
                    <img className="imageEffect googleIcon" src="/statics/google.png"/>
                </div>
            </div>
            <div style={{paddingTop: "0.4%"}} className="col-md-offset-8 col-md-2">
                <div>
                    <span style={{fontSize: "1.3em"}}>Wind-Up</span>
                </div>
                <span>Something bout something</span>
            </div>
        </div>
      </div>
  );
};

NavbarPresentation.propTypes = {

};