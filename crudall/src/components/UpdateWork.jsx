import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

function UpdateWork() {
  const [work, setWork] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();

  const handleWork = (e) => {
    setWork(e.target.value);
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(`http://localhost:2500/work/${id}`);
    setWork(response.data.works.work);
  }

  const updateWork = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:2500/updatework/${id}`, {work : work});
      if (response.status === 200) {
        alert('Data Updated');
        navigate('/mongodbcrud');
        setWork('');
        getData();
      }
    }
    catch (error) {
      console.log(error);
    }


  }
  return (
    <div className='w-full h-full flex flex-col justify-center pt-28 items-center'>
      <form className='flex flex-col justify-evenly' onSubmit={updateWork}>
        <label> Update </label>
        <input type="text" value={work} onChange={handleWork} required className='p-2 border-2 border-black'></input>
        <input type='submit' className='border-2 cursor-pointer my-3 border-black bg-[#001f50] text-white rounded-lg' value="Update Work"></input>
      </form>
    </div>
  )
}

export default UpdateWork
