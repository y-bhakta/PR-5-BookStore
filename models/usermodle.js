import mongoose from 'mongoose';
const BookSchema=mongoose.Schema({
    bookname:{
        type:String,
        required:true
    },
    authorname:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    price:{
        type: Number,
        required:true,
    },
    subject:{
        type: String,
        required:true,
    }
},{
    timestamps:true
});

export const Books=mongoose.model("Books",BookSchema);