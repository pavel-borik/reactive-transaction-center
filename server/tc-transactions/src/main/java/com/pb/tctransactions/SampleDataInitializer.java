package com.pb.tctransactions;

import com.pb.tctransactions.model.transactions.Transaction;
import com.pb.tctransactions.model.transactions.TransactionPartyAccount;
import com.pb.tctransactions.repositories.TransactionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Log4j2
@Component
@AllArgsConstructor
@Profile("demo")
class SampleDataInitializer implements ApplicationListener<ApplicationReadyEvent> {

    private final TransactionRepository repository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        Transaction t = new Transaction();
        t.setId(UUID.randomUUID().toString());
        t.setAccountId(1234);
        t.setPartyAccount(new TransactionPartyAccount(null, "55554444", "0300"));

        repository
                .deleteAll()
                .thenMany(repository.save(t))
                .thenMany(repository.findAll())
                .subscribe(tr -> log.info("saving " + tr.toString()));
    }
}
