import fs from  "fs";
import { stringify } from "querystring";

 const data = fs.readFileSync('./data/users.json', 'utf8');

 const crateUser = (req, res) => {
    const user = JSON.parse(data);
    const newUser = {...req.body, id: Date.now()}
  
    if(!newUser.name || !newUser.gmail){
       return res.status(406).json({
        messege: 'name and gmail is required!'
      })
    }
    if(!newUser.password){
      return res.status(406).json({
       messege: 'password is required!'
     })
   }
    const findItem = user.find(item => item.name == newUser.name);
    if (findItem) { 
      return res.status(406).json({
        message: 'Product already exists!'
      });
    }
  
    user.push(newUser);
    fs.writeFileSync('./data/users.json', JSON.stringify(user));
    res.status(201).json(newUser);

 }

 const editUser = (req, res) =>{
  const user = JSON.parse(data);
  const userIndex = user.find(item => item.id === parseInt(req.params.id));
  const newUser = {...user[userIndex], ...req.body}
  user[userIndex] = newUser;
  fs.writeFileSync("./data/users.json", JSON.stringify(user));
  res.status(201).json(newUser);
 }

 const deleteUser = (req, res) =>{
    const user = JSON.parse(data);
    const newUser = user.filter(item => item.id !== parseInt(req.params.id))
    fs.writeFileSync('./data/users.json', stringify(newUser));
    res.status(201).send("Product Deleted");
 }

 export{crateUser, editUser, deleteUser}