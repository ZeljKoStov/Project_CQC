import React, { useState, useEffect } from "react";
import FileSaver from 'file-saver';
import JSZip from "jszip"
import { getCookie } from '../../utils/cookies';
import { processing, userData } from "../../api/api";
import { RequestAPI } from "../../utils/request-api";
import { useNavigate } from "react-router-dom";
import { Modal } from '../../Component';
import './Processing.css'
import silver_token from "../../assets/silver_token.gif"


const Processing = () => {

    const [openModal, setOpenModal] = useState(false);
    const [index, setIndex] = useState();
    const [usersTokens, setUsersTokens] = useState(0);
    const [n, setN] = useState('');

    const [imagePairs, setImagePairs] = useState([{
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
    }]);

    const [loading, setLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [processed, setProcesed] = useState(false);
    const [count, setCount] = useState(0)

    let navigate = useNavigate();

    useEffect(() => {
        if (!dataFetched) {
            fetchData()
            setDataFetched(true);
        }
    });

    const fetchData = async () => {
        try {

            const email = getCookie('_email')
            const body = {
                email: email
            }
            const response = await RequestAPI(userData(body));
            if (response.status === 200) {
                setUsersTokens(response.data.tokens)
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
        console.log("RESET");
        setLoading(false);
        setProcesed(false);
        setOpenModal(false);

        setImagePairs([]);
        updateUI();
    }

    useEffect(() => {
        if (imagePairs.length == 0) handleServiceAdd()
    }, [imagePairs])

    const handleFocusedChange = (e, index) => {
        const f = e.target.files[0];
        const fileName = f.name;
        const extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        const list = [...imagePairs];
        const item = list[index];

        if (item.intrinsic == null) {
            item.focused = f;
            item.fext = extension;

            let fileReader
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                item.furl = result
                updateUI();
            }
            fileReader.readAsDataURL(item.focused);

            list[index] = item;
            setImagePairs(list);
        }
    }

    const handleDiffusedChange = (e, index) => {
        const d = e.target.files[0];
        const fileName = d.name;
        const extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        const list = [...imagePairs];
        const item = list[index];

        if (item.intrinsic == null) {
            item.diffused = d;
            item.dext = extension;

            let fileReader
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                item.durl = result
                updateUI();
            }
            fileReader.readAsDataURL(item.diffused);

            list[index] = item;

            setImagePairs(list);
        }
    }

    const handleNameChange = (e, index) => {
        const name = e.target.value;
        const list = [...imagePairs];
        const item = list[index];
        item.name = name;
        list[index] = item;
        setImagePairs(list);
    }

    const handleServiceAdd = () => {
        setImagePairs([...imagePairs, {
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
        }]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const list = [...imagePairs];
        let error = false

        imagePairs.map((pair, index) => {
            if (pair.focused == null) {
                list[index].ferror = true;
                error = true;
            } else list[index].ferror = false;
            if (pair.diffused == null) {
                list[index].derror = true;
                error = true;
            } else list[index].derror = false;
            if (pair.name === "") {
                list[index].nerror = true;
                error = true;
            } else list[index].nerror = false;
            if (pair.name.includes(".")) {
                list[index].doterror = true;
                error = true;
            } else list[index].doterror = false;
            if (pair.name.indexOf(' ') >= 0) {
                list[index].serror = true;
                error = true;
            } else list[index].serror = false;
            if (list[index].dext != list[index].fext) {
                list[index].exterror = true;
                error = true;
            } else list[index].exterror = false;
        })

        if (error) {
            setImagePairs(list);
            updateUI();
        } else {
            setLoading(true);
            imagePairs.map(async (pair, index) => {
                if (pair.diffused != null && pair.focused != null && pair.name != null) {

                    const formData = new FormData();
                    formData.append("F", pair.focused);
                    formData.append("D", pair.diffused);
                    formData.append("name", pair.name);
                    formData.append("ext", pair.fext);
                    const email = getCookie('_email')
                    formData.append("email", email);
                    try {
                        const response = await RequestAPI(processing(formData));
                        if (response.status === 200) {

                            const list = [...imagePairs];

                            list[index].intrinsic = response.data
                            setImagePairs(list);

                            updateUI();

                            downloadAuto();
                            
                        }

                    } catch (error) {
                        console.log(error);
                    }

                }

            });

        }
    }

    const downloadAuto = () => {
        var flag = true;
        const zip = new JSZip();

        imagePairs.forEach((item) => {
            if (item.intrinsic == null) flag = false;
            else {
                zip.file(item.name + "_F." + item.fext, item.focused)
                zip.file(item.name + "_D." + item.fext, item.diffused)
                zip.file(item.name + "_I." + item.fext, item.intrinsic.substring(22), { base64: true })
            }
        })

        if (flag) {
            setLoading(false);
            setProcesed(true);
            fetchData()
            zip.generateAsync({ type: "blob" }).then(function (content) {
                FileSaver.saveAs(content, "intrinsic.zip");
            });
        }

    }

    const download = (e) => {
        e.preventDefault();

        const zip = new JSZip();

        imagePairs.forEach((item) => {
            zip.file(item.name + "_F." + item.fext, item.focused)
            zip.file(item.name + "_D." + item.fext, item.diffused)
            zip.file(item.name + "_I." + item.fext, item.intrinsic.substring(22), { base64: true })
        })

        zip.generateAsync({ type: "blob" }).then(function (content) {

            FileSaver.saveAs(content, "intrinsic.zip");
        });
    }

    const updateUI = () => {
        const prev = count;
        const min = count;
        const max = 1000000;
        const rand = min + Math.random() * (max - min);
        setCount(rand);
    }

    return (
        <div className='cqc__processing'>
            <div className='cqc__text'>
                <h1>Image Processing</h1>
                <p>Upload your Original and Diffused image pairs here</p>
            </div>
            <div className="form-field">
                {imagePairs.map((pair, index) => (
                    <div key={index} className="services">
                        <div className="first_row">
                            <div className="empty_block"></div>
                            <div className="input_item">
                                <p>Name Image Pair</p>
                                <input
                                    type="text"
                                    value={pair.name}
                                    onChange={(e) => handleNameChange(e, index)}
                                    required
                                />
                                {pair.nerror && <div className="error_text">Image Pair Name cannot be empty!</div>}
                                {pair.serror && <div className="error_text">Image Pair Name cannot contain whitespace caracter!</div>}
                                {pair.doterror && <div className="error_text">Image Pair Name cannot contain dot "." caracter!</div>}
                                {pair.exterror && <div className="error_text">The Images you selected have different extensions!</div>}
                            </div>
                            <div className="input_item">
                                <p>Upload Original Image</p>
                                <input
                                    type="file"
                                    onChange={(e) => { handleFocusedChange(e, index); }}
                                    required
                                />
                                {pair.ferror && <div className="error_text">Please upload the foused image!</div>}
                            </div>
                            <div className="input_item">
                                <p>Upload Diffused Image</p>
                                <input
                                    type="file"
                                    onChange={(e) => { handleDiffusedChange(e, index); }}
                                    required
                                />
                                {pair.derror && <div className="error_text">Please upload the diffused image!</div>}
                            </div>
                        </div>
                        <div className="Second_row">
                            <div className="image_row">
                                <div className='cqc__p'><p>Original Image</p>  </div>
                                {pair.fext == "fit" || pair.fext == "tiff" || pair.fext == "fits" || pair.fext == "FIT" || pair.fext == "TIFF" || pair.fext == "FITS" ?
                                    <div className="image_preview" >Preview Not Available for {pair.fext} extension!</div>
                                    :
                                    <>
                                        {pair.focused && (
                                            <>
                                                <img src={pair.furl} className="image_preview" alt="reload" onClick={() => {
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setN("furl")
                                                }} />

                                            </>
                                        )}
                                    </>
                                }
                            </div>
                            <div className="image_row">
                                <div className='cqc__p'>
                                    <p>Diffused Image</p>
                                </div>
                                {pair.dext == "fit" || pair.dext == "tiff" || pair.dext == "fits" || pair.dext == "FIT" || pair.dext == "TIFF" || pair.dext == "FITS" ?
                                    <div className="image_preview" >Preview Not Available for {pair.dext} extension!</div>
                                    :
                                    <>
                                        {pair.durl && (
                                            <>
                                                <img src={pair.durl} className="image_preview" alt="reload" onClick={() => {
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setN("durl")
                                                }} />
                                            </>
                                        )}
                                    </>
                                }

                            </div>
                            {pair.intrinsic && <div className="image_row">
                                <div className='cqc__p'>
                                    <p>Intrinsic</p>
                                </div>
                                {pair.fext == "fit" || pair.fext == "tiff" || pair.fext == "fits" || pair.fext == "FIT" || pair.fext == "TIFF" || pair.fext == "FITS" ?
                                    <div className="image_preview" >Preview Not Available for {pair.fext} extension!</div>
                                    :
                                    <>
                                        <img src={`${pair.intrinsic}`} className="image_preview" alt="reload" onClick={() => {
                                            setOpenModal(true)
                                            setIndex(index)
                                            setN("intr")
                                        }} />
                                    </>
                                }
                            </div>
                            }
                            {!pair.intrinsic && loading &&
                                <div className="spin">
                                    <div class="reg-spinner"></div>
                                </div>
                            }
                            <div className="second-division">
                                {imagePairs.length !== 1 && (
                                    <button type="button" onClick={() => handleImagePairRemove(index)} className="remove_button">
                                        X
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                ))}
                {openModal && <Modal num={n} ind={index} pair={imagePairs} onClose={() => setOpenModal(false)} />}
                
                {processed ?
                    <div className="button_div">
                        <button type="button" onClick={resetImagePairs} className="dodajRed">
                            New Image Set
                        </button>
                        <button type="button" onClick={(e) => download(e)} className="process_button">
                            Save Images
                        </button>
                    </div>
                    :
                    <div className="button_div">
                        <button type="button" onClick={handleServiceAdd} className="dodajRed" disabled={loading}>
                            Add another image pair
                        </button>
                        <button type="button" onClick={handleSubmit} className="process_button" disabled={loading || imagePairs.length>usersTokens}>
                            Process Images
                        </button>
                    </div>
                }
                {
                    imagePairs.length>usersTokens && 
                        <div className="button_div">
                            <p className="black_text">Not enough processing tokens!</p>
                            <button className='blue_button' onClick={(e) => goToWebShop(e)}>Buy more tokens</button>
                        </div>
                }
                <div className="tokens_row">
                     <p>Image pairs to process: {imagePairs.length} <br/>Available Processing Tokens: {usersTokens}</p>
                </div>

                <div className="tokens_row">
                    <div className='tokens_row_coin'>
                        <img src={silver_token} alt="Gallery" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Processing
