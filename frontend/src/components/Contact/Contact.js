import navbar from "../../assets/navbar.png"
import envelope from "../../assets/envelope.png"

import "./Contact.css"

export default function Contact() {
  return (
    <div className="Contact" style={{backgroundImage: `url(${navbar})`}}>
      <div className="contact-img">
        <img src={envelope} alt="Envelope"></img>
      </div>
      <form className="contact-form">
        <div className="section-title">Have Questions?</div>
        <div className="input-name">
          <input
            type="text"
            name="first_name"
            placeholder="first name"
          />
          <input
            type="text"
            name="last_name"
            placeholder="last name"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
          />
        </div>

        <div>
          <input 
            type="text" 
            name="message"
            placeholder="message"
          >
          </input>
        </div>
        <button className="contact-btn">send</button>
      </form>
    </div>
  )
}