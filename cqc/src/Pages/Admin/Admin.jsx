import React, { Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import './Admin.css';
import back from "../../assets/back.jpeg"

const Admin = () => {

    let navigate = useNavigate();

    const goToSubbmissions = (e) => {
        e.preventDefault()
        
        let path = `/AdminSubbmissions`;
        navigate(path);
    }

    const goToOrders = (e) => {
        e.preventDefault()

        let path = `/AdminOrders`;
        navigate(path);
    }

    return (
        <Fragment>
            {

              <div className='container'>
                  <img src={back} alt="Girl in a jacket" className='backgroundImage' />
                  <div className='login_body'>
                      <div className='title'>
                          <spam>Admin Panel</spam>
                      </div>
                      <form className="login-form">
                          <spam htmlFor='email'>Submissions</spam>
                          <button className='blue_button' onClick={e => goToSubbmissions(e)}>Go To Submissions</button>
                          <spam htmlFor='email'>Orders</spam>
                          <button className='blue_button' onClick={ (e) => goToOrders(e)}>Go To Orders</button>
                      </form>
                  </div>
              </div>

            }
        </Fragment>
    )
}

export default Admin