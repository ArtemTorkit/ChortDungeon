const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const checkAuth = async () => {
    const response = await fetch(`${API_URL}/auth/cabage`, {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Auth failed');
    return response.json();
};

export const fetchPreviousChatLog = async (userId, gamePrompt) => {
    const response = await fetch(`${API_URL}/db/chatLog?userId=${userId}&gamePrompt=${encodeURIComponent(gamePrompt)}`, {
        method: 'GET',
    });
    if (!response.ok) throw new Error('Error fetching chat log');
    return response.json();
};

export const createGame = async (prompt, chatLog, userId) => {
    const response = await fetch(`${API_URL}/db/create/game`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gamePrompt: prompt.trimEnd(), chatLog, userId }),
        credentials: 'include'
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error creating game');
    }
    return response.json();
};

export const fetchGPTResponse = async (chatLog) => {
    const response = await fetch(`${API_URL}/openai/gpt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: chatLog }),
    });
    if (!response.ok) throw new Error('GPT request failed');
    return response.json();
};

export const generateImage = async (prompt) => {
    const response = await fetch(`${API_URL}/openai/image`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });
    if (!response.ok) throw new Error('Image generation failed');
    return response.json();
};

export const fetchPreviousGames = async () => {
    const response = await fetch(`${API_URL}/db/games`, {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Error fetching previous games');
    return response.json();
};
