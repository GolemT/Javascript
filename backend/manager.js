import fs from 'fs';
import Customers from './customers.js';
import { error } from 'console';

var data = fs.readFileSync('backend/data/customers.json', 'utf-8')

export function readAllCustomer(){
    return data || error
}

export function readCustomer(customerID){
    var customers = JSON.parse(data);

    try {

        if (customers[customerID]) {
            var customer = customers[customerID];
            return customer;
        }

    } catch (e) {
        console.log("Fehler:", e.message);
    }

    return error; 
}

export function writeCustomer(firstName, lastName, birthDate, address, gender, bankDetails, subscription, trainerID, customerCardID, appointments) {
    let customer = new Customers(
        firstName,
        lastName, 
        birthDate, 
        address, 
        gender, 
        bankDetails, 
        subscription, 
        trainerID, 
        customerCardID, 
        appointments
    )
    let customers = [];
    try {
        if (fs.existsSync('backend/data/customers.json')) {
            let rawData = fs.readFileSync('backend/data/customers.json', 'utf-8');
            if (rawData.trim()) {
                customers = JSON.parse(rawData);
                if (!Array.isArray(customers)) {
                    throw new Error('Ungültiges Format: Erwartetes Array');
                }
            }
        }
    } catch (error) {
        console.error("Fehler beim Lesen oder Parsen der Datei:", error);
        customers = [];
    }

    customers.push(customer)

    let data = JSON.stringify(customers, null, 4);
    fs.writeFileSync('backend/data/customers.json', data);
}

export function updatecustomer (customerID, firstName, lastName, birthDate, address, gender, bankDetails, subscription, trainerID, customerCardID, appointments){
    let customer = new Customers(
        firstName,
        lastName, 
        birthDate, 
        address, 
        gender, 
        bankDetails, 
        subscription, 
        trainerID, 
        customerCardID, 
        appointments
    )

    var data = fs.readFileSync('backend/data/customers.json', 'utf-8')
    var customers = JSON.parse(data);

    try {
        if (customers[customerID]) {
            customers[customerID] = customer
        }
    } catch (e) {
        console.log("Fehler:", e.message);
        return error; 
    }

    let writedata = JSON.stringify(customers, null, 4);
    fs.writeFileSync('backend/data/customers.json', writedata);

}

export function deleteCustomer(customerID){
    var customers = JSON.parse(data);

    try {
        if (customers[customerID]) {
            console.log(customerID)

            customers.splice(customerID, 1)
        }
    } catch (e) {
        console.log("Fehler:", e.message);
        return error; 
    }

    let writedata = JSON.stringify(customers, null, 4);
    fs.writeFileSync('backend/data/customers.json', writedata);

}


export function deleteAllCustomer() {     
    fs.writeFileSync('backend/data/customers.json', "");
}
