package org.sid.ebanking_backend.repositories;

import org.sid.ebanking_backend.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount,String> {
    List<BankAccount>findByCustomerId(Long customerId);
}
