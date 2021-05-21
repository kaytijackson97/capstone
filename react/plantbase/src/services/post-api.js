export async function findAllPosts() {
    const response = await fetch("http://localhost:8080/api/post");

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPostByUserId(userId) {
    const response = await fetch(`http://localhost:8080/api/post/user/${userId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPostByPlantId(plantId) {
    const response = await fetch(`http://localhost:8080/api/post/plant/${plantId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPostById(postId) {
    const response = await fetch(`http://localhost:8080/api/post/${postId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function updatePostById(post, postId) {
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
        };

    const response = await fetch(`http://localhost:8080/api/post/${postId}`, init);

    if (response.status !== 204) {
        return Promise.reject("response is not 204 NO_CONTENT");
    }
<<<<<<< HEAD
=======

    return response.json();
>>>>>>> ca4f7b403898c69b6f816017bc86753954e4a1b2
}