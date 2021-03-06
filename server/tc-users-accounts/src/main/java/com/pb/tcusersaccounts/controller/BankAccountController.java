package com.pb.tcusersaccounts.controller;

import com.pb.tcusersaccounts.model.BankAccount;
import com.pb.tcusersaccounts.repositories.BankAccountRepository;
import com.pb.tcusersaccounts.services.BankAccountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@AllArgsConstructor
@RequestMapping("/bankAccounts")
public class BankAccountController {

    final BankAccountService bankAccountService;

    @GetMapping
    public Flux<BankAccount> getBankAccounts() {
        return this.bankAccountService.findAll();
    }
}
