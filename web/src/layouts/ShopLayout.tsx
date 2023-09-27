import { Toaster } from '@redwoodjs/web/toast'

import Navbar from 'src/components/Navbar/Navbar'

type LayoutProps = {
  active: string
  children: React.ReactNode
}

const ShopLayout = ({ active, children }: LayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <main className="rw-main">
        <Navbar active={active}></Navbar>
        {children}
      </main>
    </div>
  )
}

export default ShopLayout
