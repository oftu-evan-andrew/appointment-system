import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type Appointments, supabase } from '../../utils/supabase';


interface AppointmentState {
    appointments: Appointments [] | null;
    error: string | null;
    loading: boolean
}

const initialState: AppointmentState = {
    appointments: null,
    error: null,
    loading: false,
}

export type AppointmentInsert = Omit<Appointments, 'id' | 'created_at' | 'status'> & {
    status?: string;
}

export const createAppointment = createAsyncThunk(
    'appointments/create',
    async (appointmentData: Omit<AppointmentInsert, 'client_id' | 'employee_id'>, { getState, rejectWithValue }) => { 
        try {
            const state = getState() as any;
            const userId = state.auth.user?.id;

            if (!userId) throw new Error("Authentication required");

            const { data, error } = await supabase
                .from('appointments')
                .insert([{
                    ...appointmentData, 
                    client_id: userId, 
                    employee_id: null,

                }])
                .select()
                .single();
            
            if (error) throw error; 
            return data as Appointments; 
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data, error} = await supabase
                .from('appointments')
                .select('*')
            
            if (error) throw error;
            return { appointment: data }
        } catch (error: any ) {
            return rejectWithValue(error.message)
        }       
    }
)

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState, 
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.appointments = action.payload.appointment; 
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true; 
                state.error = null;
            })
            .addCase(createAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments?.push(action.payload);
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = appointmentSlice.actions; 
export default appointmentSlice.reducer;