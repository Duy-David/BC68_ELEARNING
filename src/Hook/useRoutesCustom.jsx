import React from 'react'
import { useRoutes } from 'react-router-dom'
import Usertemplate from '../template/Usertemplate/Usertemplate'
import { pathDefault } from '../common/path'

const useRoutesCustom = () => {
    const routes =useRoutes([
        {
            path: pathDefault.homePage,
            element: <Usertemplate/>
        },
    
    ])
    
  return routes
}

export default useRoutesCustom