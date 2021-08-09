
import navbar from "../../assets/navbar.png"
import ann from "../../assets/ann.png"
import maritza from "../../assets/maritza.png"
import andrew from "../../assets/andrew.png"
import "./About.css"

export default function About() {
  const aboutus = [
    {
      name: "Maritza Padilla",
      image: maritza,
      bio: "https://github.com/mpadil18"
    },
    {
      name: "Andrew Lee",
      image: andrew,
      bio: "https://github.com/f1rstpr"
    },
    {
      name: "Ann Wang",
      image: ann,
      bio: "https://github.com/awang2330"
    }
  ];

  return (
    <div className="About" style={{backgroundImage: `url(${navbar})`}}>

      <section className="mission">
        <div>Our Mission</div>
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