import { Link } from "react-router-dom"
import "./ProfileResults.css"

export default function ProfileResults({ user, profile, allProfiles, profileTerm, setProfileId }) {
  console.log(profileTerm)
  console.log(allProfiles)
  return (
    <div className="ProfileResults">
      <div>Profile Results</div>
      {allProfiles.length > 0 ?
        allProfiles[0]
          .filter((r) => (
            r.first_name.toLowerCase().includes(profileTerm.toLowerCase()) ||
            r.last_name.toLowerCase().includes(profileTerm.toLowerCase()) ||
            r.username.toLowerCase().includes(profileTerm.toLowerCase())
          ))
          
          .map((r) => (
            <Link to={`/profile/${r.id}`} onClick={e => setProfileId(r.id)}>
              <div key={r.id}>{r.first_name} {r.last_name}</div>
            </Link>
          ))

        : null
      }
    </div>
  )
}