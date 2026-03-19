export default function DefaultFooter(): JSX.Element {
    const appStatus = import.meta.env.VITE_APP_STATUS;
    const isProduction = appStatus === "Production Mode";

    return (
        <footer className="bg-white shadow dark:bg-gray-800 fixed bottom-0 z-50 w-full backdrop-filter backdrop-blur-md bg-opacity-30">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2026 <a href="" className="hover:underline">Nostalgia™</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                    <li className="ms-4">
                        <span
                            className={`px-2 py-1 rounded text-xs font-bold border ${
                                isProduction
                                    ? "bg-green-100 text-green-700 border-green-400"
                                    : "bg-yellow-100 text-yellow-700 border-yellow-400"
                            }`}
                        >
                            {appStatus}
                        </span>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
