import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { saveDoc } from "../actions/actions"
const Save=()=>{
    const fileIDs=useSelector((state)=>state.add.ids)
const dispatch= useDispatch()
    const handleSave= async ()=>{
        const infos=["id","id"]
        const settings={
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(fileIDs)
        }
 const response = await fetch("http://localhost:5000/save",settings)
 const result=await response.text()
 if(response.status==200){
    // on saving document clear all stored ids from redux store
dispatch(saveDoc())
 }
    }
return(
    <>
<button onClick={handleSave}>Save</button>
    </>
)
}
export default Save