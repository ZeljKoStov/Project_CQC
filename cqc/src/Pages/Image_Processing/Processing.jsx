import React, { useState } from "react";
import { processing } from "../../api/processing";
import { RequestAPI } from "../../utils/request-api";
import './Processing.css'

const Processing=()=> {

    const [imagePairs, setImagePairs] = useState([{ focused: null, diffused: null, name: "" }]);
    const [processedImages, setProcessedImages] = useState([])

    const [selectedPicture1, setSelectedPicture1] = useState();
    const [selectedPicture2, setSelectedPicture2] = useState();
    const [instrinsic, setIntrinsic] = useState([]);

    const handleImagePairRemove = (index) => {
        const list = [...imagePairs];
        list.splice(index, 1);
        setImagePairs(list);
    };

    function handleChange1(event) {
        setSelectedPicture1(event.target.files[0])
    }
    
    function handleChange2(event) {
        setSelectedPicture2(event.target.files[0])
    }

    const handleFocusedChange = (e,index) => {
        const f = e.target.files[0];
        const list = [...imagePairs];
        const item = list[index];
        item.focused = f;
        list[index]= item;
        setImagePairs(list);
        console.log(imagePairs);
    }

    const handleDiffusedChange = (e,index) => {
        const d = e.target.files[0];
        const list = [...imagePairs];
        const item = list[index];
        item.diffused = d;
        list[index]= item;
        setImagePairs(list);
        console.log(imagePairs);
    }

    const handleNameChange = (e,index) => {
        const name = e.target.value;
        const list = [...imagePairs];
        const item = list[index];
        item.name = name;
        list[index]= item;
        setImagePairs(list);
        console.log(imagePairs);
    }
    
    const handleServiceAdd = () => {
        setImagePairs([...imagePairs, { focused: null, diffused: null, name: "" }]);
    };
    
 
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const list = [...processedImages]
        var count = imagePairs.lenght;
        imagePairs.map(async (pair, index) => {
            if(pair.diffused!= null && pair.focused!=null && pair.name!= null){

                const formData = new FormData();
                formData.append("F", pair.focused);
                formData.append("D", pair.diffused);
                formData.append("name",pair.name+".jpg")
                try {
                    const response = await RequestAPI(processing(formData));
                    if (response.status === 200) {   
                        console.log(response);
                        list.push(<img src={`${response.data}`} className="response_image"/>)
                        count=count-1;
                        if(count==0) {
                            setProcessedImages(list);
                            console.log(list);
                        }
                    }
                    

        
                } catch (error) {
                    console.log(error);
                }
            } 
        });
        
    }


    

    return (
        <div className='cqc__processing'>
            <div className='cqc__text'>
                <h1>Image Processing</h1>
                <p>Upload your Focused and Diffused image pairs here</p>
            </div>
            <div className="form-field">
                { imagePairs.map((pair, index) => (
                    <div key={index} className="services">
                        <div className="first-division">
                            <div className="input_item">
                                <label className="input_label"> Upload focused image</label>  
                                <input
                                    type="file"
                                    onChange={(e) => handleFocusedChange(e, index)}
                                    required
                                />
                            </div>
                            <div className="input_item">
                                <label htmlFor='image1'> Upload diffuse image</label>  
                                <input
                                    type="file"
                                    onChange={(e) => handleDiffusedChange(e, index)}
                                    required
                                />
                            </div>
                            <div className="input_item">
                                <label htmlFor='image1'> Enter image pair name</label>  
                                <input
                                    type="text"
                                    value={pair.name}
                                    onChange={(e) => handleNameChange(e, index)}
                                    required
                                 />
                            </div>
                        </div>

                        <div className="second-division">
                            {imagePairs.length !== 1 && (
                                <button type="button" onClick={() => handleImagePairRemove(index)} className="remove_button">
                                    <span>X</span>
                                </button>
                            )}
                        </div>
 
                    </div>

                ))}
                <button type="button" onClick={handleServiceAdd} className="add_button">
                    <span>Add another image pair</span>
                </button>
                <button type="button" onClick={handleSubmit} className="process_button">Processing</button>
            </div>
            {/* <div className="cqc__forma">
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
            </div> */}
            <div className='services' >
                { processedImages.map((image, index) => (
                    image
                ))}
            </div>
        </div>
    )
}

export default Processing
