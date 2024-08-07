import {IsEmail, Length, Max, Min} from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

import bcrypt = require('bcrypt')
import {randomBytes } from 'crypto' // For generating secure tokens


@Entity()
export class UserEntity {



    @PrimaryGeneratedColumn()
    id: number;

    @Column( {nullable: false, unique: true})
    @IsEmail()
    @Length(5, 500)
    email:string;

    @Column( { nullable: false})
    @Length(6, 100)
    password: string

    @Column({ nullable: true })
    resetToken: string;


    generateResetToken() {
        this.resetToken = randomBytes(20).toString('hex');
    }

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10)
    }
    changePassword(plainText: string) {
        this.password = plainText
    }

    checking(plainText: string): boolean {
        return bcrypt.compareSync(plainText, this.password)
    }

}

// 1, Implement CRUD of User,
// 2, WebcamPhotos entity, ( filename, created date, id, size, path, notes)
// 3, API to CRD WebcamPhotos, getALL,


