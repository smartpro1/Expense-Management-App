package com.akeni.expenseapp.controller;

import com.akeni.expenseapp.model.Category;
import com.akeni.expenseapp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private CategoryRepository categoryRepo;

    @Autowired
    public CategoryController(CategoryRepository categoryRepo){
        this.categoryRepo= categoryRepo;
    }

    @GetMapping("/categories")
    public ResponseController<List<Category>> getAllCategories(){
        List<Category> categories = categoryRepo.findAll();
        return new ResponseController<>(HttpStatus.OK, "categories retrieved", categories);
    }

    @GetMapping("/category/{id}")
    public ResponseController<Optional<Category>> getCategoryById(@PathVariable("id") Long id){
        Optional<Category> category = categoryRepo.findById(id);
        return new ResponseController<>(HttpStatus.OK, "category retrieved", category);
    }

    @PostMapping("/category")
    public ResponseController<Category> createCategory(@Valid @RequestBody Category category){
        categoryRepo.save(category);
        return new ResponseController<>(HttpStatus.OK, "category created", category);
    }

    @PutMapping(value="/category", consumes={"application/json"})
    public ResponseController<Category> updateCategory(@RequestBody Category category){
        Category updateCategory = categoryRepo.save(category);
        return new ResponseController<>(HttpStatus.OK, "category updated", updateCategory);
    }

    @DeleteMapping("/category/{id}")
    public ResponseController<Optional<Category>> deleteCategoryById(@PathVariable("id") Long id){
           Optional<Category> deleteCategory = categoryRepo.findById(id);
           categoryRepo.deleteById(id);
        return new ResponseController<>(HttpStatus.OK, "category deleted", deleteCategory);
    }

}
