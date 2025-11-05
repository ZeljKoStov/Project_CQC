import React, { useState, useEffect } from "react";
import FileSaver from 'file-saver';
import JSZip from "jszip"
import { getCookie } from '../../utils/cookies';
import { processing, changeExposure, userData, chargeMapping } from "../../api/api";
import { RequestAPI } from "../../utils/request-api";
import { useNavigate } from "react-router-dom";
import { Modal } from '../../Component';
import './Processing.css'
import silver_token from "../../assets/silver_token.gif"

/**
 * Creates a modified version of an input image file using various canvas filters.
 * @param {File} originalFile - The original image file to modify.
 * @param {object} [filters={}] - An object containing the filter values to apply.
 * @returns {Promise<{modifiedFile: File, modifiedUrl: string}>} A promise that resolves with the modified image.
 */
const createModifiedImage = (originalFile, filters = {}) => {
    // Set default values for any filters not provided
    const {
        blur = 50,
        brightness = 1,
        contrast = 1,
        saturate = 1,
        grayscale = 0,
        sepia = 0,
        hueRotate = 0,
        invert = 0,
        opacity = 1,
    } = filters;

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                // Build the filter string from the provided options
                const filterParts = [];
                if (blur > 0) filterParts.push(`blur(${blur}px)`);
                if (brightness !== 1) filterParts.push(`brightness(${brightness})`);
                if (contrast !== 1) filterParts.push(`contrast(${contrast})`);
                if (saturate !== 1) filterParts.push(`saturate(${saturate})`);
                if (grayscale > 0) filterParts.push(`grayscale(${grayscale})`);
                if (sepia > 0) filterParts.push(`sepia(${sepia})`);
                if (hueRotate !== 0) filterParts.push(`hue-rotate(${hueRotate}deg)`);
                if (invert > 0) filterParts.push(`invert(${invert})`);
                if (opacity < 1) filterParts.push(`opacity(${opacity})`);

                // Apply the combined filter string to the canvas
                if (filterParts.length > 0) {
                    ctx.filter = filterParts.join(' ');
                }

                ctx.drawImage(img, 0, 0);
                const modifiedUrl = canvas.toDataURL(originalFile.type);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const modifiedFile = new File([blob], originalFile.name, { type: originalFile.type });
                        resolve({ modifiedFile, modifiedUrl });
                    } else {
                        reject(new Error('Canvas to Blob conversion failed.'));
                    }
                }, originalFile.type);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(originalFile);
    });
};

const initialPairState = {
    focused: null, fext: "", furl: "", ferror: false,
    diffused: null, dext: "", durl: "", derror: false,
    name: "", doterror: false, nerror: false, serror: false, exterror: false,
    intrinsic: null,
    map1: null, map2: null, map3: null, map4: null, map5: null,
    map6: null, map7: null, map8: null, map9: null,
    mappingInProgress: false, mappingCount: 0,
    // Filter values with defaults that do not change the image
    blur: 50, brightness: 1, contrast: 1, saturate: 1,
    grayscale: 0, sepia: 0, hueRotate: 0, invert: 0, opacity: 1,
};


