# SentimentArcs WebApp

## Overview

SentimentArcs WebApp is a Full Stack wrapper for [SentimentArcs Library][SentimentArcs-Library-url]. It implements [SentimentArcs](https://github.com/jon-chun/sentimentarcs_notebooks), a tools that helps domain experts efficiently arbitrate between competing machine learning and AI NLP models to quickly and efficiently identify, analyze and discover latent narratives elements and emotional arcs in text. The Webapp promises to enhance abstraction in workflow, hiding unrelated code from users while still providing a powerful and intuitive UI for using the tool.

## Features

- Complete Full Stack Webapp solution, with a backend database
- Easy to set up locally or on the cloud
- Intuitive UI and Graphs

## Built With

- Frontend
    - [![React][React-logo]][React-url]
    - [![Tailwind][Tailwind-logo]][Tailwind-url]
    - [![ChartJS][ChartJS-logo]][ChartJS-url]
- Backend
    - [![Flask][Flask-logo]][Flask-url]
    - [![SQLite][SQLite-logo]][SQLite-url]

## Getting Started

### Prerequisites

- [Sentiment Arcs Library][SentimentArcs-Library-url]
- Python and pip (to install dependencies and run the server)
- Node.js and NPM (Only required for development)

### Installation

1. Clone the repo 
    ```sh
    git clone https://github.com/DevAkre/SentimentArcs_WebApp
    ```
2. (Optional, recommended) Create a virtual environment and install dependencies
    ```sh
    cd SentimentArcs_WebApp
    python -m venv venv
    source venv/bin/activate
    ```
3. Install dependencies
    ```sh
    pip install -r server/requirements.txt
    ```
5. Run the server
    ```sh
    python server/server.py
    ```
[!WARNING]  
The Flask server uses a developmental WSGI server, which is not recommended for production. For production, use a production server such as [Gunicorn](https://gunicorn.org/). Detailed instructions to follow in the future.

### Build the React app yourself

    npm --prefix client install
    npm --prefix client run build

### Usage

Here's a sample use case, where you want to run sentiment analysis on Pride and Prejudice.

1. Download the book from [Project Gutenberg](https://www.gutenberg.org/ebooks/1342) as plain text.
2. Remove the gutenberg header and footer from the text file, leaving only the core text. Don't worry about cleaning the text, the app should that that automatically later.
3. Login to the app and upload the text file.
4. Select cleaning parameters to automatically clean the text. Check if the cleaned text looks good.
5. Run models on the text, you can run multiple models in parallel.
[!WARNING]
The models may take a while to run, depending on the size of the text and the number of models you are running. Larger DNN models may take a long time to run. You may exit the app at any point and come back later to check the results.


## Database Schema

Refer to the [docs](docs/DatabaseSchema.md) for more information.

## Screenshots

Dark mode           |  Light mode
:-------------------------:|:-------------------------:
![Screenshot 1](docs/images/Screenshot1.png)  |  ![Screenshot 1 - light](docs/images/Screenshot1_light.png)

![Screenshot 2](docs/images/Screenshot2.png)
![Screenshot 3](docs/images/Screenshot3.png)

HTML graphs (ChartJS)           |  SVG graphs
:-------------------------:|:-------------------------:
![Screenshot 4-1](docs/images/Screenshot4-1.png )  |  ![Screenshot 4-2](docs/images/Screenshot4-2.png)


## Contributing

To contribute, simply fork the repo and create a pull request. For major changes, please open an issue first to discuss what you would like to change. Contact Dev if you have interest in collaborating on this project.

## License

MIT License © 2023

<!-- All links and URLs -->

[React-logo]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org/
[Tailwind-logo]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[ChartJS-logo]: https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white
[ChartJS-url]: https://www.chartjs.org/
[Flask-logo]: https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/2.0.x/
[SQLite-logo]:https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://www.sqlite.org/index.html

[SentimentArcs-Library-url]: https://github.com/afelleson/SentimentArcsPackage