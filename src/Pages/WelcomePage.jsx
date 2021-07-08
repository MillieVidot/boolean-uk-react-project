import PersonalDetailsForm from "../Components/PersonalDetailsForm"

import logo from "../images/logo.svg"
export default function WelcomePage({ handleSubmit }) {
  return (
    <div>
      <img className="logo" src={logo} />
      <h1> Welcome to Faster </h1>
      <p>Tell us about yourself to begin</p>
      <PersonalDetailsForm handleSubmit={handleSubmit} />
    </div>
  )
}
