import React from 'react';
import { render } from '@testing-library/react';
import Post from '../components/post/Post';

test("should load all of posts information", () => {
    const post = {
        postId: 1,
        username: "test username",
        plantId: 1,
        gardenId: 1,
        caption: "test caption",
        photo: "test.png",
        datetimePosted: "2021-05-18T06:43:18",
        likeCount: 1
    };

    const plant = {
        plantId: 1,
        myGardenId: 1,
        plantDescription: "test description",
        photo: "test_plant.png",
        plantName: "test plant name",
        plantType: "test plant type",
        gotchaDate: "2020-01-01T06:43:18"
    };

    const plants = [plant];

    function deletePostByPostId(postId) {
        const newPosts = [];
        for(const post of posts ) {
            if (post.postId !== postId) {
                newPosts.push(post);
            }
        }

        setPosts(newPosts);
    };

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
    };

    const result = render(<Post post={post} plants={plants} deletePostByPostId={deletePostByPostId} editPostByPostId={editPostByPostId}/>);

    const timePosted = result.getByText("2021-05-18T06:43:18");
    expect(timePosted).toBeInTheDocument();
})