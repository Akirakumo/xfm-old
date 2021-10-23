import React, { lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Loading from './components/Loading'
const Login = lazy(()=> import('./pages/Login'))
const Home  = lazy(()=> import('./pages/Home'))

export default function APP() {
  return (
    <>
      <Suspense fallback={ <Loading /> }>
        <Switch>
          <Route path='/login'  component={Login} />
          <Route path='/home'  component={Home} />
          <Redirect to='/login' />
        </Switch>
      </Suspense>
    </>
  )
}
