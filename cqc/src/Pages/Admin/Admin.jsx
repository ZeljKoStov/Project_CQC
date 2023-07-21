import React, { useState, useEffect } from 'react';
import Slider from '../../Component/Slider/Slider'
import { useNavigate } from "react-router-dom";
import { RequestAPI } from '../../utils/request-api'
import { getSubs, getFocused, getDiffused, getIntrinsic } from '../../api/api'

import "./Admin.css"


import f1 from "../../assets/week/week1_f.jpg"
import { MdClear } from "react-icons/md"



const Admin = ({ userEmail }) => {

    const [count, setCount] = useState(0)
    const [openModal, setOpenModal] = useState(false);
    const [imageToShow, setImageToShow] = useState(f1);
    const [subs, setSubs] = useState([{
        email: "",
        subject: "",
        desc: "",
        uuid: "",
        ext: "",
        createdAt: "",
        focused: null,
        diffused: null,
        intrinsic: null,
    }]);
    const [currentPage, setCurrentPage] = useState(1);


    const [dataFetched, setDataFetched] = useState(false);
    const [imagesFetched, setImagesFetched] = useState(false);
    useEffect(() => {
        if (!dataFetched) {
            fetchData()
            setDataFetched(true);
        }
    });

    useEffect(() => {
        if (subs.length > 1 && !imagesFetched) {
            subs.slice(currentPage * 10 - 10, currentPage * 10).map((item, index) => {
                loadImages(currentPage * 10 - 10 + index)
                console.log("IMAGE LOAD SART "+index)
            });
            setImagesFetched(true);
        }
    }, [subs])

    const load = async (page) => {
        console.log("PAGE "+page)
        subs.slice(page * 10 - 10, page * 10).map((item, index) => {
            loadImages(page * 10 - 10 + index)
            console.log("IMAGE LOAD SART "+ page * 10 - 10 + index)
        });
    }

    const fetchData = async () => {
        try {
            const body = {
                email: userEmail
            }
            const response = await RequestAPI(getSubs(body));
            if (response.status === 200) {
                const list = response.data.subs
                setSubs(list.sort(compareDatesDesc));
            }
        } catch (error) {
            console.log(error);
        }
    }

    function compareDatesDesc(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        load(pageNumber)
    };

    const loadImages = async (index) => {
        try {
            const body = {
                uuid: subs[index].uuid,
                ext: subs[index].ext
            }

            const responseF = await RequestAPI(getFocused(body));
            const responseD = await RequestAPI(getDiffused(body));
            const responseI = await RequestAPI(getIntrinsic(body));

            const list = [...subs];

            if (responseD.status === 200) { list[index].diffused = responseD.data }
            if (responseF.status === 200) { list[index].focused = responseF.data }
            if (responseI.status === 200) { list[index].intrinsic = responseI.data }
            setSubs(list);
            updateUI();

        } catch (error) {
            console.log(error);
        }
    }

    const updateUI = () => {
        const prev = count;
        const min = count;
        const max = 1000000;
        const rand = min + Math.random() * (max - min);
        setCount(rand);
    }


    return (
        <div className='Admin'>
            <h1>Admin Panel</h1>
            <div className="admin-form-field">
                {subs.slice(currentPage * 10 - 10, currentPage * 10).map((item, index) => (
                    <div key={index} className="admin_services">
                        <div className="admin_first_row">
                            <div className="admin_input_item">
                                <p>ID: </p>
                                <p>{item.uuid}</p>
                            </div>
                            <div className="admin_input_item">
                                <p>Date: </p>
                                <p>{formatDate(item.createdAt)}</p>
                            </div>
                            <div className="admin_input_item">
                                <p>Subject:</p>
                                <p>{item.subject}</p>
                            </div>
                            <div className="admin_input_item">
                                <p>Description:</p>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                        <div className="Admin_Second_row">
                            {
                                item.focused &&
                                <div className="image_row">
                                    <div className='admin__p'>
                                        <p>Original</p>
                                    </div>
                                    <img src={`${item.focused}`} className="image_preview" alt="reload" onClick={() => {
                                        setOpenModal(true)
                                        setImageToShow(item.focused)
                                    }} />

                                </div>
                            }
                            {!item.focused &&
                                <div className="admin_spin">
                                    <div class="reg-spinner"></div>
                                </div>
                            }
                            {
                                item.diffused &&
                                <div className="image_row">
                                    <div className='admin__p'>
                                        <p>Diffused</p>
                                    </div>
                                    <img src={`${item.diffused}`} className="image_preview" alt="reload" onClick={() => {
                                        setOpenModal(true)
                                        setImageToShow(item.diffused)
                                    }} />

                                </div>
                            }
                            {!item.diffused &&
                                <div className="admin_spin">
                                    <div class="reg-spinner"></div>
                                </div>
                            }

                            {
                                item.intrinsic &&
                                <div className="image_row">
                                    <div className='admin__p'>
                                        <p>Intrinsic</p>
                                    </div>
                                    <img src={`${item.intrinsic}`} className="image_preview" alt="reload" onClick={() => {
                                        setOpenModal(true)
                                        setImageToShow(item.intrinsic)
                                    }} />

                                </div>
                            }
                            {!item.intrinsic &&
                                <div className="admin_spin">
                                    <div class="reg-spinner"></div>
                                </div>
                            }

                        </div>
                    </div>



                ))}

                <div>
                    {Array.from({ length: Math.ceil(subs.length / 10) }, (_, index) => (
                        <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                            { currentPage == index + 1 ?
                                <p  style={{color: "blue"}}>{index + 1}0</p>
                                :
                                <p>{index + 1}0</p>
                            }
                            
                        </button>
                    ))}
                </div>

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

export default Admin
