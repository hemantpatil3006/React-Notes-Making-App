import React from 'react'
import image from '../../assets/image.png';
import { MdLock as Lock } from "react-icons/md";
// Standard CSS used

function FallbackPage() {
  return (
    <div className="fallback-main">
        <div className="fallback-container">
            <div className="fallback-image-container">
                <img src={image} alt="pocket notes" className="fallback-image" />
            </div>
            <h2>Pocket Notes</h2>
            <p className="fallback-text">Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>
        <div className="fallback-footer"><Lock />end-to-end encrypted</div>
    </div>
  )
}

export default FallbackPage