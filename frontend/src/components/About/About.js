
import navbar from "../../assets/navbar.png"
import profile from "../../assets/tempProfileImg.png"
import "./About.css"

export default function About() {
  const aboutus = [
    {
      name: "Maritza Padilla",
      image: profile,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque efficitur odio, sit amet viverra sem tincidunt id. In in feugiat massa. Ut in consectetur elit, at rutrum velit. Etiam ut ligula odio."
    },
    {
      name: "Andrew Lee",
      image: profile,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque efficitur odio, sit amet viverra sem tincidunt id. In in feugiat massa. Ut in consectetur elit, at rutrum velit. Etiam ut ligula odio."
    },
    {
      name: "Ann Wang",
      image: profile,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque efficitur odio, sit amet viverra sem tincidunt id. In in feugiat massa. Ut in consectetur elit, at rutrum velit. Etiam ut ligula odio."
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
              <div className="about-img">
                <img src={item.image} alt={item.name}></img>
              </div>
              <div>{item.name}</div>
              <p>{item.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}