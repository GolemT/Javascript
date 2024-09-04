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

        Params: firstName, lastName, birthDate, address,
        telefon, eMail, gender, bankDetails, subscription,
        subscriptionStart, trainerID, customerCardID, appointments
**READ** all Customers:

        http://localhost:3000/api/allcustomer

        Params: none
**READ** specific Customer:

        http://localhost:3000/api/customer/:id

        Params: none
**UPDATE** specific Customer:

        http://localhost:3000/api/updatecustomer/:id

        Params: firstName, lastName, birthDate, address,
        telefon, eMail, gender, bankDetails, subscription,
        subscriptionStart, trainerID, customerCardID, appointments
**UPDATE** Customer Subscription:

        http://localhost:3000/api/abo/:id

        Params: subscription, subscriptionStart
**DELETE** all Customers:

        http://localhost:3000/api/deleteallcustomer

        Params: nome
**DELETE** specific Customer:

        http://localhost:3000/api/deletecustomer/:id

        Params: none

### Trainers

**CREATE** Trainer:

        http://localhost:3000/api/newtrainer

        Params: firstName, lastName, course,
        customerID, trainerID
**READ** all Trainers:

        http://localhost:3000/api/alltrainer
        
        Params: none
**READ** specific Trainer:

        http://localhost:3000/api/trainer/:id

        Params: none
**UPDATE** specific Trainer:

        http://localhost:3000/api/updatetrainer/:id

        Params: none
**DELETE** all Trainers:

        http://localhost:3000/api/deletealltrainer

        Params: none
**DELETE** specific Trainer:

        http://localhost:3000/api/deletetrainer/:id

        Params: none
