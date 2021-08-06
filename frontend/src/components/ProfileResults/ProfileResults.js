import { Link } from "react-router-dom"

import tempImg from "../../assets/tempProfileImg.png";
import "./ProfileResults.css"

export default function ProfileResults({ user, profile, allProfiles, profileTerm, setProfileId }) {
  console.log(profileTerm)
  console.log(allProfiles)
  return (
    <div className="ProfileResults">
      <div className="section-title">Profile Search Results: {profileTerm}</div>
      {allProfiles.length > 0 ?
        allProfiles[0]
          .filter((r) => (
            r.first_name.toLowerCase().includes(profileTerm.toLowerCase()) ||
            r.last_name.toLowerCase().includes(profileTerm.toLowerCase()) ||
            r.username.toLowerCase().includes(profileTerm.toLowerCase())
          ))
          
          .map((r) => (
            <Link key={r.id} to={`/profile/${r.id}`} onClick={e => setProfileId(r.id)}>
              {allProfiles[1]
                .filter((p) => p.id === r.id)
                .map((p) => (
                  <img src={p.image_url ? p.image_url : tempImg} alt={`${r.first_name} profile img`}></img>
                ))
              } 
              <div>{r.first_name} {r.last_name}</div>
            </Link>
          ))

        : null
      }
    </div>
  )
}