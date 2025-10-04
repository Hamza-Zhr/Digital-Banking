package org.sid.ebanking_backend.web;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sid.ebanking_backend.dtos.*;
import org.sid.ebanking_backend.entities.SavingAccount;
import org.sid.ebanking_backend.exceptions.BalanceNotSufficientException;
import org.sid.ebanking_backend.exceptions.BankAccountNotFoundException;
import org.sid.ebanking_backend.exceptions.CustomerFoundException;
import org.sid.ebanking_backend.services.BankAccountService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@Slf4j
@CrossOrigin("*")
public class BankAccountRestController {
    private BankAccountService bankAccountService;

    public BankAccountRestController(BankAccountService bankAccountService){
        this.bankAccountService=bankAccountService;
    }
    @GetMapping("/account/{accountId}")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
public BankAccountDTO getBankAccount (@PathVariable String accountId) throws BankAccountNotFoundException {
        return bankAccountService.getBankAccount(accountId);
    }
    @GetMapping("/accounts")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<BankAccountDTO> listAccounts(){

        return bankAccountService.bankAccountList();
    }
    @GetMapping("/accounts/{accountId}/operations")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<AccountOperationDTO> getHistory(@PathVariable String accountId){
        return bankAccountService.accountHistory(accountId);
    }
    @GetMapping("/accounts/{accountId}/pageOperations")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public AccountHistoryDTO getAccountHistory(
            @PathVariable String accountId,
            @RequestParam(name="page",defaultValue = "0") int page,
            @RequestParam(name="size",defaultValue = "5")int size) throws BankAccountNotFoundException {
        return bankAccountService.getAccountHistory(accountId,page,size);
    }
    @PostMapping("/accounts/debit")
    public DebitDTO debit(@RequestBody DebitDTO debitDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.debit(debitDTO.getAccountId(),debitDTO.getAmount(),debitDTO.getDescription());
        return debitDTO;
    }
    @PostMapping("/accounts/credit")
    public CreditDTO credit(@RequestBody CreditDTO creditDTO) throws BankAccountNotFoundException {
        this.bankAccountService.credit(creditDTO.getAccountId(),creditDTO.getAmount(),creditDTO.getDescription());
        return creditDTO;
    }
    @PostMapping("/accounts/transfer")
    public void transfer(@RequestBody TransferRequestDTO transferRequestDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.transfer(
                transferRequestDTO.getAccountSource(),
                transferRequestDTO.getAccountDestination(),
                transferRequestDTO.getAmount());
    }

    @PostMapping("/addSavingAccount/{customerId}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public SavingBankAccountDTO SaveSavingBankAccountDTO(@RequestBody SavingBankAccountDTO savingBankAccountDTO,@PathVariable Long customerId) throws CustomerFoundException {
        return bankAccountService.saveSavingBankAccount(savingBankAccountDTO.getBalance(),savingBankAccountDTO.getInterestRate(),customerId);

    }

    @PostMapping("/addCurrentAccount/{customerId}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public CurrentBankAccountDTO SaveCurrentBankAccountDTO(@RequestBody CurrentBankAccountDTO currentBankAccountDTO,@PathVariable Long customerId) throws CustomerFoundException {
        return bankAccountService.saveCurrentBankAccount(currentBankAccountDTO.getBalance(),currentBankAccountDTO.getOverdraft(),customerId);

    }
    @DeleteMapping("/deletAccount/{accountId}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public void deletaccount(@PathVariable String accountId){
        bankAccountService.deletAccount(accountId);
    }


}
