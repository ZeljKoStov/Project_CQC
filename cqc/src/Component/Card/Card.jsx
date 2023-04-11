import React from 'react'
import './card.css';
import img from '../../assets/diffuser.png';
const Card = (props) => {

  return (
    <div className='Card_div'>
        <div className='Card_img'>
            <img  src={img} alt='img' />
        </div>
        <div>
          <h2>{props.item.title}</h2>
        </div>
        <p>{props.item.content}</p>
        <div className='Card_price'>
          <p>${parseFloat(props.item.price).toFixed(2)}</p>
          <button onClick = {()=> {props.onClick(props.item.id)}}>Order</button>
        </div>
    </div>
  )
}

export default Card
