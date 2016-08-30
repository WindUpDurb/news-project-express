"use strict";

import React, {PropTypes} from "react";

export const NavbarPresentation = ({activeSearch, openSearch}) => {
    let googleSearch = () => openSearch("Google");
    let googleIcon;
    if (activeSearch && activeSearch === "Google") {
        googleIcon = <img onClick={googleSearch} className="googleIcon" src="/statics/google.png"/>;
    } else {
        googleIcon = <img onClick={googleSearch} className="imageEffect googleIcon" src="/statics/google.png"/>;

    }
    return (
          <div id="navbarDiv">
              <img id="newsPaperIcon" src="/statics/newspaper.png" />
              <img id="pictureIcon" src="/statics/picture.png" />
              <div className="row">
                <div className="col-md-2">
                    <div className="navIconDiv">
                        {googleIcon}
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
    openSearch: PropTypes.func,
    activeSearch: PropTypes.string
};