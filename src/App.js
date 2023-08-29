import React from 'react';
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import fireDB from './firebase';
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    name : "",
    mobile :"",
    email :"",
    order:""

}

function App() {

    const showToastMessage = () => {
        toast.error('입력값을 확인하십시요. 입력값 중 오류가 있습니다.', {
            position: toast.POSITION.TOP_CENTER
        });
    };
  
  const [state,setState] = useState(initialState);
//   const [data,setData] = useState({});
  
  const {name,mobile,email,order} =state;

  useEffect(()=>{
    fireDB.child("contacts").on("value",(snapshot) =>{
        if (snapshot.val() !==null) {
            setState({...snapshot.val()});
        } else{
            setState({});
        }
    });
    return () =>{
        setState({});
    };
},[]);

  const handleInputChange = (e) =>{
    const {name,value} = e.target;
    setState({...state,[name] :value})
  }

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !mobile ) {
      showToastMessage();
      
     

    //   toast.error("Please provide value in each input field");
    } else {        
            fireDB.child("contacts").push(state, (err) => {
                if (err) {
                    toast.error('오류가 발생하였습니다.', {
                        position: toast.POSITION.TOP_CENTER
                    });
                } else {
                    toast.success('정상적으로 메시지가 전송되었습니다.', {
                        position: toast.POSITION.TOP_CENTER
                    });                   
                }
              });
              resetButton()
           }    
  }

  const resetButton = () => {
    setState({
      name: '',
      mobile: '',
      email: '',
      order: ''
    });
  }

  return (
 
    <div className="App">


  
     <ToastContainer />
      <form className="container mt-3 mb-3">

      <Row className="mb-3">
      <div class="card bg-secondary text-white">
  <div class="card-body">
    <h4 class="card-title">[가디언넷] GDN 클라우드 문의 및 화상미팅</h4>
    <p class="card-text"><p>안녕하세요,클라우드 보안의 전문가그룹 가디언넷입니다.</p>
          <p>클라우드보안 서비스에 간단한 연동으로 클라우드보안 쉽게 관리할 수 있는 아래의 기능을 제공합니다. </p>

          <p>클라우드 보안 관련 각종 메시지</p>
          <p>답변 저장</p>
          <p>답변 조회</p>

          <p>원활한 상담 진행을 위해 아래 정보를 작성해 주세요.</p></p>
 
  </div>    
  </div>
      
{/* <Card style={{ width: "80rem" }}>
        <Card.Body>
          <Card.Title style={{ color: "green" }}><h3>[가디언넷] GDN Cloud 문의</h3></Card.Title>
          <Card.Subtitle className="mb-4 text-muted">
           <h3>One Stop 질의 응답 센터</h3>
          </Card.Subtitle>
          <Card.Text>
          <p>안녕하세요,클라우드 보안의 전문가그룹 가디언넷입니다.</p>
          <p>클라우드보안 서비스에 간단한 연동으로 클라우드보안 쉽게 관리할 수 있는 아래의 기능을 제공합니다. </p>

          <p>클라우드 보안 관련 각종 메시지</p>
          <p>답변 저장</p>
          <p>답변 조회</p>

          <p>원활한 상담 진행을 위해 아래 정보를 작성해 주세요.</p>
          </Card.Text>
        </Card.Body>
      </Card> */}
    
</Row>

      
    <Row className="mb-3">
        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>소속 및 이름을 입력해 주세요 (필수) * </Form.Label>
            <Form.Control type="name" name="name" value={name} onChange={handleInputChange} className="form-control" />
        </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group controlId="formBasicMobile" className="col col-sm-6">
            <Form.Label>전화번호를 입력해 주세요.(필수)* <p>미팅 일정 수립을 위해 연락을 드릴 수 있습니다.</p>
 </Form.Label>
            <InputGroup>
                {/* <InputGroup.Text id="basic-addon1">010</InputGroup.Text> */}
                <Form.Control aria-label="Mobile Number" type="mobile" aria-describedby="basic-addon1" className="form-control" name="mobile" value={mobile} onChange={handleInputChange} />
            </InputGroup>
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>이메일을 입력해 주세요.(필수)*
             <p>입력하신 이메일로 화상회의 초대장이 발송됩니다.</p> </Form.Label>
            <InputGroup>
                <Form.Control aria-label="Recipient's username" aria-describedby="basic-addon2" type="email" name="email" value={email} onChange={handleInputChange} />
                {/* <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text> */}
            </InputGroup>
        </Form.Group>
    </Row>
    {/* <Row className="mb-3">
        <Form.Group className=" col col-sm-6" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control className="form-control" type="text" name="address1" value="{form.address1}" onChange="{handleChange}" />
        </Form.Group>
        <Form.Group className="col col-sm-6" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control className="form-control" name="address2" value="{form.address2}" onChange="{handleChange}" type="text" />
        </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group controlId="formGridCity" className="col col-sm-4">
            <Form.Label>City</Form.Label>
            <Form.Control className="form-control" type="text" name="city" value="{form.city}" onChange="{handleChange}" />
        </Form.Group>
        <Form.Group controlId="formGridState" className="col col-sm-4">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose..." className="form-control" name="a_state" value="{form.a_state}" onChange="{handleChange}">
                <option value="Choose...">Choose...</option>
                <option value="Delhi">Delhi</option>
                <option value="Bombay">Bommbay</option>
                <option value="New York">New York</option>
                <option value="Kashmir">Kashmir</option>
            </Form.Select>
        </Form.Group>
        <Form.Group controlId="formGridpin" className="col col-sm-4">
            <Form.Label>Pin Code</Form.Label>
            <Form.Control className="form-control" type="pin" name="pin" value="{form.pin}" onChange="{handleChange}" />
        </Form.Group>
    </Row> */}
    <Row className="mb-3">
        {/* <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
            <Form.Label>Menu</Form.Label>
            <Form.Select defaultValue="Choose..." className="form-control" name="menu" value="{form.menu}" onChange="{handleChange}">
                <option value="Choose...">Choose...</option>
                <option value="Veg Biryani">Veg Biryani</option>
                <option value="BBQ Chicken Wings">BBQ Chicken Wings</option>
                <option value="Rasmalai">Rasmalai</option>
                <option value="Beer">Beer</option>
            </Form.Select>
        </Form.Group> */}
        <Form.Group controlId="formGridlabel" className="col col-sm-6">
            <Form.Label>화상 미팅이 가능한 일정을 3개정도 알려주세요. (선택)
             <p>날짜와 시간을 입력해주세요.</p> </Form.Label>
            <Form.Control as="textarea" rows="{3}" className="form-control" name="order" value={order} onChange={handleInputChange} />
        </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
            <button type="submit" onClick={handleSubmit} className="me-4 btn btn-success btn-lg btn-block">Submit</button>
            <button type="reset" onClick={resetButton} className="me-4 btn btn-danger btn-lg btn-block">Cancel</button>
        </Form.Group>
    </Row>
</form>
    </div>
  );
}

export default App;
