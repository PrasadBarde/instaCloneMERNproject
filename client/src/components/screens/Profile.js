import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
function Profile() {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.myPost);
      });
  }, []);
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div className="prof-name">
        <div>
          <img
            className="profileImg"
            src="https://th.bing.com/th/id/OIP.PMGRnbXobcwoa9qJ89pbvgHaG5?pid=ImgDet&w=201&h=187&c=7&dpr=1.3"
            alt="profileImage"
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <div className="profDetails">
            <h6>{mypics.length} posts</h6>
            <h6>114 followers</h6>
            <h6> 246 following</h6>
          </div>
        </div>
      </div>

      <div className="userGallery">
        {mypics.map((item) => {
          return (
            <img
              className="item"
              key={item._id}
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
