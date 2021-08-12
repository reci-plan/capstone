import { Link } from "react-router-dom"
import linkedinIcon from "../../assets/linkedin.svg"
import "./Footer.css"

export default function Footer() {
  const accounts = [
    {
      name: "AL",
      linkedin: "https://www.linkedin.com/in/andrew-l-2538b0208/"
    },
    {
      name: "MP",
      linkedin: "https://www.linkedin.com/in/maritza-padilla/"
    },
    {
      name: "AW",
      linkedin: "https://www.linkedin.com/in/awang2330/"
    }
  ];
  return (
    <div className="Footer">
      <div>
        {accounts.map((e, i) => (
          <a key={i} href={e.linkedin} className="account-link">
            <img src={linkedinIcon} alt="Linkedin Icon"></img>
            <span>{e.name}</span>
          </a>
        ))}
      </div>
      <div>
        <Link to="/about">about</Link>
        <Link to="/contact">contact</Link>
      </div>
      
    </div>
  )
}