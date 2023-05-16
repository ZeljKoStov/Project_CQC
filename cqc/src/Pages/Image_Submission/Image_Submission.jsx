import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './image_Submission.css'
import submission_image from '../../assets/Submission.png';
import { RequestAPI } from '../../utils/request-api'
import { submit } from '../../api/api'

const Submission = ({ userEmail }) => {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/Intrinsic_Challenge`;
    navigate(path);
  }

  const [diffused, setDiffused] = useState();
  const [focused, setFocused] = useState();
  const [intrinsic, setIntrinsic] = useState();
  const [ext, setExt] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSelectDiffused = (event) => {
    setDiffused(event.target.files[0]);
  };

  const onSelectFocused = (event) => {
    const f = event.target.files[0]
    const fileName = f.name;
    setExt(fileName.substring(fileName.lastIndexOf(".") + 1));
    setFocused(f);
  };

  const onSelectIntrinsic = (event) => {
    setIntrinsic(event.target.files[0]);
  };

  const onSubjectChanged = (event) => {
    setSubject(event.target.value)
  }

  const onDescChanged = (event) => {
    setDesc(event.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("F", focused);
    formData.append("D", diffused);
    formData.append("I", intrinsic);
    formData.append("subject", subject);
    formData.append("desc", desc);
    formData.append("ext", ext);
    formData.append("email", userEmail);
    try {
      const response = await RequestAPI(submit(formData));
      if (response.status === 200) {
        setLoading(false);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bro'>
      {
        loading && <div class="header-spinner-overlay">
          <div class="header-spinner"></div>
        </div>
      }
      <div className='Submission'>
        <div className='Submission_img'>
          <img src={submission_image} alt='img' />
        </div>
        <div className='Submission_text'>
          <h2>Intrinsic Image of the Week Submission</h2>
          <p>Intrinsic is a completely new method of photography. How the Intrinsic Image will appear is rarely predictable. The goal of this photographic challenge, relative to the original image, is to produce the most surprising, most interesting intrinsic image of the week.</p>
        </div>
        <div className='Submission_Subject'>
          <h3>Subject Matter of the Images</h3>
          <input
            type="text"
            value={subject}
            onChange={onSubjectChanged}
          />
        </div>
        <div className='Submission_Description'>
          <h3>Description of the Field of View and Camera Settings</h3>
          <input
            type="text"
            value={desc}
            onChange={onDescChanged}
          />
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
            {diffused && <a href={URL.createObjectURL(diffused)} target="_blank" rel="noreferrer"><img src={URL.createObjectURL(diffused)} className="image_preview" alt="reload" /></a>}
          </div>
          <div className="image_row">
            <div className='cqc__p'><p>Focused Image</p>  </div>
            {focused && <a href={URL.createObjectURL(focused)} target="_blank" rel="noreferrer"><img src={URL.createObjectURL(focused)} className="image_preview" alt="reload" /></a>}
          </div>
          <div className="image_row">
            <div className='cqc__p'><p>Intrinsic Image</p>  </div>
            {intrinsic && <a href={URL.createObjectURL(intrinsic)} target="_blank" rel="noreferrer"><img src={URL.createObjectURL(intrinsic)} className="image_preview" alt="reload" /></a>}
          </div>
        </div>
        <div className='sub'>
          <button className='Back' onClick={routeChange}>Back</button>
          <button className='Sub' onClick={(e) => onSubmit(e)}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Submission