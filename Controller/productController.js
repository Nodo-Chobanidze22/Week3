import fs from "fs";
import { stringify } from "querystring";

 const data = fs.readFileSync('./data/products.json', 'utf8')

  const getProducts =(req, res) => {
    const products = JSON.parse(data);
    res.json({
      messege: products
    })
  };

  const crateProducts = (req, res) => {
    const products = JSON.parse(data);
    const newProduct = {...req.body, id: Date.now()};
  
    if(!newProduct.name || !newProduct.price){
       return res.status(406).json({
        messege: 'name and price is required!'
      })
    }
    
  const findItem = products.find(item => item.name == newProduct.name);
    if (findItem) { 
      return res.status(406).json({
        message: 'Product already exists!'
      });
    }
  
    products.push(newProduct);
    fs.copyFileSync("./data/products.json", `./data/products_backup_${newProduct.id}.json`)
    fs.writeFileSync("./data/products.json", JSON.stringify(products));
    res.status(201).json(newProduct);
  };
  const editProducts = (req, res) => {
    const products = JSON.parse(data);
    const productsIndex = products.findIndex(products => products.id === parseInt(req.params.id));
    const newProduct = {...products[productsIndex], ...req.body}
    products[productsIndex] = newProduct;
    fs.writeFileSync("./data/products.json", JSON.stringify(products));
    res.status(201).json(newProduct);
  
  };
  const deleteProducts = (req, res) => {
    const products = JSON.parse(data);
    const newProducts = products.filter(product => product.id !== parseInt(req.params.id));
    fs.writeFileSync("./data/products.json", JSON.stringify(newProducts));
    res.send("Product Deleted");
  };
  const buyProducts = (req, res) => {
       const productId = parseInt(req.params.id)
         
       const products = JSON.parse(data);
       const productsIndex = products.findIndex(products => products.id === productId);
       if(products[productsIndex].stock < 1){
        return res.status(406).json({
          messege: 'Stock is 0'
        })
       }
       products[productsIndex] = {...products[productsIndex], stock: products[productsIndex].stock -1,};
  
       
       fs.writeFileSync("./data/products.json", JSON.stringify(products));
  
       res.json({
        massage: 'You buy that product',
        data: products[productsIndex]
       })
  };
  const deleteAllProducts = (req, res) => {
    const NewArray = []
    fs.writeFileSync("./data/products.json", JSON.stringify(NewArray));
    res.json({
      messege: 'Now array is clear'
    })
  }


export{getProducts, crateProducts, editProducts, deleteProducts, buyProducts, deleteAllProducts};