
import "./About.css"

export default function About() {
  const aboutus = [
    {
      name: "Maritza Padilla",
      bio: ""
    },
    {
      name: "Andrew Lee",
      bio: ""
    },
    {
      name: "Ann Wang",
      bio: ""
    }
  ];

  return (
    <div className="About">

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
              <div>name</div>
              <p>content</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}