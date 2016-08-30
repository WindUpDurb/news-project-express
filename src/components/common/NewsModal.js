"use strict";

import React, {PropTypes} from "react";


export const NewsModal = ({news, closeModal}) => {
    if (news && news.link) {
        let description, icon, image;
        let close = () => closeModal(null);
        if (news && news.description) description = news.description;
        return (
            <div id="customModalNews">
                <div className="row">
                    <div className="col-xs-7 col-xs-offset-1 col-md-10 col-md-offset-1">
                        <img src={news.icon} className="newsIcon"/>
                        <br/>
                        <span className="modalTitle">{news.title}</span>
                        <br/>
                        <span>{news.published}</span>
                    </div>
                </div>
                <div style={{paddingTop: "3%"}} className="row">
                    <div className="col-xs-7 col-xs-offset-1 col-md-10 col-md-offset-1">
                        <img src={news.image} className="img-responsive" />
                        <span className="newsDescription">{description}</span>
                    </div>
                </div>
                <div style={{paddingTop: "2%"}} className="row">
                    <a href={news.link} target="_blank">
                        <div className="text-center linkToNews col-xs-7 col-xs-offset-1 col-md-6 col-md-offset-1">
                            <span className="linkToNewsText">Read</span>
                        </div>
                    </a>
                </div>
                <div onClick={closeModal} className="tabDiv">
                    <img src="/statics/tab-cross.png" className="tabCross"/>
                </div>

            </div>
        );
    } else {
        return <div></div>;
    }

};
/*export const NewsModal = ({news, currentModal, index, closeModal}) => {
    let description, open, icon, image;
    let style = {height: "auto", width: "100%"};
    if (index === currentModal) open = true;
    if (news && news.description) description = news.description;
    if (news && news.source === "CNN") icon = <img src="/statics/cnnIcon.png" className="newsIcon"/>;
    if (news && news.source === "CNN") image = <img src={news.image} className="img-responsive" />;
    if (news && news.source === "IGN") icon = <img src="/statics/ignIcon.png" className="newsIcon"/>;
    if (news && news.source === "IGN") image = <img src="/statics/ignImage.png" className="img-responsive" />;
    return (
          <SkyLightStateless onCloseClicked={closeModal}
                             isVisible={open}
                             dialogStyles={style}>
              <div className="row">
                  <div className="col-xs-7 col-xs-offset-1 col-md-6 col-md-offset-1">
                      {icon}
                      <br/>
                      <span className="modalTitle">{news.title}</span>
                      <br/>
                      <span>{news.published}</span>
                  </div>
              </div>
              <div style={{paddingTop: "3%"}} className="row">
                  <div className="col-xs-7 col-xs-offset-1 col-md-6 col-md-offset-1">
                      {image}
                      <span className="newsDescription">{description}</span>
                  </div>
              </div>
              <div style={{paddingTop: "2%"}} className="row">
                  <a href={news.link} target="_blank">
                      <div className="text-center linkToNews col-xs-7 col-xs-offset-1 col-md-6 col-md-offset-1">
                          <span className="linkToNewsText">Read</span>
                      </div>
                  </a>
              </div>
              <div onClick={closeModal} className="tabDiv">
                  <img src="/statics/tab-cross.png" className="tabCross"/>
              </div>

          </SkyLightStateless>
    );
};*/

NewsModal.propTypes = {
    index: PropTypes.number,
    currentModal: PropTypes.number,
    news: PropTypes.object,
    closeModal: PropTypes.func
};