import fs from 'fs';
import Customers from './customers.js';
import Trainer from './trainers.js'
import { error } from 'console';


export function readAllCustomer(){
    var customerData = fs.readFileSync('backend/data/customers.json', 'utf-8')
    return customerData || error
}

export function readCustomer(customerID){
    var customerData = fs.readFileSync('backend/data/customers.json', 'utf-8')
    var customerArray = JSON.parse(customerData);

    try {

        if (customerArray[customerID]) {
            var customer = customerArray[customerID];
            return customer;
        }

    } catch (e) {
        console.log("Fehler:", e.message);
    }

    return error; 
}

export function writeCustomer(firstName, lastName, birthDate, address, telefon, eMail, gender, bankDetails, subscription, subscriptionStart, trainerID, customerCardID, appointments) {
    let customer = new Customers(
        firstName,
        lastName, 
        birthDate, 
        address, 
        telefon,
        eMail,
        gender, 
        bankDetails, 
        subscription,
        subscriptionStart,
        trainerID, 
        customerCardID, 
        appointments
    )
    let customerArray = [];
    try {
        if (fs.existsSync('backend/data/customers.json')) {
            let rawData = fs.readFileSync('backend/data/customers.json', 'utf-8');
            if (rawData.trim()) {
                customerArray = JSON.parse(rawData);
                if (!Array.isArray(customerArray)) {
                    throw new Error('Ungültiges Format: Erwartetes Array');
                }
            }
        }
    } catch (error) {
        console.error("Fehler beim Lesen oder Parsen der Datei:", error);
        customerArray = [];
    }

    customerArray.push(customer)

    let writedata = JSON.stringify(customerArray, null, 4);
    fs.writeFileSync('backend/data/customers.json', writedata);
}

export function updatecustomer (customerID, firstName, lastName, birthDate, address, telefon, eMail, gender, bankDetails, trainerID, appointments){
    var data = fs.readFileSync('backend/data/customers.json', 'utf-8')
    var customerArray = JSON.parse(data);

    try {
        if (customerArray[customerID]) {
            customerArray[customerID].firstName = firstName;
            customerArray[customerID].lastName = lastName;
            customerArray[customerID].birthDate = birthDate;
            customerArray[customerID].address = address;
            customerArray[customerID].telefon = telefon;
            customerArray[customerID].eMail = eMail;            
            customerArray[customerID].gender = gender;
            customerArray[customerID].bankDetails = bankDetails;
            customerArray[customerID].trainerID = trainerID;
            customerArray[customerID].appointments = appointments;
        }

    } catch (e) {
        console.log("Fehler:", e.message);
        return error; 
    }

    let writedata = JSON.stringify(customerArray, null, 4);
    fs.writeFileSync('backend/data/customers.json', writedata);

}

export function aboManager (customerID, subscription, subscriptionStart){

    var customerData = fs.readFileSync('backend/data/customers.json', 'utf-8')
    var customerArray = JSON.parse(customerData);

    try {
        if (customerArray[customerID]) {
            customerArray[customerID].subscription = subscription
            customerArray[customerID].subscriptionStart = subscriptionStart

        }
    } catch (e) {
        console.log("Fehler:", e.message);
        return error; 
    }

    let writedata = JSON.stringify(customerArray, null, 4);
    fs.writeFileSync('backend/data/customers.json', writedata);

}

export function deleteCustomer(customerID){
    var customerData = fs.readFileSync('backend/data/customers.json', 'utf-8')
    var customerData = JSON.parse(customerData);

    try {
        if (customerData[customerID]) {
            console.log(customerID)

            customerData.splice(customerID, 1)
        }
    } catch (e) {
        console.log("Fehler:", e.message);
        return error; 
    }

    let writedata = JSON.stringify(customerData, null, 4);
    fs.writeFileSync('backend/data/customers.json', writedata);

}


export function deleteAllCustomer() {     
    fs.writeFileSync('backend/data/customers.json', "");
}


//------------------------------------------trainer------------------------------------------

export function readAllTrainer(){
    var trainerData = fs.readFileSync('backend/data/trainers.json', 'utf-8')

    return trainerData || error
}

export function readTrainer(trainerID){
    var trainerData = fs.readFileSync('backend/data/trainers.json', 'utf-8')
    var trainerArray = JSON.parse(trainerData);

    try {

        for(var i = 0; i < trainerArray.length; i++){
            if(trainerArray[i].trainerID == trainerID){
                trainerArray = trainerArray[i];
                return trainerArray;
            };
        };

    } catch (e) {
        console.log("Fehler:", e.message);
    }

    return error; 
}

export function writeTrainer(firstName, lastName, course, customerID) {
    var trainerData = fs.readFileSync('backend/data/trainers.json', 'utf-8')
    var oldTrainerArray = [];
    try{
        oldTrainerArray = JSON.parse(trainerData);
    }catch{

    }
    let trainerID = oldTrainerArray.length;
    let trainer = new Trainer(
        firstName,
        lastName, 
        course,
        customerID,
        trainerID
    )
    let trainerArray = [];
    try {
        if (fs.existsSync('backend/data/trainers.json')) {
            let rawData = fs.readFileSync('backend/data/trainers.json', 'utf-8');
            if (rawData.trim()) {
                trainerArray = JSON.parse(rawData);
                if (!Array.isArray(trainerArray)) {
                    throw new Error('Ungültiges Format: Erwartetes Array');
                }
            }
        }
    } catch (error) {
        console.error("Fehler beim Lesen oder Parsen der Datei:", error);
        trainerArray = [];
    }

    trainerArray.push(trainer)

    let data = JSON.stringify(trainerArray, null, 4);
    fs.writeFileSync('backend/data/trainers.json', data);
}


export function updateTrainer (trainerID, firstName, lastName, course, customerID){
    var trainerData = fs.readFileSync('backend/data/trainers.json', 'utf-8')
    var trainerArray = JSON.parse(trainerData);
    try {
        
        for(var i = 0; i < trainerArray.length; i++){
            if(trainerArray[i].trainerID == trainerID){
                trainerArray[i].firstName = firstName;
                trainerArray[i].lastName = lastName;
                trainerArray[i].course = course;
                trainerArray[i].customerID = customerID;
                break;
            };
        };

    } catch (e) {
        console.log("Fehler:", e.message);
        return error; 
    }

    let writedata = JSON.stringify(trainerArray, null, 4);
    fs.writeFileSync('backend/data/trainers.json', writedata);

}

export function deleteTrainer(trainerID){
    var trainerData = fs.readFileSync('backend/data/trainers.json', 'utf-8')
    var trainerArray = JSON.parse(trainerData);
    var index = 0;
    try {
        for(index = 0; index < trainerArray.length; index++){
            if(trainerArray[index].trainerID == trainerID){
                trainerArray.splice(index, 1);
                let writedata = JSON.stringify(trainerArray, null, 4);
                fs.writeFileSync('backend/data/trainers.json', writedata);
                break;
            };
        };
        if(index >= trainerArray.length){
            throw new Error("Trainer with that ID Not found");
        }
    } catch (e) {
        console.log("Fehler:", e.message);
        throw new Error(e.message);
    };
}


export function deleteAllTrainer() {     
    fs.writeFileSync('backend/data/trainers.json', "");
}
