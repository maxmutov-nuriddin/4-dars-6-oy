import { Fragment } from "react"
import { Outlet } from "react-router-dom"

import Headers from "./Header"

const AdminLayout = () => {
  return <Fragment>
    <Headers />
    <main>
      <Outlet />
    </main>
  </Fragment>
}

export default AdminLayout