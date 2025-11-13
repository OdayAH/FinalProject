import { MdOutlineShoppingBag } from 'react-icons/md'
import Logo from '../assets/images/Logo.png'
import { useStore } from '../store/useStore'

export default function Header() {
    const { isLoggedIn } = useStore();
  return (
    <header className="flex justify-between bg-teal-700 h-20 items-center px-3">
        <div className='w-15 flex items-center justify-center overflow-hidden'>
          <img src={Logo} alt="Logo" className="w-full h-full object-fill object-center" />
        </div>
        <nav className='flex gap-4 text-white'>
            <a href="">Products</a>
            <a href="">Orders</a>
        </nav>
        <div className='flex items-center gap-4'>
            {isLoggedIn && <div className='flex items-center gap-4'>
                <button className='text-white'><MdOutlineShoppingBag className='text-3xl' /></button> <button className='bg-emerald-500 p-2 rounded-lg text-white'>Logout</button>
                </div>}
            {!isLoggedIn && <div>
                <button>Login</button>
                <button>Sign Up</button>
            </div>}
        </div>
    </header>
  )
}
