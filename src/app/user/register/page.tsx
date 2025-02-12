"use client"

import { useState } from "react"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
      const jsonData = await response.json()
      alert(jsonData.message)
    } catch {
      alert("登録失敗")
    }
  }

  return (
    <div>
      <h1>ユーザー登録</h1>

      <form action={handleSubmit} method="POST">
        <input type="text" name="name" placeholder="名前" required value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="email" name="email" placeholder="メールアドレス" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" name="password" placeholder="パスワード" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">登録</button>
      </form>
    </div>
  )
}

export default Register
