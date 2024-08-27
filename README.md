# Chort Dungeon

**Chort Dungeon** is an interactive text-based adventure game where you, the player, decide your character's fate and setting, while an AI guides you through a world of infinite possibilities. Unleash your imagination and explore a dungeon filled with unpredictable encounters and adventures!

![5271689932408215251](https://github.com/user-attachments/assets/ec203827-deca-4e2d-99a7-b8d4d0fd94e4)


## Features

- Choose your own character and setting
- Dynamic storytelling driven by AI
- Endless possibilities and unique scenarios every time you play
- Text-based gameplay that focuses on imagination and creativity

## Getting Started

To set up and run **Chort Dungeon**, follow the steps below:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [MongoDB](https://www.mongodb.com/) database for storing game data
- OpenAI API Key for AI-driven content generation

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/chort-dungeon.git
    cd chort-dungeon
    ```

2. **Set up the client:**

    Navigate to the `client` directory and install the necessary dependencies:

    ```bash
    cd client
    npm install
    ```

    Start the client:

    ```bash
    npm start
    ```

3. **Set up the server:**

    Navigate to the `server` directory and install the required dependencies:

    ```bash
    cd ../server
    npm install
    ```

4. **Configure environment variables:**

    Create a `.env` file in the `server` directory with the following variables:

    ```bash
    OPENAI_API_KEY=your_openai_api_key_here
    MONGODB_URI=your_mongodb_uri_here
    ```

    Make sure to replace `your_openai_api_key_here` with your actual OpenAI API key and `your_mongodb_uri_here` with your MongoDB connection URI.

5. **Run the server:**

    Start the server using nodemon:

    ```bash
    nodemon index.js
    ```

### Play the Game

Once both the client and server are running, open your browser and navigate to `http://localhost:3000` to start your adventure in **Chort Dungeon**. Let your imagination run wild and enjoy the game!

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenAI](https://openai.com/) for their powerful AI API
- [MongoDB](https://www.mongodb.com/) for the database solution

---

Have fun exploring the mysterious world of **Chort Dungeon** and let your creativity guide you through countless adventures!
