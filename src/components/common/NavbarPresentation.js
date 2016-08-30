"use strict";

import React, {PropTypes} from "react";

export const NavbarPresentation = ({activeSearch, changeDirectory, activeDirectory, openSearch}) => {
    let googleSearch = () => openSearch("Google");
    let changeToNews = () => changeDirectory("news");
    let changeToPhotos = () => changeDirectory("photos");
    let googleIcon, newsIcon, photoIcon;
    if (activeSearch && activeSearch === "Google") {
        googleIcon = <img onClick={googleSearch} className="googleIcon" src="/statics/google.png"/>;
    } else {
        googleIcon = <img onClick={googleSearch} className="imageEffect googleIcon" src="/statics/google.png"/>;

    }
    newsIcon = <img onClick={changeToNews} id="newsPaperIcon" className="iconHoverEffect" src="/statics/newspaper.png" />;
    photoIcon = <img onClick={changeToPhotos} id="pictureIcon" className="iconHoverEffect" src="/statics/picture.png" />;
    console.log("Active Directory: ", activeDirectory)
    activeDirectory === "photos" ? (
        photoIcon = <img onClick={changeToPhotos} id="pictureIcon" src="/statics/picture.png" />
    ) : (
        newsIcon = <img onClick={changeToNews} id="newsPaperIcon" src="/statics/newspaper.png" />
    );
    return (
          <div id="navbarDiv">
              {newsIcon}
              {photoIcon}
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
    changeDirectory: PropTypes.func,
    openSearch: PropTypes.func,
    activeDirectory: PropTypes.string,
    activeSearch: PropTypes.string
};