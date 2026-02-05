import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';


interface Service { 
    id: number;
    title: string;
    description: string; 
}

interface ServiceState { 
    services: Service[];
    selectedService: Service | null;
}

const initialState: ServiceState = {
    services: [
        {
            id: 1,
            title: "General Consultation",
            description: "Schedule a visit with a licensed physician for checkups, minor illnesses, follow-ups, or medical advice. Ideal for non-emergency concerns that require professional evaluation."
        },
        {
            id: 2,
            title: "General Consultation",
            description: "nor illnesses, follow-ups, or medical advice. Ideal for non-emergency concerns that require professional evaluation."
        }
    ],
    selectedService: null,
}

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        selectService: (state, action: PayloadAction<Service>) => { 
            state.selectedService = action.payload;
        }, 
        clearSelection: (state) => {
            state.selectedService = null;
        }
    },
});

export const { selectService, clearSelection } = serviceSlice.actions; 
export default serviceSlice.reducer;