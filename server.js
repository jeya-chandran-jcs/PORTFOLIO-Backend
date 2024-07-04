import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors())

const transporter=nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
})

app.post("/contact",async(req,res)=>{
    const{name,email,description}=req.body
 
    const mailOption={
        from:email,
        to:process.env.EMAIL,
        subject: "Recruitment Inquiry",
        text:`Name: ${name}\nEmail: ${email}\n\nDescription:\n ${description}`,
        
    }
    transporter.sendMail(mailOption, (error,info)=>{
        if(error){
            return res.status(500).send({message:"cant send mail"},error.toString())
        }
        res.status(200).send(`EMAIL SENT` + info.response)
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})