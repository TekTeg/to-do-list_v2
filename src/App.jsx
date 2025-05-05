
import { useState } from 'react'
import './App.css'

function App() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmailSelected, setLoginEmailSelected] = useState(false);
  const [loginPasswordSelected, setLoginPasswordSelected] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loggedUser, SetLoggedUser] = useState(null)
  const login =async(e)=>{
    e.preventDefault();
    console.log(loginEmail + " " +loginPassword)
    const response = await fetch('api/v1/users/login', {
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email:loginEmail,
        password:loginPassword
      })
    })
    const result = await response.json()
    console.log(result)
    setToken(result.token)
    localStorage.setItem('token', result.token)
    window.alert(result.success)
    SetLoggedUser(result.user)
  }
  
  return (
    
    <div className='main-page'>
      <h1>TO DO LIST</h1>
      <h2>Login</h2>
      <form onSubmit={login} className='login-form'>
        <div className='login-email-container'>
          {
          loginEmailSelected && <p>email</p>
          }
          <input 
            placeholder='email' type='email' 
            onChange={(e) => setLoginEmail(e.target.value)} 
            onSelect={(e)=>{e.target.placeholder='', setLoginEmailSelected(true)}}
            onBlur={(e)=>{e.target.placeholder='email', setLoginEmailSelected(false)}}
            />
        </div>
        <div className='login-password-container'>
          {
            loginPasswordSelected && <p>password</p>
          }
       
          <input placeholder='password' type='password' 
            onChange={(e) => setLoginPassword(e.target.value)} 
            onSelect={(e)=>{e.target.placeholder='', setLoginPasswordSelected(true)}}
            onBlur={(e)=>{e.target.placeholder='password', setLoginPasswordSelected(false)}}
          
          />
        </div>
        

        <button>Login</button>
      </form>
     
    </div>
  )
}

export default App
