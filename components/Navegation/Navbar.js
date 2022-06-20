import {useScreen} from '@/context/ScreenContext';
import {useSession, signIn, signOut} from 'next-auth/react';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import Image from 'next/image';
import {FiUserPlus, FiLogOut} from 'react-icons/fi';
import {useState, useEffect} from 'react';
import {useShare} from '@/context/ShareContext';
import Theme from '@/components/Theme';


export default function Navbar() {
  const {mzLayout} = useScreen();
  const {handleOpen} = useShare();

  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState('unauthenticated');
  const [user, setUser] = useState({
    image: '/develop.png',
    name: 'dev',
    email: 'dev@hotasm.io',
  });
  const handleMenu = () => setMenu(!menu);
  if (process.env.NODE_ENV === 'development') {
  } else {
    const {data: session, status} = useSession();
    if (status === 'authenticated') {
      setUser(session.user);
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = () => {
      if (menu) {
        setMenu(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [menu]);

  return (
    <div
      className={`items-center justify-between h-16 w-full bg-color-5 px-2
      ${!mzLayout ? 'flex' : 'hidden'}`}
    >
      <Link href="/">
        <a className="px-4 py-1.5 rounded hover:bg-light-gray-2 hover:bg-opacity-10">
          <span className="text-white uppercase font-medium tracking-wide">
            hotasm
          </span>
        </a>
      </Link>

      <div className='flex gap-x-4'>
        <Theme />
        {status === 'authenticated' ? (
          <div className="flex items-center gap-4">
            <button
              onClick={handleOpen}
              className="flex items-center text-light-green-2 gap-2 bg-neutral-green-1 px-4 py-1.5 bg-opacity-10 hover:bg-opacity-10 rounded hover:bg-neutral-green-3 focus:ring-neutral-green duration-300"
            >
              <FiUserPlus className="text-lg" />
              <span className="text-base">Invite</span>
            </button>
            <div className="relative">
              <Tippy
                arrow={false}
                content={
                  <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                    {user.name}
                  </span>
                }
              >
                <button
                  onClick={() => {
                    handleMenu();
                  }}
                  className="flex items-center"
                >
                  <div className="w-8 h-8 relative bg-color-5 rounded-full">
                    <Image
                      src={user.image || '/develop.png'}
                      alt="Picture of the author"
                      layout="fill"
                      className="object-contain rounded-full"
                    />
                  </div>
                </button>
              </Tippy>
              {menu && (
                <div className="w-40 flex flex-col gap-3 divide-y divide-neutral-gray-2 divide-opacity-20 bg-color-5 shadow-md bg-blend-hard-light px-2 py-1 absolute top-0 right-0 mt-10 truncate">
                  <div className="flex flex-col text-white opacity-60 truncate">
                    <span className="text-sm">{user.name}</span>
                    <span className="text-xs">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (process.env.NODE_ENV === 'development') {
                        setStatus('unauthenticated');
                        return;
                      }
                      signOut();
                    }}
                    className="flex flex-col"
                  >
                    <div className="w-full mt-2 py-2 text-white opacity-60 hover:opacity-100 hover:bg-neutral-gray-2 hover:bg-opacity-10 rounded px-3 duration-300">
                      <div className="w-full flex items-center gap-2">
                        <FiLogOut className="text-sm" />
                        <span className="text-sm">Logout</span>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                if (process.env.NODE_ENV === 'development') {
                  setStatus('authenticated');
                  return;
                }
                signIn('github');
              }}
              className="flex items-center px-3.5 py-1.5 rounded-lg bg-neutral-blue-2 hover:bg-neutral-blue-3 duration-300 motion-safe:animate-pulse"
            >
              <span className="text-white text-sm capitalize font-medium tracking-wide">
                Login
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
