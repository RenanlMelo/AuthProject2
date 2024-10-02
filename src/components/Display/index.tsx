import { useEffect, useState } from "react";
import { useContextLogin } from "../../contexts/AuthLogin"
import { useNavigate } from 'react-router-dom'

export const Display = () => {
  const [loading, setLoading] = useState(true)

  const context = useContextLogin();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshtoken")
    navigate("/")
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
      if (!token) {
        alert("Você precisa fazer login primeiro!");
        navigate("/");
      }
      else {
        setLoading(false)
      }

  }, [context.signedIn, navigate]);

  return (
    <>
      {loading ? (<div className="text-white text-3xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">Verificando autenticação...</div>)
        : (
          <div className="flex justify-center items-center flex-col gap-y-4">
            <span className="text-white text-3xl ">
              Email do usuário: {context.user?.email}
            </span>
            <button onClick={handleLogOut} className="text-white text-base border border-white px-4 py-2">Log Out</button>
          </div>

        )}
    </>
  )
}
