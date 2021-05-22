package learn.plantbase.data;

import learn.plantbase.models.Post;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PostRepository {
    List<Post> findAll();

    List<Post> findByUsername(String username);

    List<Post> findByPlantId(int plantId);

    Post findById(int postId);

    Post addPost(Post post);

    boolean editPost(Post post);

    @Transactional
    boolean deletePost(int postId);
}
