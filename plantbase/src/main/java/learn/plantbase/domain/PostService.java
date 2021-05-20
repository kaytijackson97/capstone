package learn.plantbase.domain;

import learn.plantbase.data.GardenRepository;
import learn.plantbase.data.PlantRepository;
import learn.plantbase.data.PostRepository;
import learn.plantbase.data.UserRepository;
import learn.plantbase.models.Garden;
import learn.plantbase.models.Plant;
import learn.plantbase.models.Post;
import learn.plantbase.models.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PostService {

    private final PostRepository repository;
    private final UserRepository userRepository;
    private final PlantRepository plantRepository;
    private final GardenRepository gardenRepository;

    public PostService(PostRepository repository, UserRepository userRepository, PlantRepository plantRepository, GardenRepository gardenRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.plantRepository = plantRepository;
        this.gardenRepository = gardenRepository;
    }

    public List<Post> findAll() {
        return repository.findAll();
    }

    public List<Post> findByUserId(int userId) {
        return repository.findByUserId(userId);
    }

    public List<Post> findByPlantId(int plantId) {
        return repository.findByPlantId(plantId);
    }

    public Post findById(int postId) {
        return repository.findById(postId);
    }

    public Result<Post> addPost(Post post) {
        Result<Post> result = validatePost(post);
        if (result.getType() != ResultType.SUCCESS) {
            return result;
        }

        if (hasValue(post.getPostId())) {
            result.addMessage("Post id cannot be set", ResultType.INVALID);
            return result;
        }

        if (hasValue(post.getLikeCount())) {
            result.addMessage("Like count cannot be set", ResultType.INVALID);
            return result;
        }

        Post addedPost = repository.addPost(post);
        if (addedPost == null) {
            result.addMessage("Add failed", ResultType.INVALID);
            return result;
        }
        result.setPayload(addedPost);
        return result;
    }

    public Result<Post> editPost(Post post) {
        Result<Post> result = validatePost(post);
        if (result.getType() != ResultType.SUCCESS) {
            return result;
        }

        Post originalPost = repository.findById(post.getPostId());
        hasDifferentIds(result, originalPost.getUserId(), post.getUserId(), "Cannot change user.");
        hasDifferentIds(result, originalPost.getPlantId(), post.getPlantId(), "Cannot change plant.");
        hasDifferentIds(result, originalPost.getGardenId(), post.getGardenId(), "Cannot change garden.");
        hasDifferentIds(result, originalPost.getLikeCount(), post.getLikeCount(), "Cannot change like count.");

        if (!originalPost.getDatetimePosted().equals(post.getDatetimePosted())) {
            result.addMessage("Cannot change datetimePosted.", ResultType.INVALID);
            return result;
        }

        if (result.getType() != ResultType.SUCCESS) {
            return result;
        }

        boolean isSuccessful = repository.editPost(post);
        if (!isSuccessful) {
            result.addMessage("Edit failed.", ResultType.INVALID);
        }
        return result;
    }

    public boolean deleteById(int postId) {
        return repository.deletePost(postId);
    }

    private Result<Post> validatePost(Post post) {
        Result<Post> result = new Result<>();

        if (post == null) {
            result.addMessage("Post cannot be null", ResultType.INVALID);
            return result;
        }

        List<User> users = userRepository.findAll();
        boolean userExists = users.stream()
                .anyMatch(i -> i.getUserId() == post.getUserId());

        if (!userExists) {
            result.addMessage("Invalid user id", ResultType.INVALID);
            return result;
        }

        List<Plant> plants = plantRepository.findAll();
        boolean plantExists = plants.stream()
                .anyMatch(i -> i.getPlantId() == post.getPlantId());

        if (!plantExists) {
            result.addMessage("Invalid plant id", ResultType.INVALID);
            return result;
        }

        List<Garden> gardens = gardenRepository.findAll();
        boolean gardenExists = gardens.stream()
                .anyMatch(i -> i.getGardenId() == post.getGardenId());

        if (!gardenExists) {
            result.addMessage("Invalid garden id", ResultType.INVALID);
            return result;
        }

        if (post.getPhoto() != null) {
            String regex = "([^\\s]+(\\.(?i)(jpe?g|png|img))$)";
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(post.getPhoto());

            if (!matcher.matches()) {
                result.addMessage("Invalid image type", ResultType.INVALID);
            }
        }

        return result;
    }

    private boolean hasValue(int id) {
        return id > 0;
    }

    private Result<Post> hasDifferentIds(Result<Post> result, int originalId, int newId, String error) {
        if (originalId != newId) {
            result.addMessage(error, ResultType.INVALID);
        }
        return result;
    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        PostService that = (PostService) o;
//        return Objects.equals(repository, that.repository) &&
//                Objects.equals(userRepository, that.userRepository) &&
//                Objects.equals(plantRepository, that.plantRepository) &&
//                Objects.equals(gardenRepository, that.gardenRepository);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(repository, userRepository, plantRepository, gardenRepository);
//    }
}
