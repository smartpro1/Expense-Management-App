package com.akeni.expenseapp.controller;

import com.akeni.expenseapp.model.Category;
import com.akeni.expenseapp.model.Expense;
import com.akeni.expenseapp.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ExpenseController {
    private ExpenseRepository expenseRepo;

    @Autowired
    public ExpenseController(ExpenseRepository expenseRepo){
        this.expenseRepo = expenseRepo;
    }

    @GetMapping("/expenses")
    public ResponseController<List<Expense>> getAllExpenses(){
        List<Expense> expenses = expenseRepo.findAll();
        System.out.println(expenses);
        return new ResponseController<>(HttpStatus.OK, "expenses retrieved", expenses);
    }



    @GetMapping("/expenses/{id}")
    public ResponseController<Optional<Expense>> getExpenseById(@PathVariable("id") Long id){
        Optional<Expense> expense = expenseRepo.findById(id);
        return new ResponseController<>(HttpStatus.OK, "expense retrieved", expense);
    }

    @PostMapping("/expenses")
    public ResponseController<Expense> createExpense(@RequestBody Expense expense){
        expenseRepo.save(expense);
        return new ResponseController<>(HttpStatus.OK, "expense created", expense);
    }

//    @PutMapping(consumes={"application/json"})
//    public ResponseController<Expense> updateExpense(@RequestBody Expense expense){
//        Expense updateExpense = expenseRepo.save(expense);
//        return new ResponseController<>(HttpStatus.OK, "expense updated", updateExpense);
//    }

    @DeleteMapping("/expense/{id}")
    public ResponseController<Optional<Expense>> deleteCategoryById(@PathVariable("id") Long id){
        Optional<Expense> deleteExpense = expenseRepo.findById(id);
        return new ResponseController<>(HttpStatus.OK, "expense deleted", deleteExpense);
    }
}
