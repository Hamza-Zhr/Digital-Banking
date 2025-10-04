package org.sid.ebanking_backend.services;

import org.sid.ebanking_backend.dtos.*;
import org.sid.ebanking_backend.entities.BankAccount;
import org.sid.ebanking_backend.entities.Customer;
import org.sid.ebanking_backend.exceptions.BalanceNotSufficientException;
import org.sid.ebanking_backend.exceptions.BankAccountNotFoundException;
import org.sid.ebanking_backend.exceptions.CustomerFoundException;

import java.util.List;

public interface BankAccountService {
    CustomerDTO saveCustomer (CustomerDTO customer);

    CurrentBankAccountDTO saveCurrentBankAccount(double initialBalance, double overDraft, Long customerID) throws CustomerFoundException;
    SavingBankAccountDTO saveSavingBankAccount(double initialBalance, double interestRate, Long customerID) throws CustomerFoundException;

    List<CustomerDTO> listCustomer();

    BankAccountDTO getBankAccount(String accountId) throws BankAccountNotFoundException;

    void debit(String accountId, double amount,String description) throws BankAccountNotFoundException, BalanceNotSufficientException;
    void credit(String accountId, double amount,String description) throws BankAccountNotFoundException;

    void transfer(String accountIdSource ,String accountIdDestination,double amount) throws BankAccountNotFoundException, BalanceNotSufficientException;

    List<BankAccountDTO>bankAccountList();

    List<BankAccount> getAccount(Long customerId);


    CustomerDTO getCustomer(Long customerID) throws CustomerFoundException;


    CustomerDTO updateCustomer(CustomerDTO customerDTO);

    void deletCustomer(Long customerId);

    void deletAccount(String accountId);

    List<CustomerDTO> searchCustomers(String keyword);
    List<AccountOperationDTO> accountHistory(String accountId);
    AccountHistoryDTO getAccountHistory(String accountId,int page,int size)throws BankAccountNotFoundException;


    void addRoleToUser(String username ,String roleName);

}
