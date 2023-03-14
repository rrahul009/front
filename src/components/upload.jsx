import { useState } from "react";
import "./upload.css"
import { setID } from "../actions/actions"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Upload=()=>{
  const dispatch = useDispatch()
  // access redux id state to check wheather user is uploading duplicate file or new
  const uploadedFiles=useSelector((state)=>state.add.ids)
  const [inpValues, setInpV]=useState({
    fieldOne:"",
    fieldTwo:"",
    expDate:"",
    hyperLink:"",
    scopeHyperLink:""
  })
const [file,setFile]=useState()
const [fil,setf]=useState()
const [fileName,setFileName]=useState()
const [fileID, setFileID]=useState() 
                          
  const [btnValue,setBtnVal]=useState(true)
  const handleInput=(e)=>{
    // handle file and enable or disable uplaod button
    if(e.target.name==="file"){
        setf(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileName(e.target.files[0].name);
      // when file select enable upload button

setBtnVal(false)
    }
    setInpV((prev)=> ({...prev,[e.target.name]:e.target.value}))
  }
  const formData = new FormData();
        formData.append("file", fil);
        formData.append("fileName", fileName);
  const handleUpload= async ()=>{
  let uploadedFile
    // check if user is uploading same file or new 
     uploadedFiles.forEach((elem)=>{
      // we are extracting image file name from random id 
    uploadedFile= elem.substring(elem.indexOf(".")).includes(fileName) // return true if duplicate file
    
   })
   if(uploadedFile){
    alert("duplicate file")
   }
   else{

    console.log(uploadedFile + " is new file " +fileName)
   
    let settings={
      method:"post",
      Headers:{
        'Content-Type':'Multipart/form-data'
      },
      body:formData
    }
    // we are passing current time , so our fetch req is treated a new req not cached one , 
    // so we can get new image id 
    const currentTime=new Date().getTime()
    const res=await fetch(`http://localhost:5000/upload?refresh=${currentTime}`,settings)
    const result= await res.json()
  // we are sending this id to redux store , so save and download delete component can access it
  
     dispatch(setID(result.fileID))
// on successfully upload empty selected file div
setFile("")

  }
  }
  
  return(
    <>
    <div className="formBox">
      <div className="inputs">
<input type="text" onChange={handleInput} name="fieldOne" placeholder="Accelration text" />
<input type="text" onChange={handleInput} name="fieldTwo" placeholder="Accelration text" />
<input type="date" onChange={handleInput} name="expDate" placeholder="Accelration text" />
<input type="text" onChange={handleInput} name="hyperLink" placeholder="Accelration text" />
<input type="text" onChange={handleInput} name="scopeHyperLink" placeholder="Accelration text" />

<label className="switch">
 
  <input type="checkbox" />
  <span className="slider round"></span>
</label>

      </div>
      <div className="imagePreview">
      <div className="imageBox">
<img src={file} alt="" srcset=""  height="200" width="200"/>
      </div>
    </div>
    </div>
    <div className="selectDocument">
      <div className="uploadSection">
      <p>Documents</p>
      <button onClick={handleUpload} disabled={btnValue}>UPLOAD</button>
      </div>
      <div className="select">
        <input type="file"  onChange={handleInput} name="file" accept="image/png, image/gif, image/jpeg"/>
      </div>
    </div>
    </>

  )
}
export default Upload;