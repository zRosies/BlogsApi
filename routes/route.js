const express= require("express");
const router= express.Router();
const contacts = require('../controllers/contactsData')

const contactSwitch= express.Router();

contactSwitch.get('/',contacts.getAllData);
contactSwitch.get('/:id', contacts.getSingleData);
contactSwitch.post('/', contacts.createContact);
contactSwitch.delete('/:id', contacts.deleteContact);
contactSwitch.put('/:id', contacts.updateContact)




router.use("/blog", contactSwitch);



module.exports=router;
