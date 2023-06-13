import React, { useState, useEffect } from 'react';
import Slider from '../../Component/Slider/Slider'
import { useNavigate } from "react-router-dom";
import { RequestAPI } from '../../utils/request-api'
import { getSubs, getFocused, getDiffused, getIntrinsic } from '../../api/api'

import "./Admin.css"

import f0 from "../../assets/week/f0.jpg"
import { MdClear } from "react-icons/md"



const Admin = ({ userEmail }) => {

    const [count, setCount] = useState(0)
    const [openModal, setOpenModal] = useState(false);
    const [imageToShow, setImageToShow] = useState(f0);
    const [subs, setSubs] = useState([{
        email: "",
        subject: "",
        desc: "",
        uuid: "",
        ext: "",
        focused: null,
        diffused: null,
        intrinsic: null,
    }]);


    const [dataFetched, setDataFetched] = useState(false);
    const [imagesFetched, setImagesFetched] = useState(false);
    useEffect(() => {
        if (!dataFetched) {
            fetchData()
            setDataFetched(true);
        }
    });

    useEffect(()=>{
        console.log("subs")
        if(subs.length>1 && !imagesFetched){

            console.log("subs L")
            subs.map((item, index)=>{
                loadImages(index)

                console.log(index)
            });
            setImagesFetched(true);
        }
    },[subs])

    const fetchData = async () => {
        try {
            const body = {
                email: userEmail
            }
            const response = await RequestAPI(getSubs(body));
            if (response.status === 200) {
                const list = response.data.subs
                setSubs(list);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
            if (responseF.status === 200) { list[index].focused = responseF.data }
            if (responseD.status === 200) { list[index].diffused = responseD.data }
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
                {subs.map((item, index) => (
                    <div key={index} className="admin_services">
                        <div className="first_row">
                            <div className="empty_block"></div>
                            <div className="admin_input_item">
                                <p>Subject</p>
                                <textarea
                                    value={item.subject}
                                    onChange={(e)=>loadImages(index)}
                                />
                            </div>
                            <div className="admin_input_item">
                                <p>Description</p>
                                <textarea
                                    value={item.desc}
                                />
                            </div>
                        </div>
                        <div className="Admin_Second_row">
                            {
                                item.focused &&
                                <div className="image_row">
                                    <div className='cqc__p'>
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
                                    <div className='cqc__p'>
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
                                    <div className='cqc__p'>
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
