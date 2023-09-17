import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './image_Submission.css'
import submission_image from '../../assets/Submission.png';
import { RequestAPI } from '../../utils/request-api'
import { getCookie } from '../../utils/cookies';
import { getMySub, submit, getFocused, getDiffused, getIntrinsic, } from '../../api/api'


const Submission = ({ userEmail }) => {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/Intrinsic_Challenge`;
    navigate(path);
  }

  const [diffused, setDiffused] = useState(null);
  const [focused, setFocused] = useState(null);
  const [intrinsic, setIntrinsic] = useState(null);
  const [ext, setExt] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [uuid, setUUID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [email, setEmail] = useState("");
  const [found, setFound] = useState(false);

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
      const response = await RequestAPI(getMySub(body));
      if (response.status === 200 && response.data.subs.length > 0) {
        loadImages(response.data.subs[0]);

      }
    } catch (error) {
      console.log(error);
    }
  }

  const loadImages = async (sub) => {
    try {
      const body = {
        uuid: sub.uuid,
        ext: sub.ext
      }

      const responseF = await RequestAPI(getFocused(body));
      const responseD = await RequestAPI(getDiffused(body));
      const responseI = await RequestAPI(getIntrinsic(body));

      console.log(responseD)
      if (responseD.status === 200) { 
        setDiffused(responseD.data)
        console.log(responseD.data)
      }
      if (responseF.status === 200) { setFocused(responseF.data) }
      if (responseI.status === 200) { setIntrinsic(responseI.data) }

      setFound(true);
      setSubject(sub.subject);
      setDesc(sub.desc);
      setExt(sub.ext);
      setUUID(sub.uuid);

    } catch (error) {
      console.log(error);
    }
  }

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
    formData.append("uuid", uuid);
    formData.append("email", email);
    try {
      const response = await RequestAPI(submit(formData));
      if (response.status === 200) {
        setLoading(false);
        setCompleted(true);
      }

    } catch (error) {
      console.log(error);
    }
  }


  const onNewImagePair = (e) => {
    e.preventDefault();
    setDiffused(null);
    setFocused(null);
    setIntrinsic(null);
    setExt("");
    setSubject("");
    setDesc("");
    setLoading(false);
    setCompleted(false);
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
          <h2>Intrinsic Image of the Month Submission</h2>
          <p>Intrinsic is a completely new method of photography. How the Intrinsic Image will appear is rarely predictable. The goal of this photographic challenge, relative to the original image, is to produce the most surprising, most interesting intrinsic image of the month.</p>
        </div>
        <div className='Submission_Subject'>
          <h3>Subject Matter of the Images</h3>
          <textarea
            className='submission_text_block_small'
            value={subject}
            onChange={onSubjectChanged}
          />
        </div>
        <div className='Submission_Description'>
          <h3>Description of the Field of View and Camera Settings</h3>
          <textarea
            className='submission_text_block'
            value={desc}
            onChange={onDescChanged}
          />
        </div>
        <div className="services">
          <div className="first_row">
            <div className="empty_block"></div>

            <div className="input_item">
              <p>Upload Original Image</p>
              <input
                type="file"
                onChange={onSelectFocused}
                multiple
              />
            </div>
            <div className="input_item">
              <p>Upload Diffused Image</p>
              <input
                type="file"
                onChange={onSelectDiffused}
                multiple
              />
            </div>
            <div className="input_item">
              <p>Upload Intrinsic Image</p>
              <input
                type="file"
                onChange={onSelectIntrinsic}
                multiple
              />
            </div>
            <div className="empty_block"></div>
          </div>
          {
            found ?
              <div className="Second_row">
                <div className="image_row">
                  <div className='cqc__p'><p>Original Image</p>  </div>
                  {focused && (   
                    <img src={`${focused}`} className="image_preview" alt="reload" onClick={() => { }} />
                  )}
                </div>
                <div className="image_row">
                  <div className='cqc__p'>
                    <p>Diffused Image</p>
                  </div>
                  {diffused && (   
                    <img src={`${diffused}`} className="image_preview" alt="reload" onClick={() => { }} />
                  )}
                </div>
                <div className="image_row">
                  <div className='cqc__p'><p>Intrinsic Image</p>  </div>
                  {intrinsic && (   
                    <img src={`${intrinsic}`} className="image_preview" alt="reload" onClick={() => { }} />
                  )}
                </div>
              </div>
              :
              <div className="Second_row">
                <div className="image_row">
                  <div className='cqc__p'><p>Original Image</p>  </div>
                  {focused && (<a href={URL.createObjectURL(focused)} target="_blank" rel="noreferrer">
                    <img src={URL.createObjectURL(focused)} className="image_preview" alt="reload" /></a>
                  )}
                </div>
                <div className="image_row">
                  <div className='cqc__p'>
                    <p>Diffused Image</p>
                  </div>
                  {diffused && (<a href={URL.createObjectURL(diffused)} target="_blank" rel="noreferrer">
                    <img src={URL.createObjectURL(diffused)} className="image_preview" alt="reload" /></a>
                  )}
                </div>
                <div className="image_row">
                  <div className='cqc__p'><p>Intrinsic Image</p>  </div>
                  {intrinsic && (<a href={URL.createObjectURL(intrinsic)} target="_blank" rel="noreferrer">
                    <img src={URL.createObjectURL(intrinsic)} className="image_preview" alt="reload" /></a>
                  )}
                </div>
              </div>
          }

        </div>



        <div className='sub'>
          {completed ?
            <>
              <div className='cqc__p'><p>Thank you for Submiting!</p></div>
              <button className='Back' onClick={(e) => onNewImagePair(e)}>Submit new Image Pair</button>
            </>
            :
            <>
              {
                diffused != null && intrinsic != null && focused != null && userEmail != "" ?
                  <button className='Sub' onClick={(e) => onSubmit(e)}>Submit</button>
                  :
                  <div className='cqc__p'><p>Please sign in to your account and enter all the images to Submit</p></div>
              }
            </>
          }
          <button className='Back' onClick={routeChange}>Back</button>

        </div>
      </div>
    </div>
  )
}

export default Submission
