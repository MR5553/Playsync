import { model, Schema } from "mongoose";
import { userType } from "src/types/user.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtToken } from "src/types/jwt.types";

const userSchema = new Schema<userType>({
    profileInfo: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        profileImage: {
            publicId: {
                type: String,
                default: ""
            },
            imageUrl: {
                type: String,
                default: ""
            }
        },
        coverImage: {
            publicId: {
                type: String,
                default: ""
            },
            imageUrl: {
                type: String,
                default: ""
            }
        },
        description: {
            type: String,
            trim: true,
        }
    },
    socialLinks: {
        instagram: {
            type: String,
            default: ""
        },
        facebook: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        },
        LinkedIn: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        }
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
    ],
    watchLater: [
        {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
    ],
    refreshToken: {
        type: String,
        default: ""
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: Number
    },
    verificationCodeExpiry: {
        type: Date,
        default: null
    }
}, { timestamps: true });

userSchema.pre<userType>("save", async function (next) {
    if (!this.isModified("profileInfo.password")) {
        return next();
    }
    this.profileInfo.password = await bcrypt.hash(this.profileInfo.password, 12);
    next();
});

userSchema.methods.IsPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.profileInfo.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.profile_info.email,
            username: this.profile_info.username,
        } as jwtToken,
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: "3d"
        }
    )
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.profile_info.email,
            username: this.profile_info.username,
        } as jwtToken,
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: "7d"
        }
    )
};

export const Users = model<userType>("Users", userSchema);