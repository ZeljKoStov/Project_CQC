

import React, { useState, useEffect } from 'react'
import './Gallery.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { Modal } from '../../Component';
import { MdClear } from "react-icons/md";

const GalleryURL = ({ images, name }) => {

    const [index, setIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [imageToShow, setImageToShow] = useState(images[0]);
    const [play, setPlay] = useState(true);

    const [changingImage, setChangingImage] = useState(false);

    const handlePrevClick = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePlayPauseClick = () => {
        setPlay(!play)
    };


    useEffect(() => {
        let intervalId;
        if (play) {
            intervalId = setInterval(() => {
                setChangingImage(true);
                setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            }, 4000);
        }

        return () => clearInterval(intervalId);
    }, [play]);

    return (
        <div className='gallery'>


            <div className="button-container">
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="gallery_button"
                    onClick={handlePrevClick}
                />
                <img src={URL.createObjectURL(images[index])} className={`galleryImage`} alt="Gallery" />
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="gallery_button"
                    onClick={handleNextClick}
                />
            </div>

            <FontAwesomeIcon
                icon={play ? faPause : faPlay}
                className="gallery_button"
                onClick={handlePlayPauseClick}
            />
            <div className='bottom_text'><p>Map #{index + 1}<br/>Case {name}  </p></div>

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

export default GalleryURL
