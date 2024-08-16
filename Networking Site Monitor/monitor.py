import requests

def check_website_status(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return "Up"
        else:
            return f"Down (Status Code: {response.status_code})"
    except requests.exceptions.RequestException as e:
        return f"Down (Error: {e})"

urls = [
    "https://www.google.com",
    "https://www.github.com",
    "https://www.nonexistentwebsite.com"
]

for url in urls:
    status = check_website_status(url)
    print(f"Website: {url} is {status}")
