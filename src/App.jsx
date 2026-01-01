import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Api from './pages/Api'
import Docs from './pages/Docs'
import Home from './pages/Home'
import Insights from './pages/Insights'
import NotFound from './pages/NotFound'
import UseCases from './pages/UseCases'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/atlas" element={<Home />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/api" element={<Api />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
