"use strict";

import React, {PropTypes} from "react";

export const NewsModal = ({index, news, closeModal}) => {
    console.log("News Object: ", news)
    let close = () => closeModal(index);
    let description;
    if (news && news.description) description = news.description;
    return (
          <div id={`newsModal${index}`} className="modal">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <button onClick={close} type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 className="modal-title">Modal title</h4>
                    </div>
                     <div className="modal-body">
                          <p>{description}</p>
                    </div>
                    <div className="modal-footer">
                          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                 </div>
            </div>
        </div>
    );
};

NewsModal.propTypes = {
    index: PropTypes.number,
    news: PropTypes.object,
    closeModal: PropTypes.func
};