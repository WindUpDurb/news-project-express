"use strict";

import React, {PropTypes} from "react";

export const NavbarPresentation = ({activeSearch, searchType, changeDirectory, activeDirectory, openSearch}) => {
    let googleSearch = () => openSearch("Google");
    let changeToNews = () => changeDirectory("news");
    let changeToPhotos = () => changeDirectory("photos");
    let googleIcon, newsIcon, photoIcon;
    if (activeSearch && searchType === "Google") {
        googleIcon = <img onClick={googleSearch} className="googleIcon" src="/statics/google.png"/>;
    } else {
        googleIcon = <img onClick={googleSearch} className="imageEffect googleIcon" src="/statics/google.png"/>;

    }
    newsIcon = <img onClick={changeToNews} id="newsPaperIcon" className="iconHoverEffect" src="/statics/newspaper.png" />;
    photoIcon = <img onClick={changeToPhotos} id="pictureIcon" className="iconHoverEffect" src="/statics/picture.png" />;
    activeDirectory === "photos" ? (
        photoIcon = <img onClick={changeToPhotos} id="pictureIcon" src="/statics/picture.png" />
    ) : (
        newsIcon = <img onClick={changeToNews} id="newsPaperIcon" src="/statics/newspaper.png" />
    );
    return (
          <div id="navbarDiv">
              <div className="row">
                <div className="col-xs-5 col-md-4">
                    <div className="navIconDiv">
                        <div className="additionalIconDiv">{googleIcon}</div>
                        <div className="additionalIconDiv">{newsIcon}</div>
                        <div className="additionalIconDiv">{photoIcon}</div>
                    </div>
                </div>

                  {/*<div className="col-xs-offset-1 text-center col-xs-5">*/}
                      {/*{newsIcon}*/}
                      {/*{photoIcon}*/}
                  {/*</div>*/}

                <div style={{paddingTop: "0.4%"}} className="col-xs-offset-4 col-xs-4">
                    <div className="pull-right">
                        <span style={{fontSize: "1.3em"}}>Imageread</span>
                        <div>
                            <span>Links to the Current World &nbsp; &nbsp; &nbsp;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

NavbarPresentation.propTypes = {
    changeDirectory: PropTypes.func,
    openSearch: PropTypes.func,
    activeDirectory: PropTypes.string,
    searchType: PropTypes.string,
    activeSearch: PropTypes.bool
};