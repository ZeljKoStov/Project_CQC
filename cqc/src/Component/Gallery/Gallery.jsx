

import React, { useState } from 'react'
import './Gallery.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Modal } from '../../Component';
import { MdClear } from "react-icons/md";

const Gallery = ({ images }) => {

    const [index, setIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [imageToShow, setImageToShow] = useState(images[0]);

    const handlePrevClick = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };



    return (
        <div className='gallery'>

            <div className="button-container">
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="gallery_button"
                    onClick={handlePrevClick}
                />
                <img src={images[index]} alt="Gallery" onClick={() => {
                    setOpenModal(true)
                    setImageToShow(images[index])
                }} />
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="gallery_button"
                    onClick={handleNextClick}
                />
            </div>

            {openModal &&
                <div onClick={() => setOpenModal(false)} className='header_overlay'>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className='header_modalContainer'
                    >
                        <div className='header_escape' onClick={() => setOpenModal(false)}>
                            <MdClear size={"2rem"} />
                        </div>

                        <img src={imageToShow} alt='focused_image' />
                    </div>
                </div>
            }
        </div>



    )
}

export default Gallery
