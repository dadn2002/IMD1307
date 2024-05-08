import json


class FoodStore:
    def __init__(self, id, nicho, list_produtos, horario, localizacao):
        self.id = id
        self.nicho = nicho
        self.list_produtos = list_produtos
        self.horario = horario
        self.localizacao = localizacao

class Product:
    def __init__(self, name, price, imagelink, descricao):
        self.name = name
        self.price = price
        self.imagelink = imagelink
        self.descricao = descricao

# Check if the file exists
try:
    with open('foodData.json', 'r') as file:
        # Try to load existing data
        try:
            existing_data = json.load(file)
        except json.decoder.JSONDecodeError:
            # Handle the case where the file is empty or contains invalid JSON
            existing_data = []
except FileNotFoundError:
    # If the file doesn't exist, create it with an empty list
    existing_data = []

# First FoodStore:
new_food_store = FoodStore(
    "1",
    "japones",
    [
        {"name": "Sushi 8 unidades", "price": 10.00, "imagelink": "https://example.com/image1.jpg", "descricao": "Em bandejas"},
        {"name": "Bau 4 unidades", "price": 10.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
        {"name": "Gioza 5 unidades", "price": 10.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"}
    ],
    {
        "Monday": "11:30:00-18:00:00",
        "Tuesday": "11:30:00-18:00:00",
        "Wednesday": "11:30:00-18:00:00",
        "Thursday": "11:30:00-13:00:00",
        "Friday": "11:30:00-18:00:00"
    },
    {"x": 0, "y": 0}
)

# Check if the new food store already exists in the data
is_duplicate = any(
    food_store['id'] == new_food_store.id for food_store in existing_data
)

# If it's not a duplicate, add it to the existing data
if not is_duplicate:
    existing_data.append(new_food_store.__dict__)

# Write the updated JSON data back to the file
with open('foodData.json', 'w') as file:
    json.dump(existing_data, file, indent=4)
