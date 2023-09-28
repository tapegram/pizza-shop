import { Disclosure } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { Link, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const navItemActiveClasses =
  'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900'
const navItemInactiveClasses =
  'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'

const navItems = [
  { name: 'Orders', onClick: () => routes.orders() },
  { name: 'Toppings', onClick: () => routes.pizzaToppings() },
  { name: 'Sizes', onClick: () => routes.pizzaSizes() },
  { name: 'Types', onClick: () => routes.pizzaTypes() },
]

const NavItem = ({ isActive, name, onClick }) => (
  <Link
    to={onClick()}
    className={isActive ? navItemActiveClasses : navItemInactiveClasses}
  >
    {name}
  </Link>
)

const NavItemButton = ({ isActive, name, onClick }) => (
  <Link
    to={onClick()}
    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
  >
    {name}
  </Link>
)

type Props = {
  buttonLabel?: string
  buttonTo?: string
}
const Navbar = ({ buttonLabel, buttonTo }: Props) => {
  const { logOut } = useAuth()
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://www.svgrepo.com/show/107390/pizza.svg"
                    alt="Pizza Shop"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {navItems.map((item) => (
                    <NavItem
                      key={item.name}
                      isActive={false}
                      name={item.name}
                      onClick={item.onClick}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                {buttonTo && buttonLabel && (
                  <div className="flex-shrink-0">
                    <Link
                      to={routes[buttonTo]()}
                      className="rw-button relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <PlusIcon
                        className="-ml-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                      {buttonLabel}
                    </Link>
                  </div>
                )}
                <a
                  className="block cursor-pointer border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                  onClick={() => logOut()}
                >
                  Log Out
                </a>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navItems.map((item) => (
                <NavItemButton
                  key={item.name}
                  isActive={false}
                  name={item.name}
                  onClick={item.onClick}
                />
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
