export async function findAllPosts() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPostByUsername(username) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post/planter/${username}`);

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

export async function deletePostById(postId) {
    const response = await fetch(`http://localhost:8080/api/post/${postId}`, {method: "DELETE"});

    if (response.status !== 204) {
        return Promise.reject("response is not 204 NO_CONTENT");
    }
}

