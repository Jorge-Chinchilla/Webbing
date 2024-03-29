import "./feed.css"
import Share from "../share/Share";
import Post from "../post/Post";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Feed({username}) {
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async() =>{
            const res = username ? await axios.get("/posts/profile/"+username) : await axios.get("posts/timeline/609bd371f1fe300ad8a483fd");
            console.log(res);
            setPosts(res.data);
        }
        fetchPosts();
    },[username]);
    
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
               {posts.map(p=>(
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}