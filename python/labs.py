import json
from datetime import datetime

import requests
from bs4 import BeautifulSoup

import sys

turma = sys.argv[1]
data_atual = datetime.today().strftime('%Y-%m-%d')
response = requests.get(f'https://app.unicesumar.edu.br/presencial/forms/informatica/horario.php?dados={data_atual}%7CN')

if not response.status_code == 200:
    raise Exception('Serviço indisponível ou requisição invalidada.')

soup = BeautifulSoup(response.content, 'html.parser')
labs = soup.find_all(name='td', class_='lab')

aulas_hoje = []
for lab in labs:
    reservas = lab.find_all(name='td')

    for horario, reserva in enumerate(reservas[1:], 1):
        lab_name = reservas[0].text
        reserva_name = reserva.text

        if (not ('Lab'.upper() in lab_name.upper()) or 'Carrinho'.upper() in lab_name.upper()):
            continue

        if turma.upper() in reserva_name.upper():
            table = lab.find_parent(name='table', class_='bloco')
            bloco = table.find(name='tr').text

            aula = {
                'horario': horario,
                'bloco': bloco,
                'laboratorio': lab_name,
                'reserva': reserva_name
            }
            aulas_hoje.append(aula)

print(json.dumps(aulas_hoje, ensure_ascii=False, indent=4, sort_keys=False))