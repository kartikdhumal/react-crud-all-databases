import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function MongoDB() {
  const [work, setWork] = useState('');
  const [works, getWorks] = useState([]);

  const handleWork = (e) => {
    setWork(e.target.value);
  }

  useEffect(() => {
    getData();
  }, []);

  const deleteWork = async (workId) => {
      try{
       await axios.delete(`http://localhost:2500/deletework/${workId}`);
       getData();
      }
      catch(error){
        console.error(error);
      }
  }

  const getData = async () => {
    const response = await axios.get('http://localhost:2500/works');
    getWorks(response.data.works);
  }

  const addwork = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2500/addwork', {work : work});
      if (response.status === 200) {
        alert('Data Added');
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
      <form className='flex flex-col justify-evenly' onSubmit={addwork}>
        <label className='py-3'> CRUD - MongoDB </label>
        <input type="text" value={work} onChange={handleWork} required className='p-2 border-2 border-black'></input>
        <input type='submit' className='border-2 cursor-pointer my-3 border-black bg-[#001f50] text-white rounded-lg' value="Add Work"></input>
      </form>

      <table className='w-[70%] mt-12 border-2'>
        <tr className='bg-gray-200'> <th> ID </th> <th> Work  </th> <th> Edit </th> <th> Delete</th></tr>
        {
          works ? <>
           {
            works.map((work,index) => (
              <tr key={work._id} className='my-5'>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{work.work}</td>
                <td className='text-center'><NavLink to={`/updatework/${work._id}`} className='text-blue-500'>Edit</NavLink></td>
                <td className='text-center'><p className='text-red-500 cursor-pointer' onClick={() => deleteWork(work._id)}>Delete</p></td>
              </tr>
            ))
           }
          </> : <></>
        }
      </table>
    </div>
  )
}

export default MongoDB
