import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'
import { useAuth } from '../hooks/auth';

export function Routes(){
  const { user } = useAuth()
  return(
    <BrowserRouter>
      {/* No primeiro momento o estado não tinha conteúdo
        mostra o AuthRoutes,depois de ter conteúdo mostra o AppRoutes*/}
      {user ? <AppRoutes/> : <AuthRoutes/>}
    </BrowserRouter>
  )
}

