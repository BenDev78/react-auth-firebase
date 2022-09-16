import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase.config'

export default function Nav() {
  const {toggleModals} = useContext(UserContext)
  const navigate = useNavigate()
  const logout = () => {
      signOut(auth).then(() => navigate('/')).catch(() => {
        alert("We can disconnect user")
      })
  }

  return (
    <nav className='navbar navbar-light bg-light px-4'>
        <Link to="/" className='navbar-brand'>
            AuthJs
        </Link>

        <div>
            <button onClick={() => toggleModals('signUp')} className='btn btn-primary'>Sign Up</button>
            <button onClick={() => toggleModals('signIn')} className='btn btn-primary ms-2'>Sign In</button>
            <button onClick={() => logout()} className='btn btn-danger ms-2'>Logout</button>
        </div>
    </nav>
  )
}
