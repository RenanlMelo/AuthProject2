import { useState } from 'react'
import { useContextRegister } from '../../contexts/AuthRegister'

export const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const context = useContextRegister()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      console.log("Please fill in both fields.");
      return
    }
    
    try {
      setLoading(true)
      await context.AuthRegister(email, password)
    }
    catch (err) {
      setError(
        "Falha ao fazer cadastro. Verifique seu email e senha e tente novamente."
      )
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form className='flex justify-center items-center flex-col border border-white rounded-md p-8 gap-y-4' onSubmit={handleSubmit}>
        <h1 className='text-white text-3xl font-semibold'>Cadastrar</h1>
        <input className='px-4 py-2' type="email" name='email' onChange={(e) => setEmail(e.target.value)} placeholder='example@gmail.com' />
        <input className='px-4 py-2' type="password" name='password' onChange={(e) => setPassword(e.target.value)} placeholder='*****' />
        <button className='px-4 py-2 border-white border rounded-lg text-white' type="submit">{loading ? "Cadastrando" : "Cadastrar"}</button>
        <a href='/' className='px-4 py-2 border-white border rounded-lg text-white' type="submit">Ir para login</a>
      </form>
    </>
  )
}

