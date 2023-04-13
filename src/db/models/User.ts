import { DataTypes, Model, Optional } from "sequelize";
import dbConnection from "../config";

interface UserAttributes {
    id: number;
    name: string;
    password: string;
    token: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {};
export interface UserOutput extends Required<UserAttributes> {};

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public name!: string;
    public password!: string;
    public token!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init(
{
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, 
{
    timestamps: true,
    sequelize: dbConnection,
    paranoid: true
});

export default User;