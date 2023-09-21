import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import SpinnerManual from '../../component/SpinnerManual/SpinnerManual.js';
import {editFunction, singleUserGetFunc} from '../../Sevices/Apis.js';
import { BASE_URL } from '../../Sevices/Helper.js';
import { useNavigate, useParams } from 'react-router-dom';
import './Edit.css'
import { updateData } from '../../component/context/ContextProvider.js';

const Edit = () => {
  const [showSpin,setShowSpin]=useState(true);
  const navigate=useNavigate();

  const [inputData,setInputData]=useState({
    fName:"",
    lName:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  });
  const [status,setStatus]=useState("Active"); 
  const [image,setImage]=useState("");
  const [preview,setPreview]=useState("");
  const [imgData,setImgData]=useState("");

  const {update,setUpdate}=useContext(updateData)

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];


  const setInputValue=(e)=>{
      const {name,value}=e.target;
      setInputData({...inputData,[name]:value})
  }

  const setStatusValue=(e)=>{
    setStatus(e.value);
  }

  const setProfile=(e)=>{
    setImage(e.target.files[0])
  }
  const {id}=useParams();
  const userProfileGet=async (req,res)=>{
  const response= await singleUserGetFunc(id);
  if(response.status==200){
    setInputData(response.data);
    setStatus(response.data.status);
    setImgData(response.data.profile);
  }
  else{
    console.log("Error");
  }
}

useEffect(()=>{
  userProfileGet();
},[id])

  useEffect(()=>{
    if(image){
      setImgData("")
      setPreview(URL.createObjectURL(image))
    }
    setTimeout(()=>{
      setShowSpin(false);
    },1200)
  },[image])

 const submitUserData= async (e)=>{
  e.preventDefault();
  const {fName,lName,email,mobile,gender,location}=inputData;
  if(fName===""){
    toast.error("First name is required")
  }
  else if(lName==="")
      toast.error("Last name is required")
  else if(!email.includes('@'))
      toast.error("Enter valid male")
  else if(mobile==="")
      toast.error("Mobile is required")
  else if(mobile.length!=10)
      toast.error("Enter valid mobile number")
  else if(gender==="")
      toast.error("Gender is required")
  else if(status==="")
      toast.error("Status is required")
  else if(location==="")
      toast.error("Location is required")
  else
    {const data = new FormData();
      data.append("fName",fName);
      data.append("lName",lName);
      data.append("email",email);
      data.append("mobile",mobile);
      data.append("gender",gender);
      data.append("status",status);
      data.append("user_profile",image ||imgData);
      data.append("location",location);
  
      const config={
        "Content-Type":"multipart/form-data"
      }
      const response=await editFunction(id,data,config);
      if(response.status===200){
        setUpdate(response.data)
        navigate('/')
      }
    }
 }
  

  return (
    <div>
      {showSpin?<SpinnerManual/>:
      <div className='container'>
      <h2 className='text-center mt-1'>Update your details</h2>
      <Card className='shadow mt-3 p-3'>
        <div className='profile_div text-center'>
            <img src={image?preview:`${BASE_URL}/uploads/${imgData}`} alt='image'></img>
        </div>

        <Form>
        <Row>
          <Form.Group className='mb-3 col-lg-6'>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name='fName' value={inputData.fName} onChange={setInputValue} placeholder="First Name" />
          </Form.Group >
          <Form.Group className='mb-3 col-lg-6'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={inputData.lName} name='lName' onChange={setInputValue} placeholder="Last Name" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={inputData.email} name='email' onChange={setInputValue} placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-3 col-lg-6'>
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="text" value={inputData.mobile} name='mobile' onChange={setInputValue} placeholder=" Enter your mobile number" />
          </Form.Group >
          <Form.Group className='mb-3 col-lg-6'>
            <Form.Label>Select your gender</Form.Label>
            <Form.Check 
            type={"radio"}
            label={`Male`}
            name="gender"
            value={"Male"}
            checked={inputData.gender=="Male"?true:false}
            onChange={setInputValue}
          />
          <Form.Check 
            type={"radio"}
            label={`Female`}
            name="gender"
            value={"Female"}
            checked={inputData.gender=="Female"?true:false}
            onChange={setInputValue}
          />
          </Form.Group >
          <Form.Group className='mb-3 col-lg-6'>
            <Form.Label>Select your status</Form.Label>
            <Select
              options={options}
              onChange={setStatusValue}
              defaultValue={status}
            />
          </Form.Group >
          <Form.Group className='mb-3 col-lg-6'>
            <Form.Label>Select your profile</Form.Label>
            <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder="Select your profile" />
          </Form.Group >
          <Form.Group className='mb-3 col-lg-6'>
            <Form.Label>Location</Form.Label>
            <Form.Control type="text"value={inputData.location} name='location' onChange={setInputValue} placeholder=" Enter your location" />
          </Form.Group >
          <Button variant="primary" type="submit" onClick={submitUserData}>
            Submit
          </Button>
        </Row>
        
      </Form>
      </Card>
      <ToastContainer position='top-center'/>
    </div>}
      
    </div>
  )
}

export default Edit