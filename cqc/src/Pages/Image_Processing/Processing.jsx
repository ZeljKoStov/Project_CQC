import React, { useState } from "react";
import { processing } from "../../api/processing";
import { RequestAPI } from "../../utils/request-api";
import './Processing.css'

const Processing=()=> {


    const [selectedPicture1, setSelectedPicture1] = useState();
    const [selectedPicture2, setSelectedPicture2] = useState();
    const [instrinsic, setIntrinsic] = useState();

    function handleChange1(event) {
        setSelectedPicture1(event.target.files[0])
      }
    
    function handleChange2(event) {
    setSelectedPicture2(event.target.files[0])
    }
    
 
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("F", selectedPicture1);
        formData.append("D", selectedPicture2);
        formData.append("name","I_p.jpg")
        console.log(formData);
        try {
            const response = await RequestAPI(processing(formData));
            if (response.status === 200) {
            
                setIntrinsic(<img src={`${response.data}`} alt='reload'/>)
            }

        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <div className='cqc__processing'>
            <div className="cqc__forma">
                <form onSubmit={handleSubmit}>
                    <label htmlFor='image1'> Upload focused image</label>  
                    <input
                        type="file"
                        onChange={handleChange1}
                        />
                    <label htmlFor='image2'> Upload diffuse image</label>  
                    <input
                        type="file"
                        onChange={handleChange2}
                        />
                    <button type="submit">Processing</button>
                </form>
            </div>
            <div className='cqc__processing-image' >
                
                {instrinsic}
            </div>
        </div>
    )
}

export default Processing
