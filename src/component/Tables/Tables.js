import React from 'react'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge'
import Table from 'react-bootstrap/Table'
import {NavLink} from 'react-router-dom';
import './table.css'
import { BASE_URL } from '../../Sevices/Helper';
import { ToastContainer, toast } from 'react-toastify';
import Paginations from '../Pagination/Paginations'
import { statusChangeFunc } from '../../Sevices/Apis'

const Tables = ({userData,deleteUser,getUserData,handlePrevious,handleNext,page,pagecnt,setPage}) => {

  const handleChange = async (id,status)=>{
    const response= await statusChangeFunc(id,status);
    if(response.status===200){
      getUserData();
      toast.success("Status Updated")
    }
    else{
      toast.error("Something went wrong")
    }
  }

  return (
    <div>
      <div className='container'>
        <Row>
          <div className='col mt-0'>
            <Card className='shadow'>
              <Table className='align-align-items-center' responsive='sm'>
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userData.length>0?userData.map((element,index)=>{
                      return <>
                        <tr>
                          <td>{index+1+(page-1)*5}</td>
                          <td>{element.fName +" "+ element.lName }</td>
                          <td>{element.email}</td>
                          <td>{element.gender=="Male"?"M":"F"}</td>
                          <td className='d-flex align-items-center'>
                          <Dropdown className='text-center'>
                              <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                              <Badge bg={element.status=='Active'?"primary":"danger"}>
                                {element.status}<i class="fa-solid fa-angle-down"></i>
                              </Badge>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>handleChange(element._id,"Active")}>Active</Dropdown.Item>
                                <Dropdown.Item onClick={()=>handleChange(element._id,"Inactive")}>Inavtive</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td className='img_parent'>
                            <img src={`${BASE_URL}/uploads/${element.profile}`} alt="image"></img>
                          </td>
                          <td>
                            <Dropdown className='text-center'>
                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink to={`/userprofile/${element._id}`} className='text-decoration-none'>
                                      <i class="fa-solid fa-eye" style={{color:'green'}}></i>&nbsp;<span>View</span>
                                    </NavLink>
                                   </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink to={`/edit/${element._id}`} className='text-decoration-none'>
                                      <i class="fa-solid fa-pen-to-square" style={{color:'blue'}}></i>&nbsp;<span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <div onClick={()=>deleteUser(element._id)}>
                                      <i class="fa-solid fa-trash" style={{color:'red'}}></i>&nbsp;<span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                          </td>
                        </tr>
                      </>
                    }):<div className='no_data text-center'>No Data Found</div>
                  }
                </tbody>
              </Table>
              <Paginations handlePrevious={handlePrevious} pagecnt={pagecnt} handleNext={handleNext} page={page} setPage={setPage}/>
            </Card>
          </div>
        </Row>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Tables