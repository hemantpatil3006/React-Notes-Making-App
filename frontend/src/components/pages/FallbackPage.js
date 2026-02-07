import React from 'react'
import styles from './FallbackPage.module.css';
import image from '../../assets/image.png';
import { MdLock as Lock } from "react-icons/md";

function FallbackPage() {
  return (
    <div className={styles['fallback-main']}>
        <div className={styles['fallback-container']}>
            <div className={styles['fallback-image-container']}>
                <img src={image} alt="pocket notes" className={styles['fallback-image']} />
            </div>
            <h2>Pocket Notes</h2>
            <p className={styles['fallback-text']}>Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>
        <div className={styles['fallback-footer']}><Lock />end-to-end encrypted</div>
    </div>
  )
}

export default FallbackPage