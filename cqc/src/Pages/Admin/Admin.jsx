import React, { useState, useEffect } from 'react';
import Slider from '../../Component/Slider/Slider'
import { useNavigate } from "react-router-dom";
import { RequestAPI } from '../../utils/request-api'
import { getCookie } from '../../utils/cookies';
import { getSubs, getFocused, getDiffused, getIntrinsic, deleteSubmition, getMyScores, submitScore, getAllScores } from '../../api/api'

import "./Admin.css"


import f1 from "../../assets/1st_i.jpg"
import { MdClear } from "react-icons/md"



const Admin = () => {

    const [count, setCount] = useState(0)
    const [openModal, setOpenModal] = useState(false);
    const [imageToShow, setImageToShow] = useState(f1);
    const [email, setEmail] = useState('');
    const [subs, setSubs] = useState([{
        email: "",
        subject: "",
        desc: "",
        uuid: "",
        ext: "",
        createdAt: "",
        hidden: true,
        focused: null,
        diffused: null,
        intrinsic: null,
        score: '',
        toSave: false,
        totalScore: 0,
        numberOfScores: 0
    }]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataFetched, setDataFetched] = useState(false);
    const [imagesFetched, setImagesFetched] = useState(false);


    const scoreChange = (e, index) => {
        const value = e.target.value;

        const intValue = parseInt(value, 10);
        if (!isNaN(intValue) && intValue >= 1 && intValue <= 5) {

            const newSubs = [...subs];
            newSubs[index].score = intValue
            newSubs[index].toSave = true
            setSubs(newSubs)
        }
    };

    const saveScore = async (index) => {
        const body = {
            email: email,
            submissionID: subs[index].uuid,
            score: subs[index].score
        }
        const response = await RequestAPI(submitScore(body));
        if (response.status === 200) {
            const newSubs = [...subs];
            newSubs[index].toSave = false
            setSubs(newSubs)
        }
    }

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
            });
            setImagesFetched(true);
        }
    }, [subs])

    const load = async (page) => {
        subs.slice(page * 10 - 10, page * 10).map((item, index) => {
            loadImages(page * 10 - 10 + index)
        });
    }

    const fetchData = async () => {
        try {
            const emailCookie = getCookie('_email')
            setEmail(emailCookie)
            const body = {
                email: emailCookie
            }
            const response = await RequestAPI(getSubs());
            if (response.status === 200) {
                const list = response.data.subs.filter(function (sub) {
                    return !sub.hidden;
                });
                setSubs(list.sort(compareDatesDesc));
                const myScores = await RequestAPI(getMyScores(body));
                list.map(item => {
                    myScores.data.myScores.map(it => {
                        if (it.submissionID == item.uuid) {
                            item.score = it.score
                        }
                    })
                })
                const allScores = await RequestAPI(getAllScores(body));
                list.map(item => {
                    item.totalScore = 0
                    item.numberOfScores = 0
                    allScores.data.allScores.map(it => {
                        if (it.submissionID == item.uuid) {
                            item.totalScore = parseInt(item.totalScore) + parseInt(it.score)
                            item.numberOfScores = parseInt(item.numberOfScores) + 1
                        }
                    })
                })
                setSubs(list)
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

    const deleteSubmission = async (id) => {
        try {
            const body = {
                id: id
            }
            const response = await RequestAPI(deleteSubmition(body));
            if (response.status === 200) {
                const newSubs = [...subs]
                subs.map((item, index) => {
                    if (item.uuid == id) {
                        newSubs[index].hidden = true
                    }
                });

                setSubs(newSubs)
            }
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
                    !item.hidden &&
                    <div key={index} className="admin_services">
                        <div className="admin_first_row">
                            <div className="admin_input_item">
                                <p>Enter score:</p>
                                <input
                                    type="number"
                                    value={item.score}
                                    onChange={e => scoreChange(e, index)}
                                    min="1"
                                    max="5"
                                />
                                {item.toSave && <button type='button' className="score_button" onClick={() => { saveScore(index) }}>Save</button>}
                            </div>
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
                                <p>Description:{item.desc} </p>
                            </div>
                            {
                                (email == "abe@quantcyte.org" || email == "ngocic97@gmail.com") &&
                                <div className="admin_input_item">
                                    {
                                        item.hidden ?
                                            <p>Submission deleted</p>
                                            :
                                            <button type='button' className="login_button" onClick={() => { deleteSubmission(item.uuid) }}>Delete Sub</button>

                                    }
                                </div>
                            }
                            {
                                (email == "abe@quantcyte.org" || email == "ngocic97@gmail.com") &&
                                <>
                                    {
                                        item.numberOfScores > 0 ?
                                            <div className="admin_input_item">
                                                <p>Average rating:</p>
                                                <p>{item.totalScore / item.numberOfScores} from {item.numberOfScores} scores</p>
                                            </div>
                                            :
                                            <div className="admin_input_item">
                                                <p>No Scores</p>
                                            </div>
                                    }

                                </>

                            }

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
                            {currentPage == index + 1 ?
                                <p style={{ color: "blue" }}>{index + 1}0</p>
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
