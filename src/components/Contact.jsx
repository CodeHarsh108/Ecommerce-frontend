import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1756134904044-1cf7868cb9de?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay"
            }}
        >
            <div className="bg-white/80 shadow-2xl rounded-3xl p-10 w-full max-w-xl backdrop-blur-md border border-gray-200">
                <h1 className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg">
                    Contact Us
                </h1>
                <p className="text-gray-700 text-center mb-6 text-lg">
                    We would love to hear from you! Please fill out the form below or contact us directly.
                </p>

                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 shadow-sm transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 shadow-sm transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            rows="4"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 shadow-sm transition resize-none"
                        />
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:scale-105 hover:shadow-lg transition duration-300">
                        Send Message
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
                    <div className="flex flex-col items-center space-y-3 mt-2">
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-blue-500 text-xl drop-shadow" />
                            <span className="text-gray-700 font-medium">+91 9589850604</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-purple-500 text-xl drop-shadow" />
                            <span className="text-gray-700 font-medium">itsharshhh6@gmail.com</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaMapMarkedAlt className="text-pink-500 text-xl drop-shadow" />
                            <span className="text-gray-700 font-medium">148 B, Sangam Nagar</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;