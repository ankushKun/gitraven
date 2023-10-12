import Navbar from "./navbar"

export default function Page({ children, background }: any) {
    return <main className="min-h-screen sm:px-20 p-5 text-white/90 select-none"
        style={{ backgroundImage: "url('/background.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center" }}>
        <Navbar />
        <main className={`p-5 my-10 rounded-2xl flex flex-col items-center ${background ? "bg-black/30 ring-4 ring-white/20" : ""}`}>
            {children}
        </main>
    </main>
}