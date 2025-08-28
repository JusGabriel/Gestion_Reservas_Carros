// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="flex flex-col items-center text-center space-y-6 max-w-lg">
        <FaExclamationTriangle className="text-yellow-400 text-7xl animate-bounce" />

        <h1 className="text-4xl font-extrabold">Página no encontrada</h1>

        <p className="text-lg text-gray-300">
          Lo sentimos, la página que intentas visitar no existe o fue movida.  
          Revisa la URL o regresa al inicio.
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg transition transform hover:scale-105"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
