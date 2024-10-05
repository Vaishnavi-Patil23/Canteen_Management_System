import { Schema, model } from 'mongoose';

const menuItemsSchema = new Schema({
    itemName :{
        type:String,
        required:true,
    },
    itemPrice :{
        type:Number,
        required:true,
    },
    Availability:{
        type:Boolean,
        required:true,
    },
},{timestamps: true}
);

const MenuItem = model('MenuItem', menuItemsSchema);
export default MenuItem;