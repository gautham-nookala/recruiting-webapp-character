# We use dictionaries, and sets for efficient subset checks when comparing book characters to house sworn members.
# The get_house_members function was deemed unnecessary as we fetch all houses in bulk using pagination.
# Possible improvements: Add exception handling, unit tests, and use more Pythonic syntax like list comprehensions where applicable.

import requests


def get_house_names_with_all_characters_from_book(book_num):
    result = []

    book_response = requests.get(
        f"https://anapioficeandfire.com/api/books/{book_num}")
    book_characters = set(book_response.json()['characters'])

    all_houses = get_number_of_houses()

    for house_name, sworn_members in all_houses.items():
        if sworn_members.issubset(book_characters):
            result.append(house_name)

    return result


def get_number_of_houses():
    current_page = 1
    houses = {}

    while True:
        response = requests.get(
            f"https://anapioficeandfire.com/api/houses?page={current_page}&pageSize=50")
        if not response.json():
            break

        for house in response.json():
            houses[house['name']] = set(house.get('swornMembers', []))

        current_page += 1

    return houses
