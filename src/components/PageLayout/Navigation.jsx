import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Navbar, Button } from 'react-bootstrap';
import { loginRequest } from '../../authConfig';
import { useEffect, useState } from 'react';
import axios from 'axios';

const navigation = [
   { name: 'Dashboard', href: '/', current: false },
   // { name: 'PriceCompare', href: '#', current: false },
   { name: 'Graph (in dev)', href: '#', current: false },
];

function classNames(...classes) {
   return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
   const { instance } = useMsal();

   const [photo, setPhoto] = useState(
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
   );

   const handleLogoutRedirect = () => {
      instance.logoutRedirect().catch((error) => console.log(error));
   };

   useEffect(() => {
      const fetchProfilePhoto = async () => {
         try {
            const activeAccount = instance.getActiveAccount();

            if (activeAccount) {
               const tokenRequest = {
                  account: activeAccount,
                  scopes: ['ProfilePhoto.Read.All'], // Ensure this is the correct scope
               };

               const responsex = await instance.acquireTokenSilent(tokenRequest);
               const accessToken = responsex.accessToken;

               const response = await axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
                  headers: {
                     Authorization: `Bearer ${accessToken}`,
                     'Content-Type': 'application/json',
                  },
                  responseType: 'blob', // Ensure this is correct
               });

               const imageUrl = URL.createObjectURL(response.data);
               setPhoto(imageUrl);
            }
         } catch (error) {
            console.error('Error fetching profile photo:', error);
         }
      };

      fetchProfilePhoto();
   }, [instance]); // Add instance as a dependency if it changes

   return (
      <Disclosure as="nav" className="bg-gray-800 h-24">
         <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-24 items-center justify-between"> {/* Adjusted height to h-20 */}
               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                     <span className="absolute -inset-0.5" />
                     <span className="sr-only">Open main menu</span>
                     <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                     <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                  </DisclosureButton>
               </div>
               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                     <h3 className="text-white text-xl font-bold">OfficeBrands</h3> {/* Added text color, size, and weight */}
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                     <div className="flex space-x-5">
                        {navigation.map((item) => (
                           <a
                              key={item.name}
                              href={item.href}
                              aria-current={item.current ? 'page' : undefined}
                              className={classNames(
                                 item.current ? 'bg-gray-700 text-white no-underline' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                 'rounded-md px-3 py-2 text-sm font-medium no-underline'
                              )}>
                              {item.name}
                           </a>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                     type="button"
                     className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                     <span className="absolute -inset-1.5" />
                     <span className="sr-only">View notifications</span>
                     <BellIcon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                     <div>
                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                           <span className="absolute -inset-1.5" />
                           <span className="sr-only">Open user menu</span>
                           <img alt="" src={photo} className="h-8 w-8 rounded-full" />
                        </MenuButton>
                     </div>
                     <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                        <MenuItem>
                           <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 no-underline">
                              Your Profile
                           </a>
                        </MenuItem>
                        <MenuItem>
                           <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 no-underline">
                              Settings
                           </a>
                        </MenuItem>
                        <MenuItem>
                           <a
                              href="#"
                              onClick={handleLogoutRedirect}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 no-underline">
                              Sign out
                           </a>
                        </MenuItem>
                     </MenuItems>
                  </Menu>
               </div>
            </div>
         </div>

         <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-5 pb-5 pt-2">
               {navigation.map((item) => (
                  <DisclosureButton
                     key={item.name}
                     as="a"
                     href={item.href}
                     aria-current={item.current ? 'page' : undefined}
                     className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-5 text-base font-medium'
                     )}>
                     {item.name}
                  </DisclosureButton>
               ))}
            </div>
         </DisclosurePanel>
      </Disclosure>
   );
}
