import fs from 'fs';
import Customers from './customers.js';
import Trainer from './trainers.js'
import { error } from 'console';
import { v4 as uuidv4 } from 'uuid';


export function readAllCustomer(){
    var customerData = fs.readFileSync('backend/data/customers.json', 'utf-8')
    return customerData || error
}

export function readCustomer(customerID){
    var customerData = fs.readFileSync('backend/data/customers.json', 'utf-8')
    var customerArray = JSON.parse(customerData);
    var index = 0;
    try {

        for(index = 0; index < customerArray.length; index++){
            if(customerArray[index].customerID == customerID){
                customerArray = customerArray[index];
                return customerArray;
            };
        };
        if(index >= customerArray.length){
            throw new Error("Kunden mit der ID nicht gefunden");
        }
    } catch (e) {
        console.log("Fehler:", e.message);
        throw new Error(e.message);
    }
}

export function writeCustomer(firstName, lastName, birthDate, address, telefon, eMail, gender, bankDetails, subscription, subscriptionStart, trainerID, customerCardID, appointments) {
    let customerID = uuidv4();
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
        appointments,
        customerID
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
    var index = 0;
    try {

        for(index = 0; index < customerArray.length; index++){
            if(customerArray[index].customerID == customerID){
              customerArray[index].firstName = firstName;
                customerArray[index].lastName = lastName;
                customerArray[index].birthDate = birthDate;
                customerArray[index].address = address;
                customerArray[index].telefon = telefon;
                customerArray[index].eMail = eMail;            
                customerArray[index].gender = gender;
                customerArray[index].bankDetails = bankDetails;
                customerArray[index].trainerID = trainerID;
                customerArray[index].appointments = appointments;
                index = 0;
                break;
            }
        }
        if(index >= customerArray.length){
            throw new Error("Kunde mit der ID nicht gefunden");
        }
    } catch (e) {
        console.log("Fehler:", e.message);
        throw new Error(e.message);
    }

    let writedata = JSON.stringify(customerArray, null, 4);
    fs.writeFileSync('backend/data/customers.json', writedata);

}

export function aboManager (customerID, subscription, subscriptionStart){

    var customerData = fs.readFileSync('backend/data/customers.json', 'utf-8')
    var customerArray = JSON.parse(customerData);
    var index = 0;
    try {

        for(index = 0; index < customerArray.length; index ++){
            if (customerArray[index].customerID == customerID) {
                customerArray[index].subscription = subscription;
                customerArray[index].subscriptionStart = subscriptionStart;
                index = 0;
                break;
            }
        }
        if(index >= customerArray.length){
            throw new Error("Kunde mit der ID nicht gefunden");
        }
    } catch (e) {
        console.log("Fehler:", e.message);
        throw new Error(e.message);
    }

    let writedata = JSON.stringify(customerArray, null, 4);
    fs.writeFileSync('backend/data/customers.json', writedata);

}

export function deleteCustomer(customerID){
    var customerData = fs.readFileSync('backend/data/customers.json', 'utf-8')
    var customerArray = JSON.parse(customerData);
    var index = 0;
    try {
        for(index = 0; index < customerArray.length; index++){
            if(customerArray[index].customerID == customerID){
                customerArray.splice(index, 1);
                index = 0;
                break;
            };
        };
        if(index >= customerArray.length){
            throw new Error("Kunden mit der ID nicht gefunden");
        }
    } catch (e) {
        console.log("Fehler:", e.message);
        throw new Error(e.message);
    }
    let writedata = JSON.stringify(customerArray, null, 4);
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
    var index = 0;
    try {

        for(var index = 0; index < trainerArray.length; index++){
            if(trainerArray[index].trainerID == trainerID){
                trainerArray = trainerArray[index];
                return trainerArray;
            }
        }
        if(index >= customerArray.length){
            throw new Error("Trainer mit der ID nicht gefunden");
        }
    } catch (e) {
        console.log("Fehler:", e.message);
        throw new Error(e.message);
    }
}

export function writeTrainer(firstName, lastName, course, customerID) {
    let trainerID = uuidv4();
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
    var index = 0;
    try {
        
        for(index = 0; index < trainerArray.length; index++){
            if(trainerArray[index].trainerID == trainerID){
                trainerArray[index].firstName = firstName;
                trainerArray[index].lastName = lastName;
                trainerArray[index].course = course;
                trainerArray[index].customerID = customerID;
                index = 0;
                break;
            }
        }
        if(index >= trainerArray.length){
            throw new Error("Trainer mit der ID nicht gefunden");
        }
    } catch (e) {
        console.log("Fehler:", e.message);
        throw new Error(e.message);
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
                index = 0;
                break;
            };
        };
        if(index >= trainerArray.length){
            throw new Error("Trainer mit der ID nicht gefunden");
        }
    } catch (e) {
        console.log("Fehler:", e.message);
        throw new Error(e.message);
    };
    let writedata = JSON.stringify(trainerArray, null, 4);
    fs.writeFileSync('backend/data/trainers.json', writedata);
}

export function deleteAllTrainer() {     
    fs.writeFileSync('backend/data/trainers.json', "");
}
