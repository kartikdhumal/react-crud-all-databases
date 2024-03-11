import React from 'react'
import { Link, Routes , Route } from 'react-router-dom'
import JsonServer from './JsonServer'
import MongoDB from './MongoDB'
import MyFirebase from './MyFirebase'
import MySQL from './MySQL'
import UpdateWork from './UpdateWork'
import UpdateWorkJson from './UpdateWorkJson'
import UpdateWorkSQL from './UpdateWorkSQL'
import UpdateWorkFirebase from './UpdateWorkFirebase'

function result() {
  return (
    <div>
      <Routes>
        <Route path={'/jsonserver'} element={<JsonServer/>} />
        <Route path={'/mongodbcrud'} element={<MongoDB/>} />
        <Route path={'/firebasecrud'} element={<MyFirebase/>} />
        <Route path={'/mysqlcrud'} element={<MySQL/>} />
        <Route path={'/updatework/:id'} element={<UpdateWork/>} />
        <Route path={'/updateworksql/:id'} element={<UpdateWorkSQL/>} />
        <Route path={'/updatejsonwork/:id'} element={<UpdateWorkJson/>} />
        <Route path={'/updateworkfirebase/:id'} element={<UpdateWorkFirebase/>} />
      </Routes>
    </div>
  )
}

export default result
