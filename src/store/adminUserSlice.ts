import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type Profiles, supabase } from '../../utils/supabase';

interface AuthState { 
    users: Profiles[];
    loading: boolean; 
    error: string | null;   
}

const initialState: AuthState = {
    users: [], 
    loading: false,
    error: null
}

export const fetchProfiles = createAsyncThunk('adminUsers/fetchProfiles', async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, role, email');
  if (error) throw error;
  return data as Profiles[];
});

export const fetchEmployees = createAsyncThunk(
    'adminUser/fetchEmployees',
    async(_, { rejectWithValue}) => { 
        try { 
            const { data, error } = await supabase
                .from('profiles')
                .select('id, full_name')
                .eq('role', 'employee')
            
            if (error) throw error;
            return data; 
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const updateProfileRole = createAsyncThunk(
    'adminUsers/updateProfileRole',
    async({ id, role } : {id: string; role: string}) => { 
        const { error } = await supabase
            .from('profiles')
            .update({ role })
            .eq('id', id)
            .select();

        if (error) throw error; 

        return { id, role }
    }
)

export const updateEmployeeAppointment = createAsyncThunk(
    'adminUsers/updateEmployeeAppointment',
    async ({ appointmentId, employeeId }: { appointmentId: string; employeeId: string}, { rejectWithValue }) => { 
        try { 
            const { data, error } = await supabase
                .from('appointments')
                .update({ employee_id: employeeId })
                .eq('id', appointmentId) 
                .select();

            if (error) throw error; 

            return data[0];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


const adminUserSlice = createSlice({
    name: "adminUser",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(updateProfileRole.fulfilled, (state, action) => {
                const { id, role } = action.payload;

                state.users = state.users.map((user) => {
                    if (user.id === id) {
                        return { ...user, role: role };
                    }
                    return user;
                });
            })
    }
})

export const { clearError } = adminUserSlice.actions; 
export default adminUserSlice.reducer