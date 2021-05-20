export async function findAllPosts() {
    const response = await fetch("http://localhost:8080/api/post");

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPostByUserId({userId}) {
    const response = await fetch(`http://localhost:8080/api/post/user/${userId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPostByPlantId({plantId}) {
    const response = await fetch(`http://localhost:8080/api/post/plant/${plantId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPostById({postId}) {
    const response = await fetch(`http://localhost:8080/api/post/${postId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findAllReplies() {
    const response = await fetch("http://localhost:8080/api/reply");

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findRepliesByPost({postId}) {
    const response = await fetch(`http://localhost:8080/api/reply/post/${postId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findReplyById({replyId}) {
    const response = await fetch(`http://localhost:8080/api/reply/post/${replyId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}
