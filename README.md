# Javascript

## Setup and Installation

Installation of the dependencies

        npm init

To run the Backend run

        node app.js

The Server will be started on http://localhost:3000

## Routing

### Mainpage

Shows the possible abonnements for the customers of the studio

the Mainpage can be reached on http://localhost:3000/abo_page/abo.html

### Loginpage

Shows the Loginpage for the eployees of the fitnessstudio with a possibility to go to the Mainpage

the Loginpage can be reached on http://localhost:3000/ma_login/login.html

### Overviewpage

Shows all customers and handels the routing to manage them

the Overviewpage can be reached on http://localhost:3000/overviewpage/overview.html

### Createpage

Shows a Formfield to create new customerdatas

the Createpage can be reached on http://localhost:3000/create_customer_page/create.html

### Editpage

Shows a Formfield to edit existing customerdatas

the Editpage can be reached on http://localhost:3000/edit_customer_page/edit.html

## API Reference

### Customers

**CREATE** Customer:

        http://localhost:3000/api/newcustomer
        
        {
        "firstName": "",
        "lastName": "",
        "birthDate": "",
        "address": "",
        "telefon": "",
        "eMail": "",
        "subscription": "",
        "subscriptionStart": "",
        "trainer": "",
        "customerCardID": "",
        "appointments": ""
        }
**READ** all Customers:

        http://localhost:3000/api/allcustomer

        Params: none
**READ** specific Customer:

        http://localhost:3000/api/customer/:id

        Params: none
**UPDATE** specific Customer:

        http://localhost:3000/api/updatecustomer/:id

        {
        "firstName": "",
        "lastName": "",
        "birthDate": "",
        "address": "",
        "telefon": "",
        "eMail": "",
        "subscription": "",
        "subscriptionStart": "",
        "trainer": "",
        "customerCardID": "",
        "appointments": ""
        }
**UPDATE** Customer Subscription:

        http://localhost:3000/api/abo/:id

        {
        "subscription": "",
        "subscriptionStart": ""
        }
**UPDATE** Customer CustomerCard:

        http://localhost:3000/api/card/:id

        {
        "customerCardID": "",
        }
**UPDATE** Customer Customer Personal Trainer:

        http://localhost:3000/api/customertrainer/:id

        {
        "trainer": "",
        }
**DELETE** all Customers:

        http://localhost:3000/api/deleteallcustomer

        Params: nome
**DELETE** specific Customer:

        http://localhost:3000/api/deletecustomer/:id

        Params: none

### Trainers

**CREATE** Trainer:

        http://localhost:3000/api/newtrainer

        {
        "firstName": "",
        "lastName": "",
        "course": "",
        "customerID": ""
        }
**READ** all Trainers:

        http://localhost:3000/api/alltrainer
        
        Params: none
**READ** specific Trainer:

        http://localhost:3000/api/trainer/:id

        Params: none
**UPDATE** specific Trainer:

        http://localhost:3000/api/updatetrainer/:id

        {
        "firstName": "",
        "lastName": "",
        "course": "",
        "customerID": ""
        }
**DELETE** all Trainers:

        http://localhost:3000/api/deletealltrainer

        Params: none
**DELETE** specific Trainer:

        http://localhost:3000/api/deletetrainer/:id

        Params: none
