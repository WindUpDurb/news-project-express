"use strict";

import React, {PropTypes} from "react";

export const CustomLightBox = ({imageObject}) => {
    
    return (
    <div className="lightbox">
        <table className="lightboxTable">
            <tr>
                <td align="center" className="lightboxTableCell">
                    <img className="centerImage" />
                </td>
            </tr>
        </table>
    </div>
    );
};

CustomLightBox.propTypes = {
    imageObject: PropTypes.object.isRequired
};