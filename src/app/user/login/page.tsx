"use client"

import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      const jsonData = await response.json()
      localStorage.setItem("token", jsonData.token)
      alert(jsonData.message)
    } catch {
      alert("ログイン失敗")
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form action={handleSubmit}>
        <input type="text" name="email" placeholder="メールアドレス" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" name="password" placeholder="パスワード" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">ログイン</button>
      </form>
    </div>
  )
}

export default Login
