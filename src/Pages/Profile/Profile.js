import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import SpinnerManual from '../../component/SpinnerManual/SpinnerManual.js'
import {useParams} from 'react-router-dom';
import { singleUserGetFunc } from '../../Sevices/Apis.js';
import moment from 'moment';
import './Profile.css'
import { BASE_URL } from '../../Sevices/Helper.js';

const Profile = () => {

const [element,setElement]=useState({})

const {id}=useParams();

const userProfileGet=async (req,res)=>{
  const response= await singleUserGetFunc(id);
  if(response.status==200){
    setElement(response.data);
  }
  else{
    console.log("Error");
  }
}


  const [showSpin,setShowSpin]=useState(true);
  useEffect(()=>{
    userProfileGet();
    setTimeout(()=>{
      setShowSpin(false);
    },1200)
  },[id])

  return (
    <div>
      {showSpin?<SpinnerManual/>:
        <div className='container'>
          <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
            <Card.Body>
              <Row>
                <div className='col'>
                    <div className='card-profile-stats d-flex justify-content-center'>
                        <img src={`${BASE_URL}/uploads/${element.profile}`} alt='image'/>
                    </div>
                </div>
              </Row>
              <div className='text-center'>
                  <h3>{element.fName + element.lName}</h3>
                  <h4><i class="fa-solid fa-envelope email"></i>&nbsp;:-<span>{element.email}</span></h4>
                  <h4><i class="fa-solid fa-mobile" ></i>&nbsp;:-<span>{element.mobile}</span></h4>
                  <h4><i class="fa-solid fa-person"></i>&nbsp;:-<span>{element.gender}</span></h4>
                  <h4><i class="fa-solid fa-location-dot location" ></i>&nbsp;:-<span>{element.location}</span></h4>
                  <h4>status&nbsp;:-<span>{element.status}</span></h4>
                  <h5><i class="fa-solid fa-calendar-days calendar" ></i>&nbsp;Date Created &nbsp;:-<span>{moment(element.dateCreated).format("DD-MM-YYYY")}</span></h5>
                  <h5><i class="fa-solid fa-calendar-days calendar" ></i>&nbsp;Date Updated &nbsp;:-<span>{moment(element.dateUpdated).format("DD-MM-YYYY")}</span></h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      }
      
    </div>
  )
}

export default Profile