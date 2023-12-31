import React from 'react';
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, Row } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import fireDB from './firebase';
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    name: "",
    mobile: "",
    email: "",
    order: "",
    done: "NotDone" // done 속성을 초기화합니다.
}

function App() {

    const showToastMessage = () => {
        toast.error('입력값을 확인하십시요. 입력값 중 오류가 있습니다.', {
            position: toast.POSITION.TOP_CENTER
        });
    };
  
  const [state,setState] = useState(initialState);
//   const [data,setData] = useState({});
  
  const {name,mobile,email,order,done} =state;

  useEffect(() => {
    const ref = fireDB.child("contacts");
    const onDataChange = (snapshot) => {
      if (snapshot.val() !== null) {
        setState({ ...snapshot.val() });
      } else {
        setState({});
      }
    };
  
    ref.on("value", onDataChange);
  
    return () => {
      ref.off("value", onDataChange); // 이 부분을 추가하여 이벤트 리스너를 제거합니다.
    };
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  
    // 만약 "done" 값을 업데이트하려면 다음과 같이 처리할 수 있습니다.
    if (name === "done") {
      setState({ ...state, done: value });
    }
  }

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !mobile) {
      showToastMessage();
    } else {
      const newData = { name, email, mobile, order, done };
      // Firebase 데이터베이스에 새로운 데이터 추가
      fireDB.child("contacts").push(newData, (err) => {
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
      resetButton();
    }
  }

  const resetButton = () => {
    setState({
      name: '',
      mobile: '',
      email: '',
      order: '',
      done : 'NotDone'
    });
  }

  return (
 
    <div className="App">


  
     <ToastContainer />
      <form className="container mt-3 mb-3">

      <Row className="mb-3">
      <div class="card bg-secondary text-white">
  <div class="card-body">
    <h4 class="card-title"><strong>[가디언넷] GDN 클라우드 문의 및 화상미팅</strong></h4><br />
   
    <p className="card-text">
        안녕하세요,클라우드 보안의 전문가그룹 가디언넷입니다.<br /><br />
        클라우드보안 서비스에 간단한 연동으로 클라우드보안 쉽게 관리할 수 있는 아래의 기능을 제공합니다.<br />
        클라우드 보안 관련 각종 메시지<br />
        답변 저장<br />
        답변 조회<br />
        
        원활한 상담 진행을 위해 아래 정보를 작성해 주세요.<br /><br />
        GDN Cloud 대표 홈페이지: <a href="https://www.gdncloud.com/">https://www.gdncloud.com/</a>
        </p>
 
  </div>    
  </div>
      

</Row>

      
    <Row className="mb-3">
        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label><strong>소속 및 이름을 입력해 주세요 (필수)</strong><span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control type="name" name="name" value={name} onChange={handleInputChange} className="form-control" />
        </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group controlId="formBasicMobile" className="col col-sm-6">
            <Form.Label><strong>전화번호를 입력해 주세요.(필수)</strong><span style={{ color: 'red' }}>*</span><p>미팅 일정 수립을 위해 연락을 드릴 수 있습니다.</p>
            </Form.Label>
            <InputGroup>
                {/* <InputGroup.Text id="basic-addon1">010</InputGroup.Text> */}
                <Form.Control aria-label="Mobile Number" type="mobile" aria-describedby="basic-addon1" className="form-control" name="mobile" value={mobile} onChange={handleInputChange} />
            </InputGroup>
        </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label><strong>이메일을 입력해 주세요.(필수)</strong><span style={{ color: 'red' }}>*</span>
             <p>입력하신 이메일로 화상회의 초대장이 발송됩니다.</p> </Form.Label>
            <InputGroup>
                <Form.Control aria-label="Recipient's username" aria-describedby="basic-addon2" type="email" name="email" value={email} onChange={handleInputChange} />
                {/* <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text> */}
            </InputGroup>
        </Form.Group>
    </Row> 
    
    <Row className="mb-3"> 
        <Form.Group controlId="formGridlabel" className="col col-sm-6">
            <Form.Label><strong>화상 미팅이 가능한 일정을 3개정도 알려주세요. (선택)</strong>
             <p>날짜와 시간을 입력해주세요.</p> </Form.Label>
            <Form.Control as="textarea" rows="{5}" className="form-control" name="order" value={order} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox1" className="mb-4">
            <Form.Check type="checkbox" label="(필수)개인정보 수집·이용 동의서" />
         </Form.Group>
        <Form.Group controlId="formBasicCheckbox2" className="mb-4">
            <Form.Check type="checkbox" label="(선택)개인정보 수집·이용 동의서" />
      </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
            <button type="submit" onClick={handleSubmit} className="me-4 btn btn-success btn-lg btn-block">제출하기</button>
            <button type="reset" onClick={resetButton} className="me-4 btn btn-danger btn-lg btn-block">취소하기</button>
        </Form.Group>
    </Row>
</form>
    </div>
  );
}

export default App;
