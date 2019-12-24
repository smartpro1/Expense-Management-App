package com.akeni.expenseapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="expense")
public class Expense {
    @Id
 private Long id;
 private Instant date;
 private String description;
 private String location;

 @JsonIgnore
 @ManyToOne
    private User user;

 @ManyToOne
    private Category category;


}
