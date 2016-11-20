"use strict";

import React, {PropTypes} from "react";

export const CustomLightBox = ({imageObject, closeLightbox}) => {
    let title, description, date;
    let openLink = () => window.open(imageObject.link, "_blank");
    if (imageObject.title) title = imageObject.title;
    if (imageObject.description) description = imageObject.description;
    if (imageObject.published) date = imageObject.published;
    return (
    <div className="lightbox">
        <div className="closeSearchDivLB">
            <span onClick={closeLightbox} className="closeSearchButtonLB">X</span>
        </div>
        <div className="lightboxTextDiv row">
            <div className="col-md-7">
                <span className="photoTitleTextLB">{title}</span>
                <br/>
                <span className="photoDateTextLB">{description}</span>
            </div>
        </div>
        <table className="lightboxTable">
            <tr>
                <td align="center" className="lightboxTableCell">
                    <img src={imageObject.image} className="centerImage" />
                </td>
            </tr>
        </table>
        <div className="openPhotoLinkDiv">
            <div onClick={openLink} className="openPhotoLink text-center">
                <span className="openPhotoLinkText">View at Source</span>
            </div>

        </div>
    </div>
    );
};

CustomLightBox.propTypes = {
    imageObject: PropTypes.object.isRequired,
    closeLightbox: PropTypes.func
};