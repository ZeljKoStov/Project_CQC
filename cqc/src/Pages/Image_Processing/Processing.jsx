import React, { useState } from "react";
import { processing } from "../../api/processing";
import { RequestAPI } from "../../utils/request-api";
import './Processing.css'

const Processing=()=> {

    const [imagePairs, setImagePairs] = useState([{ 
            focused: null, 
            furl: "", 
            ferror: false, 
            diffused: null, 
            durl:"",
            derror:false, 
            name: "",
            nerror: false,
            serror: false, 
            intrinsic: null
    }]);
    const [count, setCount] = useState(0)

    const handleImagePairRemove = (index) => {
        const list = [...imagePairs];
        list.splice(index, 1);
        setImagePairs(list);
    };

    const handleFocusedChange = (e,index) => {
        const f = e.target.files[0];
        const list = [...imagePairs];
        const item = list[index];
        item.focused = f;

        let fileReader
        fileReader = new FileReader();
        fileReader.onload = (e) => {
            const { result } = e.target;
            item.furl=result
            updateUI();
        }
        fileReader.readAsDataURL(item.focused);

        list[index]= item;
        setImagePairs(list);
        console.log(imagePairs);
    }

    const handleDiffusedChange = (e,index) => {
        const d = e.target.files[0];
        const list = [...imagePairs];
        const item = list[index];
        item.diffused = d;

        let fileReader
        fileReader = new FileReader();
        fileReader.onload = (e) => {
            const { result } = e.target;
            item.durl=result
            updateUI();
        }
        fileReader.readAsDataURL(item.diffused);
        
        list[index]= item;

        setImagePairs(list);
    }



    const handleNameChange = (e,index) => {
        const name = e.target.value;
        const list = [...imagePairs];
        const item = list[index];
        item.name = name;
        list[index]= item;
        setImagePairs(list);
    }
    
    const handleServiceAdd = () => {
        setImagePairs([...imagePairs, { 
            focused: null, 
            furl: "", 
            ferror: false, 
            diffused: null, 
            durl:"",
            derror:false, 
            name: "",
            nerror: false, 
            intrinsic: null 
        }]);
    };
    
 
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const list = [...imagePairs];
        let error=false


        imagePairs.map((pair,index)=>{
            if(pair.focused==null) {
                list[index].ferror=true;
                error=true;
            } else list[index].ferror=false;
            if(pair.diffused==null){
                list[index].derror=true;
                error=true;
            } else list[index].derror=false;
            if(pair.name==""){
                list[index].nerror=true;
                error=true;
            } else list[index].nerror=false;
            if(pair.name.indexOf(' ') >= 0){
                list[index].serror=true;
                error=true;
            } else list[index].serror=false;
        })

        if(error){
            setImagePairs(list);
            updateUI();
        } 
        else imagePairs.map( async (pair, index) => {
            if(pair.diffused!= null && pair.focused!=null && pair.name!= null){

                const formData = new FormData();
                formData.append("F", pair.focused);
                formData.append("D", pair.diffused);
                formData.append("name",pair.name+".jpg")
                try {
                    const response = await RequestAPI(processing(formData));
                    if (response.status === 200) {   

                        const list = [...imagePairs];
                        list[index].intrinsic=<img src={`${response.data}`} className="image_preview" alt="reload"/>
                        setImagePairs(list);

                        updateUI();
                    }
        
                } catch (error) {
                    console.log(error);
                }
            } 
        });
        
    }

    const updateUI = () => {
        const prev = count;
        const min = count;
        const max = 1000000;
        const rand = min + Math.random() * (max - min);
        setCount(rand);
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
                        <div className="first_row">
                            <div className="input_item">
                                <label htmlFor='image1'>Name Image Pair</label>  
                                <input
                                    type="text"
                                    value={pair.name}
                                    onChange={(e) => handleNameChange(e, index)}
                                    required
                                />
                               {pair.nerror && <div className="error_text">Image Pair Name cannot be empty!</div>}
                               {pair.serror && <div className="error_text">Image Pair Name cannot contain whitespace caracter!</div>}
                            </div>
                            <div className="input_item">
                                <label className="input_label">Upload Focused Image</label>  
                                <input
                                    type="file"
                                    onChange={(e) => handleFocusedChange(e, index)}
                                    required
                                />
                                {pair.ferror && <div className="error_text">Please upload the foused image!</div>}
                            </div>
                            <div className="input_item">
                                <label htmlFor='image1'>Upload Diffused Image</label>  
                                <input
                                    type="file"
                                    onChange={(e) => handleDiffusedChange(e, index)}
                                    required
                                />
                                {pair.derror && <div className="error_text">Please upload the diffused image!</div>}
                            </div>
                        </div>
                        <div className="image_row">
                            {pair.focused && <img src={pair.furl} className="image_preview" alt="reload"/>}
                            {!pair.focused &&   <div className='cqc__text'>
                                                    <p>Focused Image</p>
                                                </div> }
                        </div>
                        <div className="image_row">
                            {pair.durl && <img src={pair.durl} className="image_preview" alt="reload"/>}
                            {!pair.durl &&   <div className='cqc__text'>
                                                    <p>Diffused Image</p>
                                                </div> }
                        </div>

                        {pair.intrinsic && <div className="image_row"> {pair.intrinsic} </div>}

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
                <button type="button" onClick={handleSubmit} className="process_button">Process</button>
            </div>
        </div>
    )
}

export default Processing
