
import { useState } from 'react'
import './App.css'

function App() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmailSelected, setLoginEmailSelected] = useState(false);
  const [loginPasswordSelected, setLoginPasswordSelected] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loggedUser, SetLoggedUser] = useState(null)

  const[registeringEmail, setRegisteringEmail]=useState('')
  const[registeringPassword, setRegisteringPassword]=useState('')
  const[gender, setGender]=useState('')
  const[age, setAge]=useState('')
  const[sleepPattern, setSleepPattern]=useState('')

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

  const register = ()=>{
    console.log('registering')
  }
  
  return (
    
    <div className='main-page'>
      <h1>TO DO LIST</h1>
      <div>
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
      <div>
        <h2>Register</h2>
        <form onSubmit={register} className='register-form'>
          <input placeholder ="email" onChange={setRegisteringEmail}/>
          <input placeholder ="password" onChange={setRegisteringPassword}/>
          <input placeholder ="gender" onChange={setGender}/>
          <input placeholder ="age" onChange={setAge}/>
          <select>
            <option>Sleepes Early</option>
            <option>Sleeps Late</option>
            <option>Not Sure</option>
          </select>
          <select placeholder ="sleep pattern" onChange={setSleepPattern}>
            <option>Wakes up Early</option>
            <option>Wakes up Late</option>
            <option>Not Sure</option>
          </select>
          <button>Register</button>
        </form>
      </div>
    </div>
  )
}

export default App
