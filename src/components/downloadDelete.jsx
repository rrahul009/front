import { useSelector} from "react-redux"
import { useState } from "react"
import { updateID } from "../actions/actions"
import { useDispatch } from "react-redux"


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
const Download=()=>{
const data=useSelector((state)=>state.add.ids)
const dispatch=useDispatch()
// when localstroge changes , update fileID state so download button can load

console.log(data)
const handleDownload= (id)=>{
    
   // for downloading content by id
    window.location.href=`http://localhost:5000/download?id=${id}`
    
    
}
const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
const handleDelete=(id)=>{
  
    fetch("http://localhost:5000/delete?id="+id)
    .then((res)=>{
        if(res.status===200){
            // if deleted then remove that id from redux store and its related icon
dispatch(updateID(id))
        }
    })
}
const rowsPerPage = 4;

const [page, setPage] = useState(0);
return(
    <>


    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell>Filename</TableCell>
            
            <TableCell>Type</TableCell>
            
            <TableCell>Uploaded on</TableCell>
            
            <TableCell>Uploaded by</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row}>
                <TableCell><DownloadIcon onClick={()=>handleDownload(row)} /> <DeleteIcon  onClick={()=>handleDelete(row)}/> </TableCell>
               
                <TableCell>{row}</TableCell>
                <TableCell>Test document</TableCell>
                <TableCell>{new Date().toISOString().slice(0, 10)}</TableCell>
                <TableCell>Test user</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>


    </>
)
}
export default Download