
import navbar from "../../assets/navbar.png"
import "./About.css"

export default function About() {
  const aboutus = [
    {
      name: "Maritza Padilla",
      image: "",
      bio: "this is maritza"
    },
    {
      name: "Andrew Lee",
      image: "",
      bio: "this is andrew"
    },
    {
      name: "Ann Wang",
      image: "",
      bio: "this is ann"
    }
  ];

  return (
    <div className="About" style={{backgroundImage: `url(${navbar})`}}>

      <section className="mission">
        <div>Our Mission</div>
        <p>
          To provide a place where working people can quickly and easily access inexpensive 
          recipes that align with their needs, as well as plan out meals using a random recipe 
          generator specific to their inputted criteria.
        </p>
      </section>

      <section className="aboutus">
        <div>About Us</div>
        <div className="people">
          {aboutus.map((item, i) => (
            <div key={i} className="person">
              <img src={item.image} alt={item.name}></img>
              <div>{item.name}</div>
              <p>{item.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}