import Post from './Post';

function PostList({posts, plants, deletePostByPostId, editPostByPostId}) {
    return (
        
        <div>
            {posts.map(p => ( <Post key={p.postId} 
            post={p}
            plants={plants} 
            username={p.username} 
            deletePostByPostId={deletePostByPostId}
            editPostByPostId={editPostByPostId}
            />))}
        </div>
    );
}

export default PostList;