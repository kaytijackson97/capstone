import { useContext, useEffect, useState } from "react";
import { findAllPosts } from "../../services/post-api";
import PostList from "./PostList";
import AddPost from "./AddPost";
import CurrentUser from "../contexts/CurrentUser";
import { findPlantsByMyGardenId } from "../../services/plant-api";

function PostApp() {
    const [posts, setPosts] = useState([]);
    const [plants, setPlants] = useState([]);
    const auth = useContext(CurrentUser);

    useEffect(() => {
        findAllPosts()
            .then((data) => setPosts(data))
            .catch(console.log)
    }, []);

    useEffect(() => {
        findPlantsByMyGardenId(auth.currentUser.myGarden.myGardenId)
            .then((data) => setPlants(data))
            .catch(console.log)
    }, [auth.currentUser.myGarden.myGardenId]);

    function deletePostByPostId(postId) {
        const newPosts = [];
        for(const post of posts ) {
            if (post.postId !== postId) {
                newPosts.push(post);
            }
        }

        setPosts(newPosts);
    }

    function editPostByPostId(post) {
        const newPosts = [];
        for(const p of posts ) {
            if (p.postId !== post.postId) {
                newPosts.push(p);
            } else {
                newPosts.push(post)
            }
        }

        setPosts(newPosts);
    }

    function addPostToArray(post) {
        const newPosts = [...posts, post];
        setPosts(newPosts);
    }

    return (
        <div>
            <AddPost addPostToArray={addPostToArray} plants={plants}/>
            <PostList posts={posts} plants={plants} deletePostByPostId={deletePostByPostId} editPostByPostId={editPostByPostId} addPostToArray={addPostToArray}/>
            {/* {console.log(plants)} */}
        </div>
    );
}

export default PostApp;