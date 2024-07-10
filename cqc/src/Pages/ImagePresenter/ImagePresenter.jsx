import React, { useState, useEffect } from "react";
import './ImagePresenter.css'
import { MdClear, MdCropRotate } from "react-icons/md"
import { getCookie } from '../../utils/cookies';
import { useNavigate } from "react-router-dom";

import 'react-image-gallery/styles/css/image-gallery.css';
import GalleryURL from '../../Component/Gallery/GalleryURL'


const ImagePresenter = () => {

    const [openModal, setOpenModal] = useState(false);
    const [imagePairs, setImagePairs] = useState([]);
    const [mappingImages, setMappingImages] = useState([]);
    const [mappingObject, setMappingObject] = useState({
        focused: null,
        fext: "",
        furl: "",
        ferror: false,
        diffused: null,
        dext: "",
        durl: "",
        derror: false,
        name: "",
        doterror: false,
        nerror: false,
        serror: false,
        exterror: false,
        intrinsic: null,
        map1: null,
        map2: null,
        map3: null,
        map4: null,
        map5: null,
        map6: null,
        map7: null,
        map8: null,
        map9: null,
        mappingInProgress: false,
        mappingCount: 0
    });

    const [imageToShow, setImageToShow] = useState(null);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [count, setCount] = useState(0);

    let navigate = useNavigate();
    useEffect(() => {
        const email = getCookie('_email')
        if (email == '' || email == undefined) {
            navigate(`/`);
        }
    });

    const rotate = () => {
        setRotationAngle(rotationAngle + 90)
    }

    const updateUI = () => {
        const prev = count;
        const min = count;
        const max = 1000000;
        const rand = min + Math.random() * (max - min);
        setCount(rand);
    }

    const handleImageChange = (e) => {
        const files = e.target.files;

        var pairs = []

        for (let i = 0; i < (files.length / 3); i++) {
            var intrinsic = null;
            var focused = null;
            var diffused = null;

            console.log()

            if (files[i * 3].name.includes('_I')) { intrinsic = files[i * 3] } else
                if (files[i * 3].name.includes('_D')) { diffused = files[i * 3] } else focused = files[i * 3]

            if (files[i * 3 + 1].name.includes('_I')) { intrinsic = files[i * 3 + 1] } else
                if (files[i * 3 + 1].name.includes('_D')) { diffused = files[i * 3 + 1] } else focused = files[i * 3 + 1]

            if (files[i * 3 + 2].name.includes('_I')) { intrinsic = files[i * 3 + 2] } else
                if (files[i * 3 + 2].name.includes('_D')) { diffused = files[i * 3 + 2] } else focused = files[i * 3 + 2]

            if (intrinsic == null || diffused == null || intrinsic == null) {
                focused = files[i * 3]
                diffused = files[i * 3 + 1]
                intrinsic = files[i * 3 + 2]
            }

            pairs.push(
                {
                    focused: focused,
                    fext: "",
                    furl: "",
                    ferror: false,
                    diffused: diffused,
                    dext: "",
                    durl: "",
                    derror: false,
                    name: files[i*3].name.replace(/\.[^/.]+$/, "").slice(0, -2),
                    doterror: false,
                    nerror: false,
                    serror: false,
                    exterror: false,
                    intrinsic: intrinsic,
                    map1: null,
                    map2: null,
                    map3: null,
                    map4: null,
                    map5: null,
                    map6: null,
                    map7: null,
                    map8: null,
                    map9: null,
                    mappingInProgress: false,
                    mappingCount: 0
                }
            )
        }

        setImagePairs(pairs);
        updateUI();

    };

    const handleMappingChange = (e) => {

        const files = Array.from(e.target.files).filter(file => {
            const fileName = file.name.toLowerCase();
            return !(fileName.includes('_i') || fileName.includes('_f') || fileName.includes('_d'));
        });

        var images = []
        for (let i = 0; i < files.length; i++) {
            images.push(files[i])
        }

        setMappingImages(images)

        if (files.length == 9) {
            setMappingObject({
                focused: null,
                fext: "",
                furl: "",
                ferror: false,
                diffused: null,
                dext: "",
                durl: "",
                derror: false,
                name: files[0].name.replace(/\.[^/.]+$/, "").slice(0, -4),
                doterror: false,
                nerror: false,
                serror: false,
                exterror: false,
                intrinsic: null,
                map1: files[0],
                map2: files[1],
                map3: files[2],
                map4: files[3],
                map5: files[4],
                map6: files[5],
                map7: files[6],
                map8: files[7],
                map9: files[8],
                mappingInProgress: false,
                mappingCount: 0
            })
        }
        updateUI();
    };

    const handleImageAdding = (e) => {
        const files = e.target.files;

        var pairs = []

        for (let i = 0; i < (files.length / 3); i++) {

            var intrinsic = null;
            var focused = null;
            var diffused = null;

            if (files[i * 3].name.includes('_I')) { intrinsic = files[i * 3] } else
                if (files[i * 3].name.includes('_D')) { diffused = files[i * 3] } else focused = files[i * 3]

            if (files[i * 3 + 1].name.includes('_I')) { intrinsic = files[i * 3 + 1] } else
                if (files[i * 3 + 1].name.includes('_D')) { diffused = files[i * 3 + 1] } else focused = files[i * 3 + 1]

            if (files[i * 3 + 2].name.includes('_I')) { intrinsic = files[i * 3 + 2] } else
                if (files[i * 3 + 2].name.includes('_D')) { diffused = files[i * 3 + 2] } else focused = files[i * 3 + 2]

            if (intrinsic == null || diffused == null || intrinsic == null) {
                focused = files[i * 3]
                diffused = files[i * 3 + 1]
                intrinsic = files[i * 3 + 2]
            }

            pairs.push(
                {
                    focused: focused,
                    fext: "",
                    furl: "",
                    ferror: false,
                    diffused: diffused,
                    dext: "",
                    durl: "",
                    derror: false,
                    name: files[i*3].name.replace(/\.[^/.]+$/, "").slice(0, -2),
                    doterror: false,
                    nerror: false,
                    serror: false,
                    exterror: false,
                    intrinsic: intrinsic,
                    map1: null,
                    map2: null,
                    map3: null,
                    map4: null,
                    map5: null,
                    map6: null,
                    map7: null,
                    map8: null,
                    map9: null,
                    mappingInProgress: false,
                    mappingCount: 0
                }
            )
        }

        setImagePairs(imagePairs => [...imagePairs, ...pairs]);
        updateUI();

    };

    const reset = (e) => {
        setImagePairs([]);
        setMappingImages([]);
        setMappingObject({
            focused: null,
            fext: "",
            furl: "",
            ferror: false,
            diffused: null,
            dext: "",
            durl: "",
            derror: false,
            name: "",
            doterror: false,
            nerror: false,
            serror: false,
            exterror: false,
            intrinsic: null,
            map1: null,
            map2: null,
            map3: null,
            map4: null,
            map5: null,
            map6: null,
            map7: null,
            map8: null,
            map9: null,
            mappingInProgress: false,
            mappingCount: 0
        });
    }



    return (
        <div className='cqc__presenter'>
            <div className='cqc__text'>
                <h1>Image Viewer</h1>
                <p>Select Image Folder to View</p>

                {
                    mappingObject.map1 == null && imagePairs.length == 0 &&
                    <div className="uploadImagesBackground">
                        <div className="input_images">
                            <p>Upload Basic Images Folder</p>
                            <input type="file" directory="" webkitdirectory="" onChange={handleImageChange} />
                            <p></p>
                            <p>Upload Mapping Folder</p>
                            <input type="file" directory="" webkitdirectory="" onChange={handleMappingChange} />
                        </div>
                    </div>
                }

            </div>


            {
                <div className="form-field">
                    {imagePairs.map((pair, index) => (
                        <>
                            <div className='cqc__p'><p>Case {pair.name}</p>  </div>
                            <div key={index} className="services">
                                <div className="Second_row">
                                    <div className="image_row">
                                        <div className='cqc__p'><p>Original Image</p>  </div>
                                        {pair.focused && (
                                            <>
                                                <img src={URL.createObjectURL(pair.focused)} className="image_preview" alt="reload" onClick={() => {
                                                    setImageToShow(URL.createObjectURL(pair.focused))
                                                    setOpenModal(true)
                                                }} />
                                            </>
                                        )}
                                    </div>
                                    <div className="image_row">
                                        <div className='cqc__p'>
                                            <p>Diffused Image</p>
                                        </div>
                                        {pair.diffused && (
                                            <>
                                                <img src={URL.createObjectURL(pair.diffused)} className="image_preview" alt="reload" onClick={() => {
                                                    setImageToShow(URL.createObjectURL(pair.diffused))
                                                    setOpenModal(true)
                                                }} />
                                            </>
                                        )}

                                    </div>
                                    <div className="image_row">
                                        <div className='cqc__p'>
                                            <p>Intrinsic Image</p>
                                        </div>
                                        {pair.intrinsic && (
                                            <>
                                                <img src={URL.createObjectURL(pair.intrinsic)} className="image_preview" alt="reload" onClick={() => {
                                                    setImageToShow(URL.createObjectURL(pair.intrinsic))
                                                    setOpenModal(true)
                                                }} />
                                            </>
                                        )}

                                    </div>
                                </div>

                            </div>
                        </>
                    ))}
                    {imagePairs.length > 0 &&
                        <>
                            <div className="button_div" style={{ paddingLeft: '250px' }} >
                                <label for="files" class='blue_button'>Select More Images</label>
                                <input id="files" style={{ visibility: 'hidden' }} type="file" directory="" webkitdirectory="" onChange={handleImageAdding} />
                            </div>
                            <div className="button_div" style={{ paddingTop: '25px' }}>
                                <label for="files" class='blue_button' onClick={reset} >Reset Images</label>
                            </div>

                        </>

                    }
                    {
                        mappingObject.map1 && <>
                            <div className="mappingServices">
                                <div className='mapping_title'><p>Map {mappingObject.name}</p>  </div>
                                <div className="mapping_row">

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map1)} className="mapping_image" alt="reload" onClick={() => {
                                            setImageToShow(URL.createObjectURL(mappingObject.map1))
                                            setOpenModal(true)
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map2)} className="mapping_image" alt="reload" onClick={() => {
                                            setImageToShow(URL.createObjectURL(mappingObject.map2))
                                            setOpenModal(true)
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map3)} className="mapping_image" alt="reload" onClick={() => {
                                            setImageToShow(URL.createObjectURL(mappingObject.map3))
                                            setOpenModal(true)
                                        }} />
                                    </div>
                                </div>
                                <div className="mapping_row">

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map4)} className="mapping_image" alt="reload" onClick={() => {
                                            setImageToShow(URL.createObjectURL(mappingObject.map4))
                                            setOpenModal(true)
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map5)} className="mapping_image" alt="reload" onClick={() => {
                                            setImageToShow(URL.createObjectURL(mappingObject.map5))
                                            setOpenModal(true)
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map6)} className="mapping_image" alt="reload" onClick={() => {
                                            setImageToShow(URL.createObjectURL(mappingObject.map6))
                                            setOpenModal(true)
                                        }} />
                                    </div>
                                </div>
                                <div className="mapping_row">

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map7)} className="mapping_image" alt="reload" onClick={() => {
                                            setImageToShow(URL.createObjectURL(mappingObject.map7))
                                            setOpenModal(true)
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map8)} className="mapping_image" alt="reload" onClick={() => {
                                            setImageToShow(URL.createObjectURL(mappingObject.map8))
                                            setOpenModal(true)
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map9)} className="mapping_image" alt="reload" onClick={() => {
                                            setImageToShow(URL.createObjectURL(mappingObject.map9))
                                            setOpenModal(true)
                                        }} />
                                    </div>
                                </div>
                            </div>

                            <div className="servicesGallery">
                                <div className="rowGallery">
                                    <div className="galleryURL">
                                        <GalleryURL images={mappingImages} name={mappingObject.name} />
                                    </div>
                                </div>
                            </div>


                        </>

                    }

                    {mappingObject.map1 &&
                        <>
                            <div className="button_div">
                                <label for="files" class='blue_button' onClick={reset} >Reset Images</label>
                            </div>
                        </>

                    }

                    {openModal &&
                        <div onClick={() => setOpenModal(false)} className='header_overlay'>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className='header_modalContainer'
                            >

                                <div className='header_escape' style={{ color: 'white' }} onClick={() => setOpenModal(false)}>
                                    <MdClear size={"2rem"} />
                                </div>

                                <div className='header_rotate' style={{ color: 'white' }} onClick={() => rotate()}>
                                    <MdCropRotate size={"2rem"} />
                                </div>

                                <img src={imageToShow} alt='focused_image' style={{
                                    display: 'flex',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '1rem',
                                    transform: `rotate(${rotationAngle}deg)`
                                }} />
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default ImagePresenter
