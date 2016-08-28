"use strict";

import React, {PropTypes} from "react";
import {SkyLightStateless} from "react-skylight";

export const NewsModal = ({news, currentModal, index, closeModal}) => {
    let description, open;
    if (index === currentModal) open = true;
    if (news && news.description) description = news.description;
    let style = {height: "auto", width: "100%"};
    return (
          <SkyLightStateless onCloseClicked={closeModal}
                             isVisible={open}
                             dialogStyles={style}>
              <div className="row">
                  <div className="col-md-6 col-md-offset-1">
                      <img src="/statics/cnnIcon.png" className="newsIcon"/>
                      <br/>
                      <span className="modalTitle">{news.title}</span>
                      <br/>
                      <span>{news.published}</span>
                  </div>
              </div>
              <div style={{paddingTop: "3%"}} className="row">
                  <div className="col-md-6 col-md-offset-1">
                      <img src={news.image} className="img-responsive" />
                      <span className="newsDescription">{description}</span>
                  </div>
              </div>
              <div style={{paddingTop: "2%"}} className="row">
                  <a href={news.link} target="_blank">
                      <div className="text-center linkToNews col-md-6 col-md-offset-1">
                          <span className="linkToNewsText">Read</span>
                      </div>
                  </a>
              </div>
              <div onClick={closeModal} className="tabDiv">
                  <img src="/statics/tab-cross.png" className="tabCross"/>
              </div>

          </SkyLightStateless>
    );
};

NewsModal.propTypes = {
    index: PropTypes.number,
    currentModal: PropTypes.number,
    news: PropTypes.object,
    closeModal: PropTypes.func
};