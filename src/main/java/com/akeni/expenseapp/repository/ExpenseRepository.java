package com.akeni.expenseapp.repository;

import com.akeni.expenseapp.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
