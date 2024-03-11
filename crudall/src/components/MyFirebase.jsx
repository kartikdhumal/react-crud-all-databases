import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink, json } from 'react-router-dom';

function MySQL() {
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
       await axios.delete(`https://crudall-5c280-default-rtdb.firebaseio.com/works/${workId}.json`);
       getData();
      }
      catch(error){
        console.error(error);
      }
  }

  const getData = async () => {
    try{
      const response = await axios.get('https://crudall-5c280-default-rtdb.firebaseio.com/works.json');
      const data = response.data;
      console.log(data.work);
      if(data){
         const worksArray = Object.keys(data).map((key)=>({
          id:key,
          work:data[key].work,
         }));
         getWorks(worksArray);
      }
      else{
     getWorks('');
      }
    }
    catch(err){
      console.error(err);
    }
  }
  

  const addwork = async (e) => {
    e.preventDefault();
    try {
     const res =  await fetch('https://crudall-5c280-default-rtdb.firebaseio.com/works.json',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          work
        })
      });
        alert('Data Added');
        setWork('');
        getData();
    }
    catch (error) {
      console.log(error);
    }


  }
  return (
    <div className='w-full h-full flex flex-col justify-center pt-28 items-center'>
      <form className='flex flex-col justify-evenly' onSubmit={addwork}>
      <label className='py-3'> CRUD - Firebase </label>
        <input type="text" value={work} onChange={handleWork} required className='p-2 border-2 border-black'></input>
        <input type='submit' className='border-2 cursor-pointer my-3 border-black bg-[#001f50] text-white rounded-lg' value="Add Work"></input>
      </form>

      <table className='w-[70%] mt-12 border-2'>
        <tr className='bg-gray-200'> <th> ID </th> <th> Work  </th> <th> Edit </th> <th> Delete</th></tr>
        {
          works ? <>
           {
            works.map((work,index) => (
              <tr key={work.id}>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{work.work}</td>
                <td className='text-center'><NavLink to={`/updateworkfirebase/${work.id}`} className='text-blue-500'>Edit</NavLink></td>
                <td className='text-center'><p className='text-red-500 cursor-pointer' onClick={() => deleteWork(work.id)}>Delete</p></td>
              </tr>
            ))
           }
          </> : <></>
        }
      </table>
    </div>
  )
}

export default MySQL
