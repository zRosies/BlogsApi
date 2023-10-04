
const mongodb = require("../db/connection");
const { ObjectId } = require('mongodb'); // another object I know nothing about it ;--;

const getAllData = async (req, res, next)=>{

    const result= await mongodb.getDb().db('blog').collection("blog").find().toArray();
    // const a= await mongodb.getDb().db().collection("blog")
    // console.log(a);
    
    try{  
        if(result.length === 0){
            res.status(404).json({message : "no data found"})
        }
        else{
            res.setHeader("Content-Type","application/json");
            res.status(200).json(result) // it's supposed to display everything since I haven't chosen an array index
        }
    }
    
    catch(error){
        console.log("Error querying the database:" , error);
        res.status(500).json({message: "internal server error"});

    }
}

const getSingleData = async (req, res, next)=>{
    try {
        const userId = new ObjectId(req.params.id); // Convert the parameter to ObjectId
        const result = await mongodb.getDb().db('blog').collection('blog').find({ _id: userId }).toArray();
    
        if (result.length === 0) {
          res.status(404).json({ message: "No data found" });
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json(result); // Return the first document in the array
        }
      } catch (error) {
        console.error("Error querying the database:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    
   
}

const deleteContact= async(req,res)=>{
  const id = new ObjectId(req.params.id);
  const response= await mongodb.getDb().db('blog').collection('blog').deleteOne({_id: id})

  try{
      if (response.acknowledged) {
          res.status(200).json(response);
          console.log(id + ' item removed')
      } 
      else {
          res.status(500).json(response.error || 'Some error occurred while creating the contact.');}
  }catch(error){
      console.error("Error querying the database:", error);
      res.status(500).json({ message: "Internal server error" });
  }
}

const createContact= async (req,res)=>{
  console.log(req.body.firstName)
  const contact= {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    category: req.body.category

}
 
   console.log('Received POST request with body:', req.body);
   

  const response= await mongodb.getDb().db('blog').collection('blog').insertOne(contact);

  try{
      if (response.acknowledged) {
          res.status(201).json(response);
          console.log(req.body)
      } 
      else {
          res.status(500).json(response.error || 'Some error occurred while creating the contact.');}
  }catch(error){
      console.error("Error querying the database:", error);
      res.status(500).json({ message: "Internal server error" });
  }
}


const updateContact= async (req,res)=>{
    const userId= new ObjectId(req.params.id)
    const newBlog= {
        $set:{
            title: req.body.title,
            author: req.body.author,
            body: req.body.body,
            category: req.body.category

        }
     
  
  }
   
     console.log('Received POST request with body:', req.body);
     
  
    const response = await mongodb.getDb().db('blog').collection('blog').updateOne({ _id: userId }, newBlog);
  
    try{
        if (response.matchedCount === 1 && response.modifiedCount === 1) {
            res.status(200).json({ message: 'Contact updated successfully' });
          } else {
            res.status(404).json({ message: 'Contact not found' });
          }
    }catch(error){
        console.error('Error querying the database:', error);
    res.status(500).json({ message: 'Internal server error' });
    }
  }


module.exports={
    getAllData,
    getSingleData,
    createContact,
    deleteContact,
    updateContact
}