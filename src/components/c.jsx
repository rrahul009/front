import { useSelector} from "react-redux"
const C=()=>{
const data=useSelector((state)=>state.add.data)
return(
    <h1>this component has access of input component {data}</h1>
)
}
export default C;