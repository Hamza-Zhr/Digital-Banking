package org.sid.ebanking_backend.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.sid.ebanking_backend.dtos.CustomerDTO;
import org.sid.ebanking_backend.entities.BankAccount;
import org.sid.ebanking_backend.entities.Customer;
import org.sid.ebanking_backend.exceptions.CustomerFoundException;
import org.sid.ebanking_backend.services.BankAccountService;
import org.sid.ebanking_backend.services.BankAccountServiceImpl;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class CustomerRestController {
    private BankAccountService bankAccountService;
    @GetMapping("/customers")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<CustomerDTO> customers(){
        return bankAccountService.listCustomer();

    }

    @GetMapping("/customers/search")
    //@PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<CustomerDTO> searchCustomers(@RequestParam(name="keyword",defaultValue = "") String keyword){
        return bankAccountService.searchCustomers("%"+keyword+"%");
    }

    @GetMapping("/customers/{id}")
    //@PreAuthorize("hasAuthority('SCOPE_USER')")
    public CustomerDTO getCustomer(@PathVariable(name= "id") Long customerId) throws CustomerFoundException {
        return bankAccountService.getCustomer(customerId);
    }


    @PostMapping("/customers")
    //@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public CustomerDTO saveCustomer(@RequestBody CustomerDTO customerDTO){
        return bankAccountService.saveCustomer(customerDTO);
    }
    @PutMapping("/customers/{customerId}")
    //@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public CustomerDTO updatCustomer(@PathVariable Long customerId,@RequestBody CustomerDTO customerDTO){
        customerDTO.setId(customerId);
        return bankAccountService.updateCustomer(customerDTO);
    }
    @DeleteMapping("/customers/{id}")
    //@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public void deletCustomer(@PathVariable Long id) throws CustomerFoundException {
        bankAccountService.deletCustomer(id);
    }

    @GetMapping("/customers/{customerId}/accounts")
    //@PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<BankAccount> getAccount(@PathVariable Long customerId){
        return bankAccountService.getAccount(customerId);
    }


}



