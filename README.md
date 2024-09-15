# Javascript

## Setup and Installation

Installation of the dependencies

        npm init
        npm install express
        npm install uuid

To run the Backend run

        node app.js

The Server will be started on http://localhost:3000

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
