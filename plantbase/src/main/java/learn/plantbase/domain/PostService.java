package learn.plantbase.domain;

import learn.plantbase.data.GardenRepository;
import learn.plantbase.data.PlantRepository;
import learn.plantbase.data.PostRepository;
import learn.plantbase.data.PlanterRepository;
import learn.plantbase.models.Garden;
import learn.plantbase.models.Plant;
import learn.plantbase.models.Post;
import learn.plantbase.models.Planter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PostService {

    private final PostRepository repository;
    private final PlanterRepository planterRepository;
    private final PlantRepository plantRepository;
    private final GardenRepository gardenRepository;

    public PostService(PostRepository repository, PlanterRepository planterRepository, PlantRepository plantRepository, GardenRepository gardenRepository) {
        this.repository = repository;
        this.planterRepository = planterRepository;
        this.plantRepository = plantRepository;
        this.gardenRepository = gardenRepository;
    }

    public List<Post> findAll() {
        return repository.findAll();
    }

    public List<Post> findByUsername(String username) {
        return repository.findByUsername(username);
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
        hasDifferentStrings(result, originalPost.getUsername(), post.getUsername(), "Cannot change planter.");
        hasDifferentIds(result, originalPost.getPlantId(), post.getPlantId(), "Cannot change plant.");
        hasDifferentIds(result, originalPost.getGardenId(), post.getGardenId(), "Cannot change garden.");

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

        List<Planter> planters = planterRepository.findAll();
        boolean planterExists = planters.stream()
                .anyMatch(i -> i.getUsername() == post.getUsername());

        if (!planterExists) {
            result.addMessage("Invalid planter id", ResultType.INVALID);
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

    private Result<Post> hasDifferentStrings(Result<Post> result, String originalString, String newString, String error) {
        if (originalString != newString) {
            result.addMessage(error, ResultType.INVALID);
        }
        return result;
    }
}
