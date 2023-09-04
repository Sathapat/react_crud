import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'


function FormInsert() {

  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const [paramsfirstName, setParamsFirstName] = useState('')
  const [paramslastName, setParamsLastName] = useState('')
  const [paramsEmail, setParamsEmail] = useState('')
  const [paramsAddress, setParamsAddress] = useState('')

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/employee/${id}`).then((res) => {
      setParamsFirstName(res.data[0].first_name)
      setParamsLastName(res.data[0].last_name)
      setParamsEmail(res.data[0].email)
      setParamsAddress(res.data[0].address)
    }, [])
  })


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    axios.put(`http://127.0.0.1:8080/api/employee/${id}`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address
    }).then((res) => {
      navigate('/')
    })
  }

  return (
    <>
      <div className="lg:container md:container sm:container lg:mx-auto md:mx-auto sm:mx-auto">
        <div className="p-3 shadow">
          <div className='py-2 text-center'>
            <b className='text-xl'>Insert employee</b>
          </div>
          <div className="text-left py-2">
            <div>
              <Link to='/'><button className='px-2 py-2 w-20 bg-red-500 text-slate-50 rounded hover:bg-red-600'>Back</button></Link>
            </div>
          </div>
          <form onSubmit={submit}>
            <div className='mb-3'>
              <label className='mb-2 text-gray'>First name</label>
              <input
                type="text"
                className='px-2 py-2 w-full border focus:ring-sky-500 focus:border-sky-500 rounded'
                onChange={handleFirstNameChange}
                value={paramsfirstName}
                required
              />
            </div>
            <div className='mb-3'>
              <label className='mb-2 text-gray'>Last name</label>
              <input
                type="text"
                className='px-2 py-2 w-full border focus:ring-sky-500 focus:border-sky-500 rounded'
                onChange={handleLastNameChange}
                value={paramslastName}
                required
              />
            </div>
            <div className='mb-3'>
              <label className='mb-2 text-gray'>Email</label>
              <input
                type="text"
                className='px-2 py-2 w-full border focus:ring-sky-500 focus:border-sky-500 rounded'
                onChange={handleEmailChange}
                value={paramsEmail}
                required
              />
            </div>
            <div className='mb-3'>
              <label className='mb-2 text-gray'>Address</label>
              <textarea
                type="text"
                className='px-2 py-2 w-full border focus:ring-sky-500 focus:border-sky-500 rounded'
                onChange={handleAddressChange}
                value={paramsAddress}
                required
              >
              </textarea>
            </div>
            <div className="text-center mb-3">
              <button className='px-3 py-2 w-32 bg-green-500 hover:bg-green-600 rounded text-slate-50'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormInsert
