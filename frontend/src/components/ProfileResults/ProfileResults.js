import { Link } from "react-router-dom"

import navbar from "../../assets/navbar.png"
import tempImg from "../../assets/tempProfileImg.png";
import "./ProfileResults.css"

export default function ProfileResults({ user, profile, allProfiles, setProfileId }) {
  return (
    <div className="ProfileResults" style={{backgroundImage: `url(${navbar})`}}>
      <div className="section-title">Profile Search Results: {localStorage.getItem('profile-search-term')}</div>
      <div>
        {allProfiles.length > 0 ?
          allProfiles[0]
            .filter((r) => (
              r.first_name.toLowerCase().includes(localStorage.getItem('profile-search-term').toLowerCase()) ||
              r.last_name.toLowerCase().includes(localStorage.getItem('profile-search-term').toLowerCase()) ||
              r.username.toLowerCase().includes(localStorage.getItem('profile-search-term').toLowerCase())
            ))
            
            .map((r, i) => (
              <Link key={r.id} to={`/profile/${r.id}`} onClick={e => setProfileId(r.id)} className="user">
                <span>{i + 1}. </span>
                {allProfiles[1]
                  .filter((p) => p.id === r.id)
                  .map((p) => (
                    <img src={p.image_url ? p.image_url : tempImg} alt={`${r.first_name} profile img`}></img>
                  ))
                } 
                <span>{r.first_name} {r.last_name}</span>
              </Link>
            ))

          : null
        }
      </div>
    </div>
  )
}