import React, { useState, useEffect } from 'react';
import Slider from '../../Component/Slider/Slider'
import { useNavigate } from "react-router-dom";
import { RequestAPI } from '../../utils/request-api'
import { getCookie } from '../../utils/cookies';
import { getAllOrders } from '../../api/api'
import SearchBar from '../../Component/SearchBar/SearchBar'

import "./AdminOrders.css"


import f1 from "../../assets/1st_i.jpg"
import { MdClear } from "react-icons/md"



const AdminOrders = () => {

    const [count, setCount] = useState(0)
    const [openModal, setOpenModal] = useState(false);
    const [imageToShow, setImageToShow] = useState(f1);
    const [email, setEmail] = useState('');
    const [allOrders, setAllOrders] = useState([{
        userID: "",
        items: [],
        address: "",
        totalPriceInCents: 0,
        totalShippingInCents: 0,
        createdAt: ""
    }]);
      
    const [searched, setSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataFetched, setDataFetched] = useState(false);
    const [imagesFetched, setImagesFetched] = useState(false);


    useEffect(() => {
        if (!dataFetched) {
            fetchData()
            setDataFetched(true);
        }
    });

    const fetchData = async () => {
        try {
            const emailCookie = getCookie('_email')
            setEmail(emailCookie)

            const body = {
                email: emailCookie
            }

            const response = await RequestAPI(getAllOrders(body));
            console.log(response);
            if (response.status === 200) {
                const list = response.data.orders;
                //setAllOrders(list.sort(compareDatesDesc));
                setAllOrders(list.sort(compareDatesDesc));
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
        // setCurrentPage(pageNumber);
        // load(pageNumber)
    };

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
                {allOrders.map((item, index) => (
                    <div key={index} className="admin_services">
                        <div className="admin_first_row">
                            <div className="admin_input_item">
                                <p>userID: </p>
                                <p>{item.userID}</p>
                            </div>
                            <div className="admin_input_item">
                                <p>address: </p>
                                <p>{item.address}</p>
                            </div>
                            <div className="admin_input_item">
                                <p>totalPriceInCents: </p>
                                <p>{item.totalPriceInCents}</p>
                            </div>
                            <div className="admin_input_item">
                                <p>totalShippingInCents: </p>
                                <p>{item.totalShippingInCents}</p>
                            </div>
                            <div className="admin_input_item">
                                <p>createdAt: </p>
                                <p>{item.createdAt}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* <div>
                    {Array.from({ length: Math.ceil(subs.length / 10) }, (_, index) => (
                        <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                            {currentPage == index + 1 ?
                                <p style={{ color: "blue" }}>{index + 1}0</p>
                                :
                                <p>{index + 1}0</p>
                            }

                        </button>
                    ))}
                </div> */}

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

export default AdminOrders
