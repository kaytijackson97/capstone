// import { useState } from "react";
// import { findAllPosts } from "../../services/post-api";
import Post from './Post';

function PostList({posts, deletePostByPostId, editPostByPostId}) {

    return (
        
        <div>
            {posts.map(p => ( <Post key={p.postId} 
            postId={p.postId} 
            username={p.username} 
            plantId={p.plantId}
            gardenId={p.gardenId}
            caption={p.caption}
            photo={p.photo}
            datetimePosted={p.datetimePosted}
            likeCount={p.likeCount}
            deletePostByPostId={deletePostByPostId}
            editPostByPostId={editPostByPostId}
            />))}
        </div>
    );
}

export default PostList;