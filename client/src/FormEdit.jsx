import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'


function FormEdit() {
  const [title, setTitle] = useState('Form Edit')


  const navigate = useNavigate()
  const { id } = useParams()
  const [employee, setEmployee] = useState([])

  
  useEffect(() => {
    document.title = title
    axios.get(`http://127.0.0.1:8080/api/employee/edit/${id}`).then((res) => {
      setEmployee(res.data[0])
    })
  }, [])

  
  const handleFirstNameChange = (e) => {
    setEmployee({...employee, first_name: e.target.value})
  }
  const handleLastNameChange = (e) => {
    setEmployee({...employee, last_name: e.target.value})
  }
  const handleEmailChange = (e) => {
    setEmployee({...employee, email: e.target.value})
  }
  const handleAddressChange = (e) => {
    setEmployee({...employee, address: e.target.value})
  }

  const submit = (e) => {
    e.preventDefault()

    axios.put(`http://127.0.0.1:8080/api/employee/update/${id}`, {
      firstName: employee.first_name,
      lastName: employee.last_name,
      email: employee.email,
      address: employee.address
    }).then((res) => {
      navigate('/')
    }).catch((err) => {
      alert('failed')
    })
  }


  return (
    <>
      <div className="lg:container md:container sm:container lg:mx-auto md:mx-auto sm:mx-auto">
        <div className="p-3 shadow">
          <div className='py-2 text-center'>
            <b className='text-xl'>Edit employee</b>
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
                // name='firstName'
                onChange={handleFirstNameChange}
                value={employee.first_name}
                required
              />
            </div>
            <div className='mb-3'>
              <label className='mb-2 text-gray'>Last name</label>
              <input
                type="text"
                className='px-2 py-2 w-full border focus:ring-sky-500 focus:border-sky-500 rounded'
                onChange={handleLastNameChange}
                value={employee.last_name}
                required
              />
            </div>
            <div className='mb-3'>
              <label className='mb-2 text-gray'>Email</label>
              <input
                type="text"
                className='px-2 py-2 w-full border focus:ring-sky-500 focus:border-sky-500 rounded'
                onChange={handleEmailChange}
                value={employee.email}
                required
              />
            </div>
            <div className='mb-3'>
              <label className='mb-2 text-gray'>Address</label>
              <textarea
                type="text"
                className='px-2 py-2 w-full border focus:ring-sky-500 focus:border-sky-500 rounded'
                onChange={handleAddressChange}
                value={employee.address}
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

export default FormEdit
