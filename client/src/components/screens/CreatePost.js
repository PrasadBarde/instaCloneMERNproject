import { React, useState,useEffect} from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(()=>{
    if(url){
    fetch("/createpost",{
      method: "post",
      headers: {
        "content-type": "application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        title,
        body,
        pic: url
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#d50000 red accent-4" });
          return;
        } else {
          M.toast({
            html: "created post sucessfully",
            classes: "#43a047 green darken-1",
          });
          navigate("/");
          return;
        }
      })
      .catch((err) => console.log(err));
    }
  },[url]);

  const postDetails = () => {
    const data = new FormData(); //it is use for uploading images
    data.append("file", image);
    //cloudinary details
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dgey8kugz");
    fetch("https://api.cloudinary.com/v1_1/dgey8kugz/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });

    
  };

  return (
    <div className="card input-field auth-card" style={{ marginTop: "80px" }}>
      <input
        type="text"
        placeholder="Location"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn grey lighten-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light  blue accent-3"
        onClick={() => postDetails()}
      >
        Submit Post
      </button>
    </div>
  );
}

export default CreatePost;
