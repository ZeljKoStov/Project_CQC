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


const Processing = () => {

    const [openModal, setOpenModal] = useState(false);
    const [index, setIndex] = useState();
    const [mapNumber, setMapNumber] = useState(0);
    const [usersTokens, setUsersTokens] = useState(0);
    const [n, setN] = useState('');
    const [email, setEmail] = useState("");

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
    }]);

    const [loading, setLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [processed, setProcesed] = useState(false);
    const [count, setCount] = useState(0);
    const [mapping, setMapping] = useState(false);

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
            setEmail(email);
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

        setImagePairs([{
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
        }]);
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
            intrinsic: null
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
            const list = [...imagePairs];

            imagePairs.map(async (pair, index) => {
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

    const handleMapping = async (e) => {
        e.preventDefault();
        setMapping(true);
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
            updateUI();
            imagePairs.map(async (pair, index) => {
                if (pair.diffused != null && pair.focused != null && pair.name != null) {
                    const object = imagePairs[index]

                    var central = null

                    object.mappingInProgress = true
                    const insertList = [...imagePairs];
                    insertList[index] = object
                    setImagePairs(insertList);
                    updateUI();

                    try {

                        //1
                        const formData1 = new FormData();
                        formData1.append("F", pair.focused);
                        formData1.append("D", pair.diffused);
                        formData1.append("name", pair.name);
                        formData1.append("dExp", -0.2);
                        formData1.append("fExp", -0.1);
                        formData1.append("ext", pair.fext);
                        formData1.append("email", email);
                        const response1 = await RequestAPI(changeExposure(formData1));
                        if (response1.status === 200) {
                            object.map1 = response1.data
                            object.mappingCount = 1
                            const insertList = [...imagePairs];
                            insertList[index] = object
                            setImagePairs(insertList);
                            updateUI();
                        }

                        //2
                        const formData2 = new FormData();
                        formData2.append("F", pair.focused);
                        formData2.append("D", pair.diffused);
                        formData2.append("name", pair.name);
                        formData2.append("dExp", -0.1);
                        formData2.append("fExp", 0);
                        formData2.append("ext", pair.fext);
                        formData2.append("email", email);
                        const response2 = await RequestAPI(changeExposure(formData2));
                        if (response2.status === 200) {
                            object.map2 = response2.data
                            object.mappingCount = 2
                            const insertList = [...imagePairs];
                            insertList[index] = object
                            setImagePairs(insertList);
                            updateUI();
                        }

                        //3
                        const formData3 = new FormData();
                        formData3.append("F", pair.focused);
                        formData3.append("D", pair.diffused);
                        formData3.append("name", pair.name);
                        formData3.append("dExp", 0);
                        formData3.append("fExp", 0.1);
                        formData3.append("ext", pair.fext);
                        formData3.append("email", email);
                        const response3 = await RequestAPI(changeExposure(formData3));
                        if (response3.status === 200) {
                            object.map3 = response3.data
                            object.mappingCount = 3
                            const insertList = [...imagePairs];
                            insertList[index] = object
                            setImagePairs(insertList);
                            updateUI();
                        }

                        //4
                        const formData4 = new FormData();
                        formData4.append("F", pair.focused);
                        formData4.append("D", pair.diffused);
                        formData4.append("name", pair.name);
                        formData4.append("dExp", -0.1);
                        formData4.append("fExp", -0.1);
                        formData4.append("ext", pair.fext);
                        formData4.append("email", email);
                        const response4 = await RequestAPI(changeExposure(formData4));
                        if (response4.status === 200) {
                            object.map4 = response4.data
                            object.mappingCount = 4
                            const insertList = [...imagePairs];
                            insertList[index] = object
                            setImagePairs(insertList);
                            updateUI();
                        }

                        //5
                        const formData5 = new FormData();
                        formData5.append("F", pair.focused);
                        formData5.append("D", pair.diffused);
                        formData5.append("name", pair.name);
                        formData5.append("dExp", 0);
                        formData5.append("fExp", 0);
                        formData5.append("ext", pair.fext);
                        formData5.append("email", email);
                        const response5 = await RequestAPI(changeExposure(formData5));
                        if (response5.status === 200) {
                            object.map5 = response5.data
                            object.mappingCount = 5
                            const insertList = [...imagePairs];
                            central = response5.data
                            insertList[index] = object
                            setImagePairs(insertList);
                            updateUI();
                        }

                        //6
                        const formData6 = new FormData();
                        formData6.append("F", pair.focused);
                        formData6.append("D", pair.diffused);
                        formData6.append("name", pair.name);
                        formData6.append("dExp", 0.1);
                        formData6.append("fExp", 0.1);
                        formData6.append("ext", pair.fext);
                        formData6.append("email", email);
                        const response6 = await RequestAPI(changeExposure(formData6));
                        if (response6.status === 200) {
                            object.map6 = response6.data
                            object.mappingCount = 6
                            const insertList = [...imagePairs];
                            insertList[index] = object
                            setImagePairs(insertList);
                            updateUI();
                        }

                        //7
                        const formData7 = new FormData();
                        formData7.append("F", pair.focused);
                        formData7.append("D", pair.diffused);
                        formData7.append("name", pair.name);
                        formData7.append("dExp", 0);
                        formData7.append("fExp", -0.1);
                        formData7.append("ext", pair.fext);
                        formData7.append("email", email);
                        const response7 = await RequestAPI(changeExposure(formData7));
                        if (response7.status === 200) {
                            object.map7 = response7.data
                            object.mappingCount = 7
                            const insertList = [...imagePairs];
                            insertList[index] = object
                            setImagePairs(insertList);
                            updateUI();
                        }

                        //8
                        const formData8 = new FormData();
                        formData8.append("F", pair.focused);
                        formData8.append("D", pair.diffused);
                        formData8.append("name", pair.name);
                        formData8.append("dExp", 0.1);
                        formData8.append("fExp", 0);
                        formData8.append("ext", pair.fext);
                        formData8.append("email", email);
                        const response8 = await RequestAPI(changeExposure(formData8));
                        if (response8.status === 200) {
                            object.map8 = response8.data
                            object.mappingCount = 8
                            const insertList = [...imagePairs];
                            insertList[index] = object
                            setImagePairs(insertList);
                            updateUI();
                        }

                        //9
                        const formData9 = new FormData();
                        formData9.append("F", pair.focused);
                        formData9.append("D", pair.diffused);
                        formData9.append("name", pair.name);
                        formData9.append("dExp", 0.2);
                        formData9.append("fExp", 0.1);
                        formData9.append("ext", pair.fext);
                        formData9.append("email", email);
                        const response9 = await RequestAPI(changeExposure(formData9));
                        if (response9.status === 200) {
                            object.map9 = response9.data
                            object.mappingCount = 9
                            const insertList = [...imagePairs];
                            insertList[index] = object
                            setImagePairs(insertList);
                            updateUI();
                        }



                        const insertList = [...imagePairs];
                        object.mappingInProgress = false
                        object.intrinsic = central
                        insertList[index] = object

                        setImagePairs(insertList);

                        updateUI();

                        //downloadAuto();
                        setLoading(false);
                        setProcesed(true);

                        //Chargin for mapping
                        const formDataCharge = new FormData();
                        formDataCharge.append("email", email);
                        await RequestAPI(chargeMapping(formDataCharge));
                        await fetchData();
                        updateUI();

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

            if (item.mappingCount == 9) {
                zip.file(item.name + "_M_1." + item.fext, item.map1.substring(22), { base64: true })
                zip.file(item.name + "_M_2." + item.fext, item.map2.substring(22), { base64: true })
                zip.file(item.name + "_M_3." + item.fext, item.map3.substring(22), { base64: true })
                zip.file(item.name + "_M_4." + item.fext, item.map4.substring(22), { base64: true })
                zip.file(item.name + "_M_5." + item.fext, item.map5.substring(22), { base64: true })
                zip.file(item.name + "_M_6." + item.fext, item.map6.substring(22), { base64: true })
                zip.file(item.name + "_M_7." + item.fext, item.map7.substring(22), { base64: true })
                zip.file(item.name + "_M_8." + item.fext, item.map8.substring(22), { base64: true })
                zip.file(item.name + "_M_9." + item.fext, item.map9.substring(22), { base64: true })
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

            if (item.mappingCount == 9) {
                zip.file(item.name + "_M_1." + item.fext, item.map1.substring(22), { base64: true })
                zip.file(item.name + "_M_2." + item.fext, item.map2.substring(22), { base64: true })
                zip.file(item.name + "_M_3." + item.fext, item.map3.substring(22), { base64: true })
                zip.file(item.name + "_M_4." + item.fext, item.map4.substring(22), { base64: true })
                zip.file(item.name + "_M_5." + item.fext, item.map5.substring(22), { base64: true })
                zip.file(item.name + "_M_6." + item.fext, item.map6.substring(22), { base64: true })
                zip.file(item.name + "_M_7." + item.fext, item.map7.substring(22), { base64: true })
                zip.file(item.name + "_M_8." + item.fext, item.map8.substring(22), { base64: true })
                zip.file(item.name + "_M_9." + item.fext, item.map9.substring(22), { base64: true })
            }
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
                    <>
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
                                                        setMapNumber(0)
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
                                                        setMapNumber(0)
                                                        setN("durl")
                                                    }} />
                                                </>
                                            )}
                                        </>
                                    }

                                </div>
                                {pair.intrinsic && <div className="image_row">
                                    <div className='cqc__p'>
                                        <p>Intrinsic Image</p>
                                    </div>
                                    {pair.fext == "fit" || pair.fext == "tiff" || pair.fext == "fits" || pair.fext == "FIT" || pair.fext == "TIFF" || pair.fext == "FITS" ?
                                        <div className="image_preview" >Preview Not Available for {pair.fext} extension!</div>
                                        :
                                        <>
                                            <img src={`${pair.intrinsic}`} className="image_preview" alt="reload" onClick={() => {
                                                setOpenModal(true)
                                                setIndex(index)
                                                setMapNumber(0)
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
                                {!pair.intrinsic && pair.mappingInProgress &&
                                    <div className="spin">
                                        <p>Mapping in Progress...</p>
                                        <p>Processed {pair.mappingCount}/9 </p>
                                    </div>
                                }
                                {!pair.intrinsic && pair.mappingCount == 9 &&
                                    <div className="spin">
                                        <p>Mapping Completed</p>
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
                        {
                            mapping && pair.mappingCount == 9 && <>
                                <div key={index * 2} className="mappingServices">
                                    <div className="mapping_row">

                                        <div className="image_row">
                                            {pair.map1 != null ?
                                                <img src={`${pair.map1}`} className="mapping_image" alt="reload" onClick={() => {

                                                    setMapNumber(1)
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setN("intr")
                                                }} />
                                                :
                                                <div className="regSpinerBox">
                                                    <div class="reg-spinner"></div>
                                                </div>
                                            }
                                        </div>

                                        <div className="image_row">
                                            {pair.map2 != null ?
                                                <img src={`${pair.map2}`} className="mapping_image" alt="reload" onClick={() => {

                                                    setMapNumber(2)
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setN("intr")
                                                }} />
                                                :
                                                <div className="regSpinerBox">
                                                    <div class="reg-spinner"></div>
                                                </div>
                                            }
                                        </div>

                                        <div className="image_row">
                                            {pair.map3 != null ?
                                                <img src={`${pair.map3}`} className="mapping_image" alt="reload" onClick={() => {

                                                    setMapNumber(3)
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setN("intr")
                                                }} />
                                                :
                                                <div className="regSpinerBox">
                                                    <div class="reg-spinner"></div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="mapping_row">

                                        <div className="image_row">
                                            {pair.map4 != null ?
                                                <img src={`${pair.map4}`} className="mapping_image" alt="reload" onClick={() => {

                                                    setMapNumber(4)
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setN("intr")
                                                }} />
                                                :
                                                <div className="spin">
                                                    <div class="reg-spinner"></div>
                                                </div>
                                            }
                                        </div>

                                        <div className="image_row">
                                            {pair.map5 != null ?
                                                <img src={`${pair.map5}`} className="mapping_image" alt="reload" onClick={() => {

                                                    setMapNumber(5)
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setN("intr")
                                                }} />
                                                :
                                                <div className="spin">
                                                    <div class="reg-spinner"></div>
                                                </div>
                                            }
                                        </div>

                                        <div className="image_row">
                                            {pair.map6 != null ?
                                                <img src={`${pair.map6}`} className="mapping_image" alt="reload" onClick={() => {

                                                    setMapNumber(6)
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setN("intr")
                                                }} />
                                                :
                                                <div className="spin">
                                                    <div class="reg-spinner"></div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="mapping_row">

                                        <div className="image_row">
                                            {pair.map7 != null ?
                                                <img src={`${pair.map7}`} className="mapping_image" alt="reload" onClick={() => {

                                                    setMapNumber(7)
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setN("intr")
                                                }} />
                                                :
                                                <div className="spin">
                                                    <div class="reg-spinner"></div>
                                                </div>
                                            }
                                        </div>

                                        <div className="image_row">
                                            {pair.map8 != null ?
                                                <img src={`${pair.map8}`} className="mapping_image" alt="reload" onClick={() => {
                                                    setMapNumber(8)
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setN("intr")
                                                }} />
                                                :
                                                <div className="spin">
                                                    <div class="reg-spinner"></div>
                                                </div>
                                            }
                                        </div>

                                        <div className="image_row">
                                            {pair.map9 != null ?
                                                <img src={`${pair.map9}`} className="mapping_image" alt="reload" onClick={() => {
                                                    setMapNumber(9)
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setN("intr")
                                                }} />
                                                :
                                                <div className="spin">
                                                    <div class="reg-spinner"></div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </>
                        }

                    </>
                ))}
                {openModal && <Modal num={n} ind={index} mapNumber={mapNumber} pair={imagePairs} onClose={() => setOpenModal(false)} />}

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
                        <button type="button" onClick={handleSubmit} className="process_button" disabled={loading || imagePairs.length > usersTokens}>
                            Process Images
                        </button>
                        {
                            (email == "abe@quantcyte.org" || email == "ngocic97@gmail.com") &&
                            <button type="button" onClick={handleMapping} className="process_button">
                                Intrinsic Mapping
                            </button>
                        }
                    </div>
                }
                {
                    imagePairs.length > usersTokens &&
                    <div className="button_div">
                        <p className="black_text">Not enough processing tokens!</p>
                        <button className='blue_button' onClick={(e) => goToWebShop(e)}>Buy more tokens</button>
                    </div>
                }
                <div className="tokens_row">
                    <p>Image pairs to process: {imagePairs.length} <br />Available Processing Tokens: {usersTokens}</p>
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
