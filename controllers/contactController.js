// get, post, put, delete 요청 방식에 따라 처리할 함수 작성

 
/*
미들웨어를 사용하면 try~catch 문을 사용하지 않고 코드를 간단하게 줄일 수 있다.

const getAllContacts = async (req, res) => {  // 비동기 방식 처리
    try {
        res.status(200).send('Contacts Page');
    } catch (error) {
        res.send(error.message);
    }

};

module.exports = getAllContacts;
*/

const asyncHandler = require('express-async-handler'); // asyncHandler import --> 미들웨어 설치 필요 
const Contact = require('../models/contactModel');
const path = require('path');

//@desc Get all contacts :> @desc : 함수설명,  모든 연락처 정보를 가져오는 함수
//@route Get /contacts :> @route : 요청방식과 URL
const getAllContacts = asyncHandler(async (req, res) => {  // 비동기 방식 처리
    const contacts = await Contact.find();
    res.render('index', { contacts: contacts}); // contacts model에서 가져온 자료를 contacts 변수에 저장해 index.ejs 파일로 넘겨라
    /*
    const users = [
        { name: 'John', email: 'john@aaa.bbb', phone: '123456789'},
        { name: 'Jane', email: 'jane@aaa.bbb', phone: '67891234'},
    ];
    res.render("getAll", { heading: "User List", users: users});
    */
    /*
        동적파일 연결 
        res.status(200).send("<h1 style ='color:green'>Contacts Page</h1>");
    */
    /*  
        정적 파일 연결
        const filePath = path.join(__dirname,"../assets", "getAll.html");
        res.sendFile(filePath);
    */
   //EJS 파일 연결 ===> res.render(); views 폴더에 있는 getAll.ejs 파일 렌더링
   /*
     컨트롤러에서 템플릿 파일로 값 넘기기
     res.render(ejs 파일, {변수 : 전송 자료}) 
     1. 매개변수와 연결할 ejs 파일
     2. 컨트롤러에서 전달하는 변수명
     3. 컨트롤러에서 전달하는 자료 
   */
    
});

//@desc View and add contact form
//@route GET /contacts/add
const addContactForm = (req, res) => {
    res.render('add'); // views/add.ejs 렌더링
};

//@desc Create a contact
//@route Post /contacts
const createContact = asyncHandler(async(req, res) => {
    console.log(req.body); // 콘솔에 본문내용 출력
    const {name, email, phone} = req.body; // 인스턴스 할당  
    if (!name || !email || !phone) {
        return res.status(400).send('필수값이 입력되지 않았습니다.');
    }

    const contact = await Contact.create({name, email, phone});

    // status code 201 : 자료가 새로 만들어진 상태 
    res.redirect("/contacts");
});

//@desc get a contact
//@route Get /contacts/:id
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.render("update", {contact: contact});
});

//@desc update a contact
//@route Put /contacts/:id
const updateContact = asyncHandler(async(req, res) => {
    
    // id 값으로 도큐먼트를 찾는다.
    const id = req.params.id;
    const {name, email, phone} = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
        id, 
        {name, email, phone},
        {new : true} // 수정한 결과를 화면에 보여주고 싶을 때 사용 
    )
    res.redirect("/contacts")
    /*
    const contact = await Contact.findById(id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }
    // 찾아온 도큐먼트를 수정하고 저장한다.
    contact.name = name;
    contact.email = email;
    contact.phone = phone;

    contact.save();

    res.status(200).json(contact);
    */


});

//@desc delete a contact
//@route Delete /contacts/:id
const deleteContact = asyncHandler(async(req, res) => {
/*  const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found!');
    }
    await Contact.deleteOne();

    res.status(200).send(`Delete Contact for ID : ${req.params.id}`);
*/
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/contacts');
});

module.exports = {getAllContacts, createContact, getContact, updateContact, deleteContact, addContactForm,};
