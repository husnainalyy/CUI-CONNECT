const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen py-10 w-full flex justify-center items-center bg-primary-50 dark:bg-zinc-800 bg-dotted-pattern bg-cover bg-fixed bg-center">
            {children}
        </div>
    )
}

export default Layout