const Processing = () => {
    const [openModal, setOpenModal] = useState(false);
    const [index, setIndex] = useState();
    const [mapNumber, setMapNumber] = useState(0);
    const [usersTokens, setUsersTokens] = useState(0);
    const [n, setN] = useState('');
    const [email, setEmail] = useState("");
    const [imagePairs, setImagePairs] = useState([{ ...initialPairState }]);
    const [loading, setLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [processed, setProcesed] = useState(false);
    const [mapping, setMapping] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (!dataFetched) {
            fetchData();
            setDataFetched(true);
        }
    });

    const fetchData = async () => {
        try {
            const email = getCookie('_email');
            const body = { email: email };
            setEmail(email);
            const response = await RequestAPI(userData(body));
            if (response.status === 200) {
                setUsersTokens(response.data.tokens);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const goToWebShop = () => {
        window.scrollTo(0, 0);
        navigate(`/Web_Shop`);
    }

    const handleImagePairRemove = (index) => {
        const list = [...imagePairs];
        list.splice(index, 1);
        setImagePairs(list);
    };

    const resetImagePairs = () => {
        setLoading(false);
        setProcesed(false);
        setOpenModal(false);
        setImagePairs([]);
    }

    useEffect(() => {
        if (imagePairs.length === 0) {
            handleServiceAdd();
        }
    }, [imagePairs]);

    const handleFocusedChange = async (e, index) => {
        const focusedFile = e.target.files[0];
        if (!focusedFile) return;

        const fileName = focusedFile.name;
        const extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        const list = [...imagePairs];
        const item = { ...list[index] };

        if (item.intrinsic == null) {
            item.focused = focusedFile;
            item.fext = extension;
            item.furl = URL.createObjectURL(focusedFile);

            try {
                // Use the current filter values from state to generate the initial diffused image
                const { modifiedFile, modifiedUrl } = await createModifiedImage(focusedFile, item);
                item.diffused = modifiedFile;
                item.dext = extension;
                item.durl = modifiedUrl;
            } catch (error) {
                console.error("Failed to create diffused image:", error);
                return;
            }

            list[index] = item;
            setImagePairs(list);
        }
    }

    const handleNameChange = (e, index) => {
        const name = e.target.value;
        const list = [...imagePairs];
        list[index].name = name;
        setImagePairs(list);
    }

    const set1 = async (e, index) => {
        const list = [...imagePairs];
        const item = list[index];
        item.blur = 100;
        item.brightness = 1;
        item.opacity = 0.8;

        // If an image already exists, regenerate the diffused preview in real-time
        if (item.focused) {
            try {
                const { modifiedFile, modifiedUrl } = await createModifiedImage(item.focused, item);
                item.diffused = modifiedFile;
                item.durl = modifiedUrl;
            } catch (error) {
                console.error("Failed to update diffused image:", error);
            }
        }

        setImagePairs([...list]); // Trigger re-render
    }

    const set2 = async (e, index) => {
        const list = [...imagePairs];
        const item = list[index];
        item.blur = 200;
        item.brightness = 1;
        item.opacity = 0.9;

        // If an image already exists, regenerate the diffused preview in real-time
        if (item.focused) {
            try {
                const { modifiedFile, modifiedUrl } = await createModifiedImage(item.focused, item);
                item.diffused = modifiedFile;
                item.durl = modifiedUrl;
            } catch (error) {
                console.error("Failed to update diffused image:", error);
            }
        }

        setImagePairs([...list]); // Trigger re-render
    }

    const set3 = async (e, index) => {
        const list = [...imagePairs];
        const item = list[index];
        item.blur = 200;
        item.brightness = 1;
        item.opacity = 1;

        // If an image already exists, regenerate the diffused preview in real-time
        if (item.focused) {
            try {
                const { modifiedFile, modifiedUrl } = await createModifiedImage(item.focused, item);
                item.diffused = modifiedFile;
                item.durl = modifiedUrl;
            } catch (error) {
                console.error("Failed to update diffused image:", error);
            }
        }

        setImagePairs([...list]); // Trigger re-render
    }



    const handleFilterChange = async (e, index, filterName) => {
        const list = [...imagePairs];
        const item = list[index];
        const value = parseFloat(e.target.value);
        item[filterName] = value;

        // If an image already exists, regenerate the diffused preview in real-time
        if (item.focused) {
            try {
                const { modifiedFile, modifiedUrl } = await createModifiedImage(item.focused, item);
                item.diffused = modifiedFile;
                item.durl = modifiedUrl;
            } catch (error) {
                console.error("Failed to update diffused image:", error);
            }
        }

        setImagePairs([...list]); // Trigger re-render
    }


    const handleServiceAdd = () => {
        setImagePairs(prevPairs => [...prevPairs, { ...initialPairState }]);
    };

    const validatePairs = () => {
        const list = [...imagePairs];
        let error = false;

        imagePairs.forEach((pair, index) => {
            const currentPair = list[index];
            currentPair.ferror = pair.focused == null;
            currentPair.nerror = pair.name === "";
            currentPair.doterror = pair.name.includes(".");
            currentPair.serror = pair.name.indexOf(' ') >= 0;

            currentPair.derror = false;
            currentPair.exterror = false;

            if (currentPair.ferror || currentPair.nerror || currentPair.doterror || currentPair.serror) {
                error = true;
            }
        });

        setImagePairs(list);
        return !error;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePairs()) {
            return;
        }

        setLoading(true);

        imagePairs.forEach(async (pair) => {
            if (pair.diffused != null && pair.focused != null && pair.name != null) {
                const formData = new FormData();
                formData.append("F", pair.focused);
                formData.append("D", pair.diffused);
                formData.append("name", pair.name);
                formData.append("ext", pair.fext);
                formData.append("email", email);

                try {
                    const response = await RequestAPI(processing(formData));
                    if (response.status === 200) {
                        const updatedList = imagePairs.map(p =>
                            p.name === pair.name ? { ...p, intrinsic: response.data } : p
                        );
                        setImagePairs(updatedList);
                    }
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            }
        });
    }

    useEffect(() => {
        if (loading && imagePairs.every(p => p.intrinsic !== null)) {
            downloadAuto();
        }
    }, [imagePairs, loading]);


    const handleMapping = async (e) => {
        e.preventDefault();
        if (!validatePairs()) {
            return;
        }

        setMapping(true);

        imagePairs.forEach(async (pair, index) => {
            if (pair.diffused != null && pair.focused != null && pair.name != null) {

                const updatePairState = (updates) => {
                    setImagePairs(prevPairs =>
                        prevPairs.map((p, i) => (i === index ? { ...p, ...updates } : p))
                    );
                };

                updatePairState({ mappingInProgress: true });

                try {
                    const exposureLevels = [
                        { dExp: -0.2, fExp: -0.1 }, { dExp: -0.1, fExp: 0 }, { dExp: 0, fExp: 0.1 },
                        { dExp: -0.1, fExp: -0.1 }, { dExp: 0, fExp: 0 }, { dExp: 0.1, fExp: 0.1 },
                        { dExp: 0, fExp: -0.1 }, { dExp: 0.1, fExp: 0 }, { dExp: 0.2, fExp: 0.1 }
                    ];

                    let centralImage = null;

                    for (let i = 0; i < exposureLevels.length; i++) {
                        const { dExp, fExp } = exposureLevels[i];
                        const formData = new FormData();
                        formData.append("F", pair.focused);
                        formData.append("D", pair.diffused);
                        formData.append("name", pair.name);
                        formData.append("dExp", dExp);
                        formData.append("fExp", fExp);
                        formData.append("ext", pair.fext);
                        formData.append("email", email);

                        const response = await RequestAPI(changeExposure(formData));
                        if (response.status === 200) {
                            const mapKey = `map${i + 1}`;
                            if (i === 4) {
                                centralImage = response.data;
                            }
                            updatePairState({ [mapKey]: response.data, mappingCount: i + 1 });
                        }
                    }

                    updatePairState({
                        mappingInProgress: false,
                        intrinsic: centralImage,
                    });

                    setLoading(false);
                    setProcesed(true);

                    const formDataCharge = new FormData();
                    formDataCharge.append("email", email);
                    await RequestAPI(chargeMapping(formDataCharge));
                    await fetchData();

                } catch (error) {
                    console.log(error);
                    updatePairState({ mappingInProgress: false });
                }
            }
        });
    }

    const downloadAuto = () => {
        if (imagePairs.length === 0 || !imagePairs.every(item => item.intrinsic != null)) {
            return;
        }

        const zip = new JSZip();

        imagePairs.forEach((item) => {
            zip.file(item.name + "_F." + item.fext, item.focused);
            zip.file(item.name + "_D." + item.fext, item.diffused);
            zip.file(item.name + "_I." + item.fext, item.intrinsic.substring(22), { base64: true });

            if (item.mappingCount === 9) {
                for (let i = 1; i <= 9; i++) {
                    zip.file(`${item.name}_M_${i}.${item.fext}`, item[`map${i}`].substring(22), { base64: true });
                }
            }
        });

        setLoading(false);
        setProcesed(true);
        fetchData();
        zip.generateAsync({ type: "blob" }).then(function (content) {
            FileSaver.saveAs(content, "intrinsic.zip");
        });
    }

    const download = (e) => {
        e.preventDefault();
        const zip = new JSZip();
        imagePairs.forEach((item) => {
            zip.file(item.name + "_F." + item.fext, item.focused)
            zip.file(item.name + "_D." + item.fext, item.diffused)
            zip.file(item.name + "_I." + item.fext, item.intrinsic.substring(22), { base64: true })
            if (item.mappingCount === 9) {
                for (let i = 1; i <= 9; i++) {
                    zip.file(`${item.name}_M_${i}.${item.fext}`, item[`map${i}`].substring(22), { base64: true });
                }
            }
        });
        zip.generateAsync({ type: "blob" }).then(function (content) {
            FileSaver.saveAs(content, "intrinsic.zip");
        });
    }

    return (
        <div className='cqc__processing'>
            <div className='cqc__text'>
                <h1>Image Processing</h1>
                <p>Upload your original image. The diffused version will be generated automatically.</p>
            </div>
            <div className="form-field">
                {imagePairs.map((pair, index) => (
                    <div key={index} className="image-pair-container">
                        <div className="services">
                            <div className="first_row">
                                <div className="input_item">
                                    <p>Name Image Pair</p>
                                    <input type="text" value={pair.name} onChange={(e) => handleNameChange(e, index)} required />
                                    {pair.nerror && <div className="error_text">Name cannot be empty!</div>}
                                    {pair.serror && <div className="error_text">Name cannot contain whitespace!</div>}
                                    {pair.doterror && <div className="error_text">Name cannot contain a dot "."!</div>}
                                </div>
                                <div className="input_item">
                                    <p>Upload Original Image</p>
                                    <input type="file" accept="image/*" onChange={(e) => handleFocusedChange(e, index)} required />
                                    {pair.ferror && <div className="error_text">Please upload an image!</div>}
                                </div>
                            </div>

                            <div className="set_row">
                                <button type="button" onClick={(e) => set1(e, index)} className="set_button" >
                                    Microscopy
                                </button>
                                <button type="button" onClick={(e) => set2(e, index)} className="set_button" >
                                    General
                                </button>
                                <button type="button" onClick={(e) => set3(e, index)} className="set_button" >
                                    Astronomy
                                </button>
                            </div>

                            <div className="filter-controls">
                                <div className="filter-item">
                                    <label>Blur: {pair.blur}px</label>
                                    <input type="range" min="0" max="200" step="1" value={pair.blur} onChange={(e) => handleFilterChange(e, index, 'blur')} />
                                </div>
                                <div className="filter-item">
                                    <label>Brightness: {Math.round(pair.brightness * 100)}%</label>
                                    <input type="range" min="0" max="2" step="0.01" value={pair.brightness} onChange={(e) => handleFilterChange(e, index, 'brightness')} />
                                </div>
                                <div className="filter-item">
                                    <label>Contrast: {Math.round(pair.contrast * 100)}%</label>
                                    <input type="range" min="0" max="2" step="0.01" value={pair.contrast} onChange={(e) => handleFilterChange(e, index, 'contrast')} />
                                </div>
                                <div className="filter-item">
                                    <label>Saturation: {Math.round(pair.saturate * 100)}%</label>
                                    <input type="range" min="0" max="2" step="0.01" value={pair.saturate} onChange={(e) => handleFilterChange(e, index, 'saturate')} />
                                </div>
                                {/* <div className="filter-item">
                                    <label>Grayscale: {Math.round(pair.grayscale * 100)}%</label>
                                    <input type="range" min="0" max="1" step="0.05" value={pair.grayscale} onChange={(e) => handleFilterChange(e, index, 'grayscale')} />
                                </div>
                                <div className="filter-item">
                                    <label>Sepia: {Math.round(pair.sepia * 100)}%</label>
                                    <input type="range" min="0" max="1" step="0.05" value={pair.sepia} onChange={(e) => handleFilterChange(e, index, 'sepia')} />
                                </div> */}
                                <div className="filter-item">
                                    <label>Hue: {pair.hueRotate}°</label>
                                    <input type="range" min="0" max="360" step="1" value={pair.hueRotate} onChange={(e) => handleFilterChange(e, index, 'hueRotate')} />
                                </div>
                                <div className="filter-item">
                                    <label>Invert: {Math.round(pair.invert * 100)}%</label>
                                    <input type="range" min="0" max="1" step="0.01" value={pair.invert} onChange={(e) => handleFilterChange(e, index, 'invert')} />
                                </div>
                                <div className="filter-item">
                                    <label>Opacity: {Math.round(pair.opacity * 100)}%</label>
                                    <input type="range" min="0" max="1" step="0.01" value={pair.opacity} onChange={(e) => handleFilterChange(e, index, 'opacity')} />
                                </div>
                            </div>

                            <div className="Second_row">
                                <div className="image_row">
                                    <p className='cqc__p'>Original Image</p>
                                    {pair.focused && <img src={pair.furl} className="image_preview" alt="Original" onClick={() => { setOpenModal(true); setIndex(index); setMapNumber(0); setN("furl"); }} />}
                                </div>
                                <div className="image_row">
                                    <p className='cqc__p'>Diffused Image</p>
                                    {pair.durl ? <img src={pair.durl} className="image_preview" alt="Diffused" onClick={() => { setOpenModal(true); setIndex(index); setMapNumber(0); setN("durl"); }} /> : (pair.focused && <div className="spin"><div className="reg-spinner"></div></div>)}
                                </div>
                                {pair.intrinsic && <div className="image_row">
                                    <p className='cqc__p'>Intrinsic Image</p>
                                    <img src={`${pair.intrinsic}`} className="image_preview" alt="Intrinsic" onClick={() => { setOpenModal(true); setIndex(index); setMapNumber(0); setN("intr"); }} />
                                </div>}
                                {loading && !pair.intrinsic && <div className="spin"><div className="reg-spinner"></div></div>}
                                {pair.mappingInProgress && <div className="spin"><p>Mapping in Progress... {pair.mappingCount}/9</p></div>}
                                <div className="second-division">
                                    {imagePairs.length > 1 && <button type="button" onClick={() => handleImagePairRemove(index)} className="remove_button">X</button>}
                                </div>
                            </div>
                        </div>
                        {mapping && pair.mappingCount === 9 && (
                            <div className="mappingServices">
                                {/* Your existing mapping display JSX here */}
                            </div>
                        )}
                    </div>
                ))}

                {openModal && <Modal num={n} ind={index} mapNumber={mapNumber} pair={imagePairs} onClose={() => setOpenModal(false)} />}

                {processed ? (
                    <div className="button_div">
                        <button type="button" onClick={resetImagePairs} className="dodajRed">New Image Set</button>
                        <button type="button" onClick={download} className="process_button">Save Images</button>
                    </div>
                ) : (
                    <div className="button_div">
                        <button type="button" onClick={handleServiceAdd} className="dodajRed" disabled={loading}>
                            Add another image pair
                        </button>
                        <button type="button" onClick={handleSubmit} className="process_button" disabled={loading || imagePairs.some(p => !p.focused)}>
                            Process Images
                        </button>
                        {(email === "abe@quantcyte.org" || email === "ngocic97@gmail.com") &&
                            <button type="button" onClick={handleMapping} className="process_button" disabled={loading || imagePairs.some(p => !p.focused)}>
                                Intrinsic Mapping
                            </button>}
                    </div>
                )}
                {/* {imagePairs.length > usersTokens &&
                    <div className="button_div">
                        <p className="black_text">Not enough processing tokens!</p>
                        <button className='blue_button' onClick={goToWebShop}>Buy more tokens</button>
                    </div>} */}
                {/* <div className="tokens_row">
                    <p>Image pairs to process: {imagePairs.length} <br />Available Processing Tokens: {usersTokens}</p>
                </div> */}
                <div className="tokens_row">
                    <div className='tokens_row_coin'>
                        <img src={silver_token} alt="Token Coin" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Processing;