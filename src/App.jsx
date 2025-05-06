
import { useState } from 'react'
import './App.css'

function App() {
  const [loginSelected, SetLogginSelected] = useState(true)
  const [registerSelected, SetRegisterSelected] = useState(false)
  const [listSelected, SetListSelected] = useState(false)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmailSelected, setLoginEmailSelected] = useState(false);
  const [loginPasswordSelected, setLoginPasswordSelected] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loggedUser, SetLoggedUser] = useState(null)

  const [registered, setRegistered] = useState(false)
  const [registeringEmail, setRegisteringEmail] = useState('')
  const [registeringPassword, setRegisteringPassword] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [sleepPattern, setSleepPattern] = useState('')
  const [wakeUpPattern, setWakeUpPattern] = useState('')

  const login = async (e) => {
    e.preventDefault();
    console.log(loginEmail + " " + loginPassword)
    const response = await fetch('api/v1/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword
      })
    })
    const result = await response.json()
    console.log(result)
    setToken(result.token)
    localStorage.setItem('token', result.token)
    window.alert(result.success)
    SetLoggedUser(result.user)
    SetLogginSelected(false)
  }

  const register = async (e) => {
    e.preventDefault();
    console.log(registeringEmail)
    const response = await fetch ('/api/v1/users/register',{
      method: 'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:registeringEmail,
        password:registeringPassword,
        gender:gender,
        age:age,
        sleepPattern:sleepPattern,
        wakeUpPattern:wakeUpPattern
      })
    })
    const result = await response.json()
    console.log(result)
    if( !result.success){
    window.alert(result.message)}
    else {setRegistered(true)}
  }

  const navSelector = (e) => {
    if (e.target.innerText === 'Login') {
      SetLogginSelected(true), SetRegisterSelected(false), SetListSelected(false)
    }
    else if (e.target.innerText === 'Register') {
      SetLogginSelected(false), SetRegisterSelected(true), SetListSelected(false)
    }
    else if (e.target.innerText === 'Task') {
      SetLogginSelected(false), SetRegisterSelected(false), SetListSelected(true)
    }
    else if (e.target.innerText === 'Signout') {
      SetLogginSelected(true), SetRegisterSelected(false), SetListSelected(false)
      localStorage.removeItem("token"), setToken(null)
    }
  }


  return (
    <div className='main-display'>
      <div className='nav-bar'>
        {
          token ?
            <p onClick={navSelector}>Signout</p> :
            <p onClick={navSelector}>Login</p>
        }

        <p onClick={navSelector}>Register</p>
        <p onClick={navSelector}>Task</p>


      </div>
      <div className='main-page'>
        <h1>TO DO LIST</h1>
        {
          loginSelected &&
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
                  onSelect={(e) => { e.target.placeholder = '', setLoginEmailSelected(true) }}
                  onBlur={(e) => { e.target.placeholder = 'email', setLoginEmailSelected(false) }}
                />
              </div>
              <div className='login-password-container'>
                {
                  loginPasswordSelected && <p>password</p>
                }

                <input placeholder='password' type='password'
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onSelect={(e) => { e.target.placeholder = '', setLoginPasswordSelected(true) }}
                  onBlur={(e) => { e.target.placeholder = 'password', setLoginPasswordSelected(false) }}

                />
              </div>
              <button>Login</button>
            </form>
          </div>
        }
        { registered? <div><p>You have successfully registered. Click below to log in</p>
        <button onClick={(e)=>{
          SetLogginSelected(true), 
          SetRegisterSelected(false), 
          SetListSelected(false),
          setRegistered(false)
        }}>Login</button></div>:
          registerSelected &&
          <div>
            <h2>Register</h2>
            <form onSubmit={register} className='register-form'>
              <input placeholder="email"
                type ='email'
                onChange={(e)=>setRegisteringEmail(e.target.value)} />
              <input placeholder="password"
                type='password'
                onChange={(e)=>setRegisteringPassword(e.target.value)} />
              <input placeholder="gender" 
                onChange={(e)=>setGender(e.target.value)} />
              <input placeholder="age"
                type='number'
                onChange={(e)=>setAge(e.target.value)} />
              <lable for="sleep pattern">Sleep Pattern</lable>
              <select name="sleep pattern" 
                onChange={(e)=>setSleepPattern(e.target.value)}>
                <option></option>
                <option>Sleeps Early</option>
                <option>Sleeps Late</option>
                <option>Not Sure</option>
              </select>
              <select name="wake up pattern" 
                onChange={(e)=>setWakeUpPattern(e.target.value)}>
                <option></option>
                <option>Wakes up Early</option>
                <option>Wakes up Late</option>
                <option>Not Sure</option>
              </select>
              <button>Register</button>
            </form>
          </div>
        }
        {
          listSelected &&
          <div>
            <h1> List</h1>
          </div>
        }
      </div>
    </div>
  )
}

export default App
