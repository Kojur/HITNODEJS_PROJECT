import unittest
import requests

BASE_URL = 'https://hitnodejsproject-production.up.railway.app/api'  # Change the port and path if needed

class TestAPIs(unittest.TestCase):

    def test_api_1_team_list(self):
        response = requests.get(f'{BASE_URL}/about')
        self.assertEqual(response.status_code, 200)
        expected_team = [
            {"first_name": "Nir", "last_name": "Haroush"},
            {"first_name": "Dor", "last_name": "Mitnik"}
        ]
        self.assertEqual(response.json(), expected_team)

    def test_api_2_add_cost(self):
        payload = {
            "category": "Food",
            "sum": 50,
            "userid": 123123,
            "description":"malawah"
        }
        response = requests.post(f'{BASE_URL}/add', json=payload)
        self.assertEqual(response.status_code, 201)
        self.assertIn('category', response.json())
        self.assertEqual(response.json()['category'], 'food')

    def test_api_2_add_cost_fail(self):
        payload = {
            "category": "HelthCare",
            "sum": 125,
            "userid": 123123,
            "description": "inhaler"
        }
        response = requests.post(f'{BASE_URL}/add', json=payload)
        self.assertEqual(response.status_code, 400)

    def test_api_3_cost_report(self):
        params = {
            "id": 123123,
            "year": 2025,
            "month": 2
        }
        response = requests.get(f'{BASE_URL}/report', params=params)
        if response.status_code == 200:
            self.assertIsInstance(response.json(), dict)
        elif response.status_code == 404:
            self.assertEqual(response.status_code, 404)
        else:
            self.fail(f"Unexpected status code: {response.status_code}")

    def test_api_3_cost_report_fail(self):
        params = {
            "id": 111,
            "year": 1998,
            "month": 1
        }
        response = requests.get(f'{BASE_URL}/report', params=params)
        self.assertEqual(response.status_code, 404)

    def test_api_4_get_user(self):
        user_id = 123123
        response = requests.get(f'{BASE_URL}/users/{user_id}')
        if response.status_code == 200:
            self.assertIn('first_name', response.json())
            self.assertIn('last_name', response.json())
        elif response.status_code == 404:
            self.assertIn('User not found', response.json().get('err'))
        else:
            self.fail(f"Unexpected status code: {response.status_code}")

    def test_api_4_get_user_fail(self):
        user_id = 99999
        response = requests.get(f'{BASE_URL}/users/{user_id}')
        self.assertEqual(response.status_code, 404)
        self.assertIn('User not found', response.json().get('err'))

if __name__ == '__main__':
    unittest.main()
