import { Link } from "react-router-dom"
import "./Footer.css"

export default function Footer() {
  return (
    <div className="Footer">
      <Link to="/about">about</Link>
      <Link to="/contact">contact</Link>
    </div>
  )
}