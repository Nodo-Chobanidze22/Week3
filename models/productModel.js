import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true},
    name: { type: String, required:true},
    price: { type: Number, required:true},
    description: { type: String, required: true},
    stock: { type:Number, required: true},
    slug: {type: String},
    createAt: {type:Date, default: Date.now},
    archived: {type:Boolean, default: false},
   }, 
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  });


productSchema.virtual("priceWithTax").get(function () {
    return this.price * 1.2; 
});

productSchema.virtual("capacity").get(function () {
    return this.price * this.stock; 
});

productSchema.statics.archivedProduct = async function (filter) {
    try {
        return await this.updateOne(filter, { archived: true });
    } catch (error) {
        console.error("Database update error:", error);
        throw new Error("Failed to archive product");
    }
};

const Product = mongoose.model("Product", productSchema);

export default Product;
  