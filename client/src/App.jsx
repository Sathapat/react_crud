import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



function App() {

  const [title, setTitle] = useState('Home')

  const navigate = useNavigate()

  const [employees, setEmployee] = useState([])

  const loadData = () => {
    axios.get('http://127.0.0.1:8080/api/employee/').then((res) => {
      setEmployee(res.data)
    })
  }

  useEffect(() => {
    document.title = title
    loadData()
  }, [])

  const search = (e) => {
    const keyword = e.target.value
    if (keyword != '') {
      axios.get(`http://127.0.0.1:8080/api/employee/search`, { params: { keyword: keyword } }).then((res) => {
        setEmployee(res.data)
      })
    } else {
      loadData()
    }
  }

  const deleteEmployee = (e) => {
    if (confirm('Do you want to delete ?') === true) {
      const id = e.target.value
      axios.delete(`http://127.0.0.1:8080/api/employee/${id}`).then((res) => {
        // alert('deleted!!')
        loadData()
      })
    }
  }

  return (
    <>
      <div className="lg:container md:container lg:mx-auto md:mx-auto">
        <div className='p-3'>
          <div className='py-2 text-center'>
            <b className='text-xl'>Manage Employee</b>
          </div>
          <div className="flex justify-between py-2">
            <div>
              <Link to='/form-insert'><button className='px-2 py-2 bg-sky-500 text-slate-50 rounded hover:bg-sky-600'>add employee</button></Link>
            </div>
            <div>
              <input type="text" onChange={search} className='px-2 py-2 border focus:ring-sky-500 focus:border-sky-500 rounded' />
            </div>
          </div>
          <table className='w-full border shadow'>
            <thead>
              <tr>
                <th className="px-4 py-2 bg-slate-900 text-slate-50 font-semibold sticky">FIRST_NAME</th>
                <th className="px-4 py-2 bg-slate-900 text-slate-50 font-semibold sticky">LAST_NAME</th>
                <th className="px-4 py-2 bg-slate-900 text-slate-50 font-semibold sticky">EMAIL</th>
                <th className="px-4 py-2 bg-slate-900 text-slate-50 font-semibold sticky">ADDRESS</th>
                <th className="px-4 py-2 bg-slate-900 text-slate-50 font-semibold sticky">MANAGE</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((value, key) => {
                return (
                  <tr className='hover:bg-slate-100'>
                    <td className='px-2 py-2'>{value.first_name}</td>
                    <td className='px-2 py-2'>{value.last_name}</td>
                    <td className='px-2 py-2'>{value.email}</td>
                    <td className='px-2 py-2'>{value.address}</td>
                    <td className='flex gap-2 justify-center px-2 py-2'>
                      {/* <Link to={{ pathname: 'form-edit', state: value.first_name }}><button className='px-3 py-2 bg-yellow-500 text-slate-50 rounded'>Edit</button></Link> */}
                      <Link to={`form-edit/${value.id}`}><button className='px-3 py-2 bg-yellow-500 text-slate-50 rounded'>Edit</button></Link>
                      <button className='px-3 py-2 bg-red-500 text-slate-50 rounded' onClick={deleteEmployee} value={value.id}>Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
