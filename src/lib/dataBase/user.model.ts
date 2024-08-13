import mongoose , {Schema,models,model} from 'mongoose';

const userSchema=new Schema({
    clerkId:{
        type:String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
})

const User = models.User|| model('User', userSchema);
export default User;