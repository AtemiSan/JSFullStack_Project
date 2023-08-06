import './styles/index.scss'
import login_classes from './styles/login.module.scss'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { Layout } from './components/Layout'
import { ProfilePage } from './pages/ProfilePage'
import { MyOrdersPage } from './pages/MyOrdersPage'
import { CreateOrderPage } from './pages/CreateOrderPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { AgreementPage } from './pages/AgreementPage'
import { ProfileChangePasswPage } from './pages/ProfileChangePasswPage'
import { OrderPage } from './pages/OrderPage'
import { ReferencesPage } from './pages/ReferencesPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='lk' element={<Layout />}>
        <Route path='profile' element={<ProfilePage />} />
        <Route path='changePassw' element={<ProfileChangePasswPage />} />
        <Route index element={<MyOrdersPage />} />
        <Route path="order" element={<OrderPage/>} />   
                
        <Route path='create_order' element={<CreateOrderPage />} />
        <Route path='registration' element={<RegistrationPage />} />
        <Route path='agreement' element={<AgreementPage />} />
        <Route path='references' element={<ReferencesPage />} />
      </Route>   
    </Routes>
  );
}
//<Route path=":orderId" element={<OrderPage/>} />        

export default App;


