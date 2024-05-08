

const fs = require('fs');


class Employee {
    constructor(nicho, list_produtos, horario, localização) {
        this.nicho = nicho;
        this.list_produtos = list_produtos;
        this.horario = horario;
        this.localização = localização;
    }
}

class Product {
    constructor(name, price, imagelink, descrição) {
        this.name = name;
        this.price = price;
        this.imagelink = imagelink;
        this.descrição = descrição;
    }
}

// Example usage:
const employee = new Employee(
    "japones",
    [
        new Product("Sushi 8 unidades", 10.00, "https://example.com/image1.jpg", "Em bandejas"),
        new Product("Bau 4 unidades", 10.00, "https://example.com/image2.jpg", "???"),
        new Product("Gioza 5 unidades", 10.00, "https://example.com/image3.jpg", "???")
    ],
    {
        "Monday": "11:30:00-18:00:00",
        "Tuesday": "11:30:00-18:00:00",
        "Wednesday": "11:30:00-18:00:00",
        "Thursday": "11:30:00-13:00:00",
        "Friday": "11:30:00-18:00:00"
    },
    { "x": 0, "y": 0 }
);
// Create more Employee objects as needed

// Convert the data to JSON format
const jsonData = JSON.stringify(employee, null, 4);

// Write the JSON data to a file
fs.writeFileSync('foodData.json', jsonData);