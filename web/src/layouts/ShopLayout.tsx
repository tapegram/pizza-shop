import { Toaster } from '@redwoodjs/web/toast'

import Navbar from 'src/components/Navbar/Navbar'

type LayoutProps = {
  buttonLabel?: string
  buttonTo?: string
  children: React.ReactNode
}

const ShopLayout = ({ buttonLabel, buttonTo, children }: LayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <main className="rw-main">
        <Navbar buttonLabel={buttonLabel} buttonTo={buttonTo}></Navbar>
        {children}
      </main>
    </div>
  )
}

export default ShopLayout
