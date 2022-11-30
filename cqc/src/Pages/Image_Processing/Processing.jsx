import React, { useState } from "react";
import './Processing.css'

const Processing=()=> {


    const [selectedPicture1, setSelectedPicture1] = useState();
    const [selectedPicture2, setSelectedPicture2] = useState();

    function handleChange1(event) {
        setSelectedPicture1(event.target.files[0])
      }
    
    function handleChange2(event) {
    setSelectedPicture2(event.target.files[0])
    }
    
 
    const handleSubmit= async(e)=>{
        e.preventDefault();
        var  data={
            pictureOne: selectedPicture1,
            pictureTwo: selectedPicture2

        };
        console.log(data);
        /*try {
            const response = await RequestAPI(Processing(data));
            if (response.status === 200) {
                console.log(response.data.data);
            }

        } catch (error) {
            console.log(error);
        }*/
    }
    

    return (
        <div className='cqc__processing'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='image1'> Upload picture 1</label>  
                <input
                    type="file"
                    onChange={handleChange1}
                    />
                <label htmlFor='image2'> Upload picture 1</label>  
                <input
                    type="file"
                    onChange={handleChange2}
                    />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default Processing
