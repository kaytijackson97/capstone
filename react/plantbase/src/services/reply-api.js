export async function findAllReplies() {
    const response = await fetch("http://localhost:8080/api/reply");

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findRepliesByPost(postId) {
    const response = await fetch(`http://localhost:8080/api/reply/post/${postId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findReplyById(replyId) {
    const response = await fetch(`http://localhost:8080/api/reply/post/${replyId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}