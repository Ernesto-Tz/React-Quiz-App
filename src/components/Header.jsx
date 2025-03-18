import React from 'react'
import logoId from '../assets/quiz-logo.png'

export default function Header() {
  return (
    <header>
      <img src={logoId} alt="Logo" />
      <h1>React Quiz</h1>
    </header>
  )
}
