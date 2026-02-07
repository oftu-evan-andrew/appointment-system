import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MASTER_SLOTS } from '../../utils/appointmentHelpers';
import { supabase, type Services } from '../../utils/supabase';

interface ServiceState { 
    services: Services[];
    selectedService: Services | null;
    availableSlots: string[];
    error: string | null;
    loading: boolean
}

const initialState: ServiceState = {
    services: [],
    selectedService: null,
    availableSlots: [...MASTER_SLOTS],
    error: null,
    loading: false,
}

export const fetchServices = createAsyncThunk(
    'blog/fetchBlogs', 
    async (_, { rejectWithValue }) => { 
        try {
            const { data, error } = await supabase
            .from('services')
            .select('*')

            if (error) throw error; 
            return { service: data }
        } catch ( error: any ) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchServicesById = createAsyncThunk(
    'blog/fetchServicesById',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from('services') 
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            return data; 
            
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => 
    builder
        .addCase(fetchServices.fulfilled, (state, action) => {
            state.services = action.payload.service; 
        })
        .addCase(fetchServices.rejected, (state, action) => {
            state.error = action.payload as string;
        })
        .addCase(fetchServices.pending, (state) => {
            state.loading = true; 
            state.error = null;
        })
        .addCase(fetchServicesById.fulfilled, (state, action) => {
            state.selectedService = action.payload; 
        })
        .addCase(fetchServicesById.rejected, (state, action) => {
            state.error = action.payload as string;
        })
        .addCase(fetchServicesById.pending, (state) => {
            state.loading = true; 
            state.error = null;
        })
        
});

export const { clearError } = serviceSlice.actions; 
export default serviceSlice.reducer;