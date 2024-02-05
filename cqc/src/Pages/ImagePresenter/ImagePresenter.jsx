import React, { useState, useEffect } from "react";
import FileSaver from 'file-saver';
import JSZip from "jszip"
import { getCookie } from '../../utils/cookies';
import { processing, changeExposure, userData } from "../../api/api";
import { RequestAPI } from "../../utils/request-api";
import { useNavigate } from "react-router-dom";
import { Modal } from '../../Component';
import './ImagePresenter.css'
import silver_token from "../../assets/silver_token.gif"

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import GalleryURL from '../../Component/Gallery/GalleryURL'


const ImagePresenter = () => {

    const [openModal, setOpenModal] = useState(false);
    const [index, setIndex] = useState();
    const [mapNumber, setMapNumber] = useState(0);
    const [usersTokens, setUsersTokens] = useState(0);
    const [n, setN] = useState('');
    const [email, setEmail] = useState("");

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

        setImagePairs([]);
        updateUI();
    }

    useEffect(() => {
        //if (imagePairs.length == 0) handleServiceAdd()
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

                        downloadAuto();

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
                zip.file(item.name + "_M_00." + item.fext, item.map1.substring(22), { base64: true })
                zip.file(item.name + "_M_01." + item.fext, item.map2.substring(22), { base64: true })
                zip.file(item.name + "_M_02." + item.fext, item.map3.substring(22), { base64: true })
                zip.file(item.name + "_M_10." + item.fext, item.map4.substring(22), { base64: true })
                zip.file(item.name + "_M_11." + item.fext, item.map5.substring(22), { base64: true })
                zip.file(item.name + "_M_12." + item.fext, item.map6.substring(22), { base64: true })
                zip.file(item.name + "_M_20." + item.fext, item.map7.substring(22), { base64: true })
                zip.file(item.name + "_M_21." + item.fext, item.map8.substring(22), { base64: true })
                zip.file(item.name + "_M_22." + item.fext, item.map9.substring(22), { base64: true })
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
                zip.file(item.name + "_M_00." + item.fext, item.map1.substring(22), { base64: true })
                zip.file(item.name + "_M_01." + item.fext, item.map2.substring(22), { base64: true })
                zip.file(item.name + "_M_02." + item.fext, item.map3.substring(22), { base64: true })
                zip.file(item.name + "_M_10." + item.fext, item.map4.substring(22), { base64: true })
                zip.file(item.name + "_M_11." + item.fext, item.map5.substring(22), { base64: true })
                zip.file(item.name + "_M_12." + item.fext, item.map6.substring(22), { base64: true })
                zip.file(item.name + "_M_20." + item.fext, item.map7.substring(22), { base64: true })
                zip.file(item.name + "_M_21." + item.fext, item.map8.substring(22), { base64: true })
                zip.file(item.name + "_M_22." + item.fext, item.map9.substring(22), { base64: true })
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

    const handleImageChange = (e) => {
        const files = e.target.files;
        console.log(files);
        console.log(files.length / 3)

        var pairs = []

        for (let i = 0; i < (files.length / 3); i++) {
            pairs.push(
                {
                    focused: files[i * 3],
                    fext: "",
                    furl: "",
                    ferror: false,
                    diffused: files[i * 3 + 1],
                    dext: "",
                    durl: "",
                    derror: false,
                    name: "",
                    doterror: false,
                    nerror: false,
                    serror: false,
                    exterror: false,
                    intrinsic: files[i * 3 + 2],
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

        console.log(pairs)

        setImagePairs(pairs);
        updateUI();

    };

    const handleMappingChange = (e) => {
        const files = e.target.files;

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
                name: "",
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
        console.log(files);
        console.log(files.length / 3)

        var pairs = []

        for (let i = 0; i < (files.length / 3); i++) {
            pairs.push(
                {
                    focused: files[i * 3],
                    fext: "",
                    furl: "",
                    ferror: false,
                    diffused: files[i * 3 + 1],
                    dext: "",
                    durl: "",
                    derror: false,
                    name: "",
                    doterror: false,
                    nerror: false,
                    serror: false,
                    exterror: false,
                    intrinsic: files[i * 3 + 2],
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



    return (
        <div className='cqc__presenter'>
            <div className='cqc__text'>
                <h1>Image Presenter</h1>
                <p>Select Images to View Them</p>

                {
                    mappingObject.map1 == null && imagePairs.length == 0 &&
                    <div className="uploadImagesBackground">
                        <div className="input_images">
                            <p>Upload Images</p>
                            <input type="file" multiple onChange={handleImageChange} />
                            <p></p>
                            <p>Upload Mappings</p>
                            <input type="file" multiple onChange={handleMappingChange} />
                        </div>
                    </div>
                }

            </div>


            {
                <div className="form-field">
                    {imagePairs.map((pair, index) => (
                        <>
                            <div key={index} className="services">
                                <div className="Second_row">
                                    <div className="image_row">
                                        <div className='cqc__p'><p>Original Image</p>  </div>
                                        {pair.focused && (
                                            <>
                                                <img src={URL.createObjectURL(pair.focused)} className="image_preview" alt="reload" onClick={() => {
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setMapNumber(0)
                                                    setN("furl")
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
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setMapNumber(0)
                                                    setN("furl")
                                                }} />
                                            </>
                                        )}

                                    </div>
                                    {pair.intrinsic && <div className="image_row">
                                        <div className='cqc__p'>
                                            <p>Intrinsic Image</p>
                                        </div>
                                        {pair.diffused && (
                                            <>
                                                <img src={URL.createObjectURL(pair.intrinsic)} className="image_preview" alt="reload" onClick={() => {
                                                    setOpenModal(true)
                                                    setIndex(index)
                                                    setMapNumber(0)
                                                    setN("furl")
                                                }} />
                                            </>
                                        )}
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
                                </div>
                            </div>
                        </>
                    ))}
                    {imagePairs.length > 0 &&
                        <>
                            <div className="button_div" style={{ paddingLeft: '200px' }} >
                                <label for="files"  class='blue_button'>Select More Images</label>
                                <input id="files" style={{ visibility: 'hidden' }} type="file" multiple onChange={handleImageAdding} />
                            </div>
                        </>

                    }

                    {
                        mappingObject.map1 && <>
                            <div className="mappingServices">
                                <div className="mapping_row">

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map1)} className="mapping_image" alt="reload" onClick={() => {
                                            setMapNumber(1)
                                            setOpenModal(true)
                                            setIndex(index)
                                            setN("intr")
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map2)} className="mapping_image" alt="reload" onClick={() => {
                                            setMapNumber(1)
                                            setOpenModal(true)
                                            setIndex(index)
                                            setN("intr")
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map3)} className="mapping_image" alt="reload" onClick={() => {
                                            setMapNumber(1)
                                            setOpenModal(true)
                                            setIndex(index)
                                            setN("intr")
                                        }} />
                                    </div>
                                </div>
                                <div className="mapping_row">

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map4)} className="mapping_image" alt="reload" onClick={() => {
                                            setMapNumber(1)
                                            setOpenModal(true)
                                            setIndex(index)
                                            setN("intr")
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map5)} className="mapping_image" alt="reload" onClick={() => {
                                            setMapNumber(1)
                                            setOpenModal(true)
                                            setIndex(index)
                                            setN("intr")
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map6)} className="mapping_image" alt="reload" onClick={() => {
                                            setMapNumber(1)
                                            setOpenModal(true)
                                            setIndex(index)
                                            setN("intr")
                                        }} />
                                    </div>
                                </div>
                                <div className="mapping_row">

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map7)} className="mapping_image" alt="reload" onClick={() => {
                                            setMapNumber(1)
                                            setOpenModal(true)
                                            setIndex(index)
                                            setN("intr")
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map8)} className="mapping_image" alt="reload" onClick={() => {
                                            setMapNumber(1)
                                            setOpenModal(true)
                                            setIndex(index)
                                            setN("intr")
                                        }} />
                                    </div>

                                    <div className="map_row">
                                        <img src={URL.createObjectURL(mappingObject.map9)} className="mapping_image" alt="reload" onClick={() => {
                                            setMapNumber(1)
                                            setOpenModal(true)
                                            setIndex(index)
                                            setN("intr")
                                        }} />
                                    </div>
                                </div>
                            </div>

                            <div key={index} className="servicesGallery">
                                <div className="rowGallery">
                                    <div className="galleryURL">
                                        <GalleryURL images={mappingImages} />
                                    </div>

                                </div>
                            </div>


                        </>

                    }

                    {openModal && <Modal num={n} ind={index} mapNumber={mapNumber} pair={imagePairs} onClose={() => setOpenModal(false)} />}
                </div>
            }
        </div>
    )
}

export default ImagePresenter
