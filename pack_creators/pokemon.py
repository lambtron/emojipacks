import requests
import yaml


emojis = []

for poke_id in range(1, 803):
    response = requests.get(url=f'http://pokeapi.co/api/v2/pokemon-form/{poke_id}/')
    data = response.json()

    name = data['name']
    src = data['sprites']['front_default']

    emojis.append({
        'name': name,
        'src': src,
    })

    print(f'...done with #{poke_id}')



yml = yaml.dump(
    {
        'title': 'pokemon',
        'emojis': emojis,
    },
    default_flow_style=False
    )
print(yml)

with open('./packs/pokemon.yaml', 'w+') as f:
    f.write(yml)
