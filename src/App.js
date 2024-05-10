import React from 'react';
import { useState,useEffect } from 'react';
import { Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, Row } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import fireDB from './firebase';
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    company :"",
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
  //체크박스이 상태를 추적하는 새로운 상태 변수를 추가합니다.
  const [isChecked, setIsChecked] = useState(false);
  // 모달의 상태를 추적하는 새로운 상태 변수를 축합니다.
  const [showModal, setShowModal] = useState(false);
  //모달을 열고 닫는 함수를 추가합니다
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


//   const [data,setData] = useState({});
  
  const {company,name,mobile,email,order} =state;

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
  
  //체크박스이 상태를 변경하는 함수를 추가합니다

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  }

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
    if (!company|| !name || !email || !mobile || !isChecked) {
      showToastMessage();
    } else {
      const newData = { 
        company,
        name, 
        email, 
        mobile, 
        order : order ||"", 
        done :"NotDone" 
      }; // done 속성의 값을 직접 설정합니다.
      
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
      company:'',
      name: '',
      mobile: '',
      email: '',
      order: '',
      done : 'NotDone'
    });
  }

  return (
 
    <div className="App">
      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>개인정보 수집·이용 동의서</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p><strong>[필수] 개인정보 수집·이용 동의 안내</strong></p>

              <p>(주)가디언넷 ("회사")은 해당 내용에 따라 귀하의 정보를 수집 및 활용합니다. 다음의 내용을 숙지하시고 동의하는 경우 체크 박스에 표시해 주세요.</p>

              <p><strong>1. 개인정보 수집자 :</strong> (주)가디언넷</p>

              <p><strong>2. 수집 받는 개인 정보</strong><br />
              [필수] 회사명, 이름, 연락처, 이메일주소<br />
              [선택] 문의내용</p>

              <p><strong>3. 수집/이용 목적</strong><br />
              - 고객 상담 문의를 위한 개인정보 수집</p>

              <p><strong>4. 보유 및 이용 기간 :</strong> 개인정보 수집일로부터 3년(단, 고객 동의 철회 시 지체없이 파기)</p>

              <p><strong>※ 개인정보 이용 철회 방법</strong><br />
              - 안내 문자 등의 동의 철회를 이용하는 방법 : 이메일 수신 거부 링크 클릭 또는 안내 문자 내 수신거부 연락처를 통한 수신 거부 의사 통보<br />
              - 개인정보 처리 상담 부서<br />
              - 부서명: 마케팅그룹<br />
              - 연락처: tech@guardiannet.co.kr</p>

              <p><strong>※ 동의거부권 및 불이익</strong><br />
              귀하는 동의를 거절할 수 있는 권리를 보유하며, 동의를 거절하는 경우 상기 이용 목적에 명시된 서비스가 제공되지 아니합니다.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
          </Modal.Footer>
    </Modal>
  
     <ToastContainer />
      <form className="container mt-3 mb-3">

      <Row className="mb-3">
      <div class="card bg-secondary text-white">
  <div class="card-body">
    <h4 class="card-title"><strong>[GDNcloud] GDNCloud 관련 문의</strong></h4><br />
   
    <p className="card-text">
        안녕하세요,클라우드 보안의 전문가그룹 가디언넷입니다.<br /><br />
        GDNcloud 의 문의에 대한 답변을 빠르게 성심껏 답변 드리겠습니다.<br />
        
        원활한 문의에 대한 상담 진행을 위해 아래 정보를 작성해 주세요.<br /><br />
    </p>
 
  </div>    
  </div>


</Row>      
    <Row className="mb-3">
      <Form.Group controlId="formBasicCompany" className="col col-sm-6">
        <Form.Label><strong>회사 이름을 입력해 주세요. (필수)</strong><span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control type="text" name="company" value={company} onChange={handleInputChange} className="form-control" />
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group controlId="formBasicName" className="col col-sm-6">
        <Form.Label><strong>담당자 이름을 입력해 주세요 (필수)</strong><span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control type="name" name="name" value={name} onChange={handleInputChange} className="form-control" />
      </Form.Group>
    </Row>

    <Row className="mb-3">
        <Form.Group controlId="formBasicMobile" className="col col-sm-6">
            <Form.Label><strong>전화번호를 입력해 주세요.(필수)</strong><span style={{ color: 'red' }}>*</span><p>gdncloud 셋팅 및 귀사 담당 엔지니어 할당을 위해 연락을 드릴 수 있습니다.</p>
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
             <p>입력하신 이메일로 귀사 담당 엔지니어가 관련 정보를 발송됩니다.</p> </Form.Label>
            <InputGroup>
                <Form.Control aria-label="Recipient's username" aria-describedby="basic-addon2" type="email" name="email" value={email} onChange={handleInputChange} />
                {/* <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text> */}
            </InputGroup>
        </Form.Group>
    </Row> 
    
    <Row className="mb-3"> 
        <Form.Group controlId="formGridlabel" className="col col-sm-6">
            <Form.Label><strong>원할한 GDNCloud 의 셋팅 및 준비를 위하여. (선택)</strong>
             <p>귀사의 클라우드 서버의 수량과 OS정보 및 구성정보를 입력해주시면 빠른 대응이 가능합니다.</p> </Form.Label>
            <Form.Control as="textarea" rows="{5}" className="form-control" name="order" value={order} onChange={handleInputChange} />
        </Form.Group>
      <Form.Group controlId="formBasicCheckbox" className="mb-4">
        <Form.Check type="checkbox" label="(필수)개인정보 수집·이용 동의서" onChange={handleCheckboxChange} />
        <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleShow}>전문보기</span>
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
