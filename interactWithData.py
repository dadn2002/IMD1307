import json


class FoodStore:
    def __init__(self, id, nicho, list_produtos, horario, localizacao, descricao):
        self.id = id
        self.nicho = nicho
        self.list_produtos = list_produtos
        self.horario = horario
        self.localizacao = localizacao
        self.descricao = descricao

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
new_food_store_1 = FoodStore(
    "1",
    "japones1",
    [
        {"name": "Sushi 8 unidades", "price": 10.00, "imagelink": "https://example.com/image1.jpg", "descricao": "Em bandejas"},
        {"name": "Bau 4 unidades"  , "price": 10.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
        {"name": "Gioza 5 unidades", "price": 10.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"}
    ],
    {
        "Monday"   : "11:30:00-18:00:00",
        "Tuesday"  : "11:30:00-18:00:00",
        "Wednesday": "11:30:00-18:00:00",
        "Thursday" : "11:30:00-13:00:00",
        "Friday"   : "11:30:00-18:00:00"
    },
    {"x": 365, "y": 125},
    "Térreo do IMD, descida das escadas"
)
new_food_store_2 = FoodStore(
    "2",
    "marmitas2",
    [
        {"name": "Marmita Menor", "price": 11.00, "imagelink": "https://example.com/image1.jpg", "descricao": "???"},
        {"name": "Marmita Maior", "price": 15.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"}
    ],
    {
        "Monday"   : "11:30:00-13:00:00",
        "Tuesday"  : "11:30:00-13:00:00",
        "Wednesday": "11:30:00-13:00:00",
        "Thursday" : "11:30:00-13:00:00",
        "Friday"   : "11:30:00-13:00:00",
    },
    {"x": 369, "y": 132},
    "Térreo do IMD, descida das escadas"
)
new_food_store_3 = FoodStore(
    "3",
    "Delicias de bento",
    [
        {"name": "Almoço" , "price": 12.00, "imagelink": "https://example.com/image2.jpg", "descricao": "São as marmitas porém consumidas no local"},
        {"name": "Marmita", "price": 12.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"}
    ],
    {
        "Monday"   : "07:00:00-17:00:00",
        "Tuesday"  : "07:00:00-17:00:00",
        "Wednesday": "07:00:00-17:00:00",
        "Thursday" : "07:00:00-17:00:00",
        "Friday"   : "07:00:00-17:00:00",
    },
    {"x": 63.5, "y": 28.5},
    "Centro de convivências, Loja Nº ???"
)
new_food_store_4 = FoodStore(
    "4",
    "Lanches/Salgados",
    [
        {"name": "Salgados Fritos"       , "price": 4.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
        {"name": "Tapiocas Simples"      , "price": 3.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
        {"name": "Tapiocas com Recheio"  , "price": 7.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
        {"name": "Tapiocas Recheio Duplo", "price": 8.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
        {"name": "Sucos na água"         , "price": 3.00, "imagelink": "https://example.com/image2.jpg", "descricao": "na faixa 3.00 a 5.00 reais"},
        {"name": "Sucos no leite"        , "price": 6.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
        {"name": "Vitaminas"             , "price": 5.00, "imagelink": "https://example.com/image2.jpg", "descricao": "na faixa 5.00 a 6.00 reais"},
        {"name": "Salada de Frutas"      , "price": 6.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
        {"name": "Pudim"                 , "price": 6.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
        {"name": "Coco"                  , "price": 3.50, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
        {"name": "Picole"                , "price": 2.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
    ],
    {
        "Monday"   : "07:00:00-14:00:00",
        "Tuesday"  : "07:00:00-14:00:00",
        "Wednesday": "07:00:00-14:00:00",
        "Thursday" : "07:00:00-14:00:00",
        "Friday"   : "07:00:00-14:00:00",
    },
    {"x": 63, "y": 28.75},
    "Centro de convivências, Loja Nº 36"
)
new_food_store_5 = FoodStore(
    "5",
    "Delicias da gracinha",
    [
        {"name": "Açai copo pequeno" , "price": 5.00 , "imagelink": "https://example.com/image2.jpg", "descricao": "Acrescimos gratuitos: Nescau, Granola, Amendoin, Leite em po, Leite condensado, MMs, Chocoball, Coco ralado"},
        {"name": "Açai copo grande"  , "price": 10.00, "imagelink": "https://example.com/image2.jpg", "descricao": "Acrescimos gratuitos: Nescau, Granola, Amendoin, Leite em po, Leite condensado, MMs, Chocoball, Coco ralado"}
    ],
    {
        "Monday"   : "08:00:00-15:00:00",
        "Tuesday"  : "08:00:00-15:00:00",
        "Wednesday": "08:00:00-15:00:00",
        "Thursday" : "08:00:00-15:00:00",
        "Friday"   : "08:00:00-15:00:00",
    },
    {"x": 62.5, "y": 29},
    "Centro de convivências, Loja Nº 37"
)
new_food_store_6 = FoodStore(
    "6",
    "Açai guimel",
    [
        {"name": "Marmita"       , "price": 10.00, "imagelink": "https://example.com/image1.jpg", "descricao": "10.00 ou 13.00 reais"},
        {"name": "Salgados"      , "price": 4.00 , "imagelink": "https://example.com/image2.jpg", "descricao": "na faixa 4.00 a 6.00 reais"},
        {"name": "Açai 150ml"    , "price": 6.00 , "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Açai 300ml"    , "price": 10.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Açai 500ml"    , "price": 14.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Doces gourmet" , "price": 3.00 , "imagelink": "https://example.com/image3.jpg", "descricao": "na faixa 3.00 em diante"},
        {"name": "Bolos variados", "price": 4.00 , "imagelink": "https://example.com/image3.jpg", "descricao": "na faixa 4.00 em diante, tipos: gourmet, moça, doce, brigadeiro, chocolate, cenoura"},
        {"name": "Tortas doces"  , "price": 6.50 , "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Cuscuz"        , "price": 0.00 , "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Tapioca"       , "price": 0.00 , "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Refrigerantes" , "price": 0.00 , "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Sucos de polpa", "price": 0.00 , "imagelink": "https://example.com/image3.jpg", "descricao": "???"}
    ],
    {
        "Monday"   : "07:30:00-19:00:00",
        "Tuesday"  : "07:30:00-19:00:00",
        "Wednesday": "07:30:00-19:00:00",
        "Thursday" : "07:30:00-19:00:00",
        "Friday"   : "07:30:00-19:00:00"
    },
    {"x": 62.75, "y": 30.25},
    "Centro de convivências, Loja Nº 05"
)
new_food_store_7 = FoodStore(
    "7",
    "Cantina CB",
    [
        {"name": "Biscoitos"        , "price": 0.00, "imagelink": "https://example.com/image1.jpg", "descricao": "???"},
        {"name": "Chocolate lollo"  , "price": 0.00, "imagelink": "https://example.com/image2.jpg", "descricao": "???"},
        {"name": "Brownie"          , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Halls"            , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Mentos"           , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Balinhas sortidas", "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Picoles"          , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Cuscuz"           , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Salgados"         , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Bolos diversos"   , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "tipos: cenoura, pudim, doce"},
        {"name": "Coca cola"        , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Agua"             , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Fanta"            , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Nescau Latinha"   , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "H20"              , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Almoço"           , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"},
        {"name": "Bokus"            , "price": 0.00, "imagelink": "https://example.com/image3.jpg", "descricao": "???"}
    ],
    {
        "Monday"   : "07:00:00-21:30:00",
        "Tuesday"  : "07:00:00-21:30:00",
        "Wednesday": "07:00:00-21:30:00",
        "Thursday" : "07:00:00-21:30:00",
        "Friday"   : "07:00:00-21:30:00",
    },
    {"x": 65, "y": 47},
    "Centro de Biociências, lugar central"
)
new_food_store = FoodStore(
    "8",
    "Marcelio lanches",
    [
        {"name": "Salgados diversos", "price": 2.00, "imagelink": "https://example.com/image1.jpg", "descricao": "Na faixa 2.00 a 3.00 reais"}
    ],
    {
        "Monday"   : "07:00:00-19:00:00",
        "Tuesday"  : "07:00:00-19:00:00",
        "Wednesday": "07:00:00-19:00:00",
        "Thursday" : "07:00:00-19:00:00",
        "Friday"   : "07:00:00-19:00:00"
    },
    {"x": 80, "y": 49},
    "Parada setor 3, Foodtruck"
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
