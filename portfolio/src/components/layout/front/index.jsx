import { Fragment } from "react"
import { Outlet } from "react-router-dom"

import Header from "../../header/Header"

const FrontLayout = () => {
  return <Fragment>
    <Header />
    <main>
      <Outlet />
    </main>
  </Fragment>
}

export default FrontLayout