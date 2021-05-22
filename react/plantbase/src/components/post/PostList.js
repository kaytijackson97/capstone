// import { useState } from "react";
// import { findAllPosts } from "../../services/post-api";
import Post from './Post';

function PostList({posts}) {

    return (
        <div>
            {posts.map(p => ( <Post key={p.postId} 
            postId={p.postId} 
            planterId={p.planterId} 
            plantId={p.plantId}
            gardenId={p.gardenId}
            caption={p.caption}
            photo={p.photo}
            datetimePosted={p.datetimePosted}
            likeCount={p.likeCount}/>))}
        </div>
    );
}

export default PostList;