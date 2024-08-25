const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen py-10 w-full flex flex-col justify-center items-center text-black dark:text-white bg-primary-50 dark:bg-zinc-800 bg-dotted-pattern bg-cover bg-fixed bg-center">
            <h1>SignUp with the university email only</h1>
            {children}
        </div>
    )
}

export default Layout
