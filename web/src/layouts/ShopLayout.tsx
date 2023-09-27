import { Toaster } from '@redwoodjs/web/toast'

type LayoutProps = {
  children: React.ReactNode
}

const ShopLayout = ({ children }: LayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ShopLayout
