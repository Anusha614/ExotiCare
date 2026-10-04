import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
            unique: false,
            trim: true
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            trim: true,
            lowercase: true
        },
        displayName: {
            type: String,
            required: [true, "display name is required"],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "password is required"],
            trim: true  
        },
        profilePicture: {
            type: String,
            default:""
       },
       location: {
            type: String,
            default:""
       },
         refreshToken: {
            type: String,
            default: null
        },
    },
    {
        timestamps: true
    }

)

export const User = mongoose.model("User", userSchema)