import { WOMGroupDetails, WOMCompetition, WOMCompetitionDetails } from '../types';

const WOM_API_URL = 'https://api.wiseoldman.net/v2';

const fetchWOM = async <T>(endpoint: string): Promise<T> => {
    // The unreliable CORS proxy has been removed. API calls are now made directly.
    // This assumes the execution environment correctly handles cross-origin requests.
    const response = await fetch(`${WOM_API_URL}${endpoint}`);
    
    if (!response.ok) {
        try {
            const errorBody = await response.json();
            // Use the API's error message if available
            throw new Error(errorBody.message || `API request failed with status: ${response.status}`);
        } catch (e) {
            // Fallback for non-JSON error responses (like network errors, or CORS proxy HTML pages)
            throw new Error(`API request failed with status: ${response.status}. Could not parse error response.`);
        }
    }
    
    return response.json() as Promise<T>;
};

export const getGroupDetails = async (id: number): Promise<WOMGroupDetails> => {
    return fetchWOM<WOMGroupDetails>(`/groups/${id}`);
};

export const getGroupCompetitions = async (id: number): Promise<WOMCompetition[]> => {
    return fetchWOM<WOMCompetition[]>(`/groups/${id}/competitions`);
};

export const getCompetitionDetails = async (id: number): Promise<WOMCompetitionDetails> => {
    return fetchWOM<WOMCompetitionDetails>(`/competitions/${id}`);
};