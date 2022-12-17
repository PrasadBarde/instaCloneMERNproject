import React, { useState, useEffect, useContext } from "react";
import { FaRocket } from "@react-icons/all-files/fa/FaRocket";
import { FaRegComment } from "@react-icons/all-files/fa/FaRegComment";
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import { UserContext } from "../../App";
function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter(item =>{
          return item._id !== result._id
        })
        setData(newData);
      });
  };

  return (
    <div className="home">
      {[...data].reverse().map((item) => {
        return (
          <div className="card home-card" key={item.id}>
            <h5 style={{ display: "inline-block", marginLeft: "10px" }}>
              {item.postedBy.name}
            </h5>
            <p
              style={{
                display: "inline-block",
                float: "right",
                color: "gray",
                marginRight: "20px",
              }}
            >
              Posted On:{item.Date}
            </p>
            <div>
              <h6
                style={{
                  color: "black",
                  display: "inline-block",
                  marginLeft: "20px",
                }}
              >
                {item.title}
              </h6>

              <BsThreeDots
                style={{
                  display: "inline-block",
                  float: "right",
                  marginRight: "20px",
                  fontSize: "25px",
                }}
              />
            </div>

            <div className="card-image">
              <img src={item.photo} alt="" />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              <h5 style={{ display: "inline-block", marginLeft: "10px" }}>
                <FaRocket />
              </h5>
              <h5 style={{ display: "inline-block", marginLeft: "10px" }}>
                <FaRegComment />
              </h5>

              <h5 style={{ color: "IndianRed" ,display:"inline-block", marginLeft: "8px"}}>
                {item.postedBy._id == state._id && (
                  <i className="material-icons" onClick={()=>deletePost(item._id)}>
                    delete
                  </i>
                )}
              </h5>

              <h5
                style={{
                  display: "inline-block",
                  float: "right",
                  color: "blue",
                  marginRight: "20px",
                }}
              >
                {Math.ceil(Math.random() * 100)} likes
              </h5>

              <p>{item.body}</p>
              <input type="text" placeholder="add a comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
