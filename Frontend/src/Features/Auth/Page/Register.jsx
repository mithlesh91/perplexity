import React from 'react'
import '../Page/shares/register.scss'
import { useState } from 'react'

const Register = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const formhandle = (e) => {
        e.preventDefault()
        console.log("username",username)
        console.log("email",email)
        console.log("name",name)
        console.log("password",password)
    }
    return (
        <div className="main">
            <div className="container">
                <h3>Register your details</h3>
                <form onSubmit={formhandle} >
                    <input
                        value={username}
                        onChange={(e) => { setusername(e.target.value) }}
                        type="text" placeholder='Enter username'
                        name='username'
                    />
                    <input
                        value={email}
                        onChange={(e) => { setemail(e.target.value) }}
                        type="email" placeholder='Enter email'
                        name='email'
                    />
                    <input
                        value={name}
                        onChange={(e) => { setname(e.target.value) }}
                        type="text" placeholder='Enter name'
                        name='name'
                    />
                    <input
                        value={password}
                        onChange={(e) => { setpassword(e.target.value) }}
                        type="password" placeholder='Enter password'
                        name='password'
                    />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register
