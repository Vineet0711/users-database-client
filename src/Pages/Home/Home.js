import React,{useEffect, useState,useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import {useNavigate} from 'react-router-dom';
import Tables from '../../component/Tables/Tables';
import { addData,dltData,updateData } from '../../component/context/ContextProvider';
import SpinnerManual from '../../component/SpinnerManual/SpinnerManual.js'
import  Alert  from 'react-bootstrap/Alert';
import {userGetFunction,deleteFunc,exportToCsvFunc} from '../../Sevices/Apis.js';
import './Home.css'
import { toast } from 'react-toastify';

const Home = () => {

  const [userData,setUserData]=useState([]);
  const [search,setSearch]=useState("");
  const [gender,setGender]=useState("All");
  const [status,setStatus]=useState("All");
  const [sort,setSort]=useState("new");
  const [page,setPage]=useState(1);
  const [pagecnt,setPagecnt]=useState(0);

  const [showSpin,setShowSpin]=useState(true);
  const {userAdd,setUserAdd}=useContext(addData);
  const {update,setUpdate}=useContext(updateData)
  const {deleteData,setDeleteData}=useContext(dltData);
  

  const getUserData=async ()=>{
    const response= await userGetFunction(search,gender,status,sort,page);
    if(response.status===200){
      setUserData(response.data.usersData);
      setPagecnt(response.data.Pagination.pageCount)
    }
    else{
      console.log("Error in getting details of users")
    }
  }

  const deleteUser=async (id)=>{
      const response=await deleteFunc(id);
      if(response.status===200){
        getUserData();
        setDeleteData(response.data);
      }else{
        toast.error("error")
      }
  }


  const navigate=useNavigate();
  const addUser=()=>{
    navigate('/register')
  }

  const exportUser=async ()=>{
    const response= await exportToCsvFunc();
    if(response.status===200){
      window.open(response.data.downloadUrl,"blank")
    }else{
      toast.error("Can't download")
    }
  }

  const handlePrevious=()=>{
    setPage(()=>{
      if(page===1)return page;
      return page-1;
    })
  }

  const handleNext =()=>{
    if(page!=pagecnt){
      setPage(page+1);
    }
  }
  
  useEffect(()=>{
    getUserData();
    setTimeout(()=>{
      setShowSpin(false);
    },1200)
  },[search,gender,status,sort,page])
  return (
    <div>
      {
        userAdd?<Alert variant="success" onClose={() => setUserAdd("")} dismissible>
                  {userAdd.fName.toUpperCase()} successfully added
                </Alert>:""
      }

      {
        update?<Alert variant="primary" onClose={() => setUpdate("")} dismissible>
                  {update.fName.toUpperCase()} successfully updated
                </Alert>:""
      }
      {
        deleteData?<Alert variant="danger" onClose={() => setDeleteData("")} dismissible>
                  {deleteData.fName.toUpperCase()} Deleted!!
                </Alert>:""
      }
      <div className='container'>
          <div main_div>
            <div className='search_add mt-4 d-flex justify-content-between'>
              <div className='search col-lg-4'>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e)=>setSearch(e.target.value)}
                />
                <Button variant="success" className='search_btn'>Search</Button>
              </Form>
              </div>
              <div className='add_btn'>
                <Button variant="primary" onClick={addUser}><i class="fa-solid fa-plus"></i>&nbsp;Add User</Button>
              </div>
            </div>

            <div className='filter_div mt-5 d-flex justify-content-between flex-wrap'>
              <div className='export_csv'>
                <Button className='export_btn'onClick={exportUser}>Export to csv</Button>
              </div>
              <div className='filter_gender'>
                <div className='filter'>
                  <h3>Filter By Gender</h3>
                  <div className='gender d-flex justify-content-around'>
                    <Form.Check 
                      type={"radio"}
                      label={`All`}
                      name="gender"
                      value={"All"}
                      onChange={(e)=>setGender(e.target.value)}
                      defaultChecked
                    />
                     <Form.Check 
                      type={"radio"}
                      label={`Male`}
                      name="gender"
                      value={"Male"}
                      onChange={(e)=>setGender(e.target.value)}
                    />
                     <Form.Check 
                      type={"radio"}
                      label={`Female`}
                      name="gender"
                      value={"Female"}
                      onChange={(e)=>setGender(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='filter_newold'>
                <h3>Sort By Value</h3>
                <Dropdown className='text-center'>
                  <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>setSort("new")}>New</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setSort("old")}>Old</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className='filter_status'>
                <div className='status'>
                  <h3>Filter By Status</h3>
                  <div className='status_radio d-flex justify-content-around flex wrap'>
                    <Form.Check 
                      type={"radio"}
                      label={`All`}
                      name="status"
                      value={"All"}
                      onChange={(e)=>setStatus(e.target.value)}
                      defaultChecked
                    />
                    <Form.Check 
                      type={"radio"}
                      label={`Active`}
                      name="status"
                      onChange={(e)=>setStatus(e.target.value)}
                      value={"Active"}
                    />
                    <Form.Check 
                      type={"radio"}
                      label={`Inactive`}
                      name="status"
                      onChange={(e)=>setStatus(e.target.value)}
                      value={"Inactive"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showSpin?<SpinnerManual/>:<Tables userData={userData} deleteUser={deleteUser} pagecnt={pagecnt}
          getUserData={getUserData} handlePrevious={handlePrevious} handleNext={handleNext} page={page} setPage={setPage}/>}
      </div>
    </div>
  )
}

export default Home