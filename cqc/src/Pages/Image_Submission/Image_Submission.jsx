import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import './image_Submission.css'
import submission_image from '../../assets/Submission.png';

const Image_Submission = () => {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/Intrinsic_Challenge`; 
    navigate(path);
  }

  const [diffused, setDiffused] = useState();
  const [focused, setFocused] = useState();
  const [intrinsic, setIntrinsic] = useState();

  const onSelectDiffused=(event)=>{
    setDiffused(URL.createObjectURL(event.target.files[0]));
  };

  const onSelectFocused=(event)=>{
    setFocused(URL.createObjectURL(event.target.files[0]));
  };

  const onSelectIntrinsic=(event)=>{
    setIntrinsic(URL.createObjectURL(event.target.files[0]));
  };




  return (
    <div className='bro'>
      <div className='Submission'>
        <div className='Submission_img'>
          <img src={submission_image} alt='img'/>
        </div>   
        <div className='Submission_text'>
            <h2>Intrinsic Image of the Week Submission</h2>
            <p>Intrinsic is a completely new method of photography. How the Intrinsic Image will appear is rarely predictable. The goal of this photographic challenge, relative to the original image, is to produce the most surprising, most interesting intrinsic image of the week.</p>
        </div>
        <div className='Submission_Subject'>
          <h3>Subject Matter of the Images</h3>
          <input type="text"></input>
        </div>
        <div className='Submission_Description'>
          <h3>Description of the Field of View and Camera Settings</h3>
          <input type="text"></input>
        </div>
        <div className='Submission_Upload'>
          <div className="input_item">
                <p>Diffused Image Submission</p>  
                <input
                    type="file"
                    onChange={onSelectDiffused}
                    multiple
                />
            </div>
            <div className="input_item">
                <p>Focused Image Submission</p>  
                <input
                    type="file"
                    onChange={onSelectFocused}
                    multiple
                    />
            </div>
            <div className="input_item">
                <p>Intrinsic Image Submission</p>  
                <input
                    type="file"
                    onChange={onSelectIntrinsic}
                    multiple
                /> 
            </div>
        </div>

        <div className="Second_row">
          <div className="image_row">
            <div className='cqc__p'><p>Diffused Image</p>  </div>
              {diffused && <a href={diffused} target="_blank" rel="noreferrer"><img src={diffused} className="image_preview" alt="reload"/></a>}
          </div>
          <div className="image_row">
            <div className='cqc__p'><p>Focused Image</p>  </div>
              {focused && <a href={focused} target="_blank" rel="noreferrer"><img src={focused} className="image_preview" alt="reload"/></a>}
          </div>
          <div className="image_row">
            <div className='cqc__p'><p>Intrinsic Image</p>  </div>
              {intrinsic && <a href={intrinsic} target="_blank" rel="noreferrer"><img src={intrinsic} className="image_preview" alt="reload"/></a>}
          </div>
        </div> 
        <div className='sub'>
            <button className='Back' onClick={routeChange }>Back</button>
            <button className='Sub'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Image_Submission
