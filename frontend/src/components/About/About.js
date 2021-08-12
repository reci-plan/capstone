
import navbar from "../../assets/navbar.jpg"
import ann from "../../assets/ann.jpg"
import maritza from "../../assets/maritza.jpg"
import andrew from "../../assets/andrew.jpg"
import github from "../../assets/github.svg"
import "./About.css"

export default function About() {
  const aboutus = [
    {
      name: "Andrew Lee",
      image: andrew,
      github: "https://github.com/f1rstpr",
      linkedin: "https://www.linkedin.com/in/andrew-l-2538b0208/",
      bio: ""
    },
    {
      name: "Maritza Padilla",
      image: maritza,
      github: "https://github.com/mpadil18",
      linkedin: "https://www.linkedin.com/in/maritza-padilla/",
      bio: ""
    },
    {
      name: "Ann Wang",
      image: ann,
      github: "https://github.com/awang2330",
      linkedin: "https://www.linkedin.com/in/awang2330/",
      bio: ""
    }
  ];

  return (
    <div className="About" style={{backgroundImage: `url(${navbar})`}}>

      <section className="mission">
        <span>Our Mission</span>
        <a href="https://github.com/reci-plan/capstone">
          <img src={github} alt="Github Icon"></img>
        </a>
        <p>
          We want to provide a place where working people can quickly and easily access inexpensive 
          recipes that align with their needs. They can search for, as well as plan out meals using a random recipe 
          generator specific to their criteria.
        </p>
      </section>

      <section className="aboutus">
        <div>About Us</div>
        <div className="people">
          {aboutus.map((item, i) => (
            <div key={i} className="person">
              <div className="about-img">
                <img src={item.image} alt={item.name}></img>
              </div>
              <div>{item.name}</div>
              <a href={item.bio}>{item.bio}</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}