const express = require('express');
const router = express.Router();
const {getAllContacts, createContact, getContact, updateContact, deleteContact, addContactForm,} = require('../controllers/contactController');

// 하나의 경로에서 여러 요청을 처리해야 할 때 다음과 같이 router.route().METHOD 방식인 메소드 체이닝을 사용한다. 

// 연락처 가져오기
router
.route('/') 
.get(getAllContacts);

// 로그인하기
router
.route('/add')
.get(addContactForm)
.post(createContact);

// 연락처 상세보기, 수정하기, 삭제하기
router
.route('/:id')
.get(getContact)
.put(updateContact)
.delete(deleteContact);

module.exports = router;