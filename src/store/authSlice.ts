import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type Profiles, supabase } from '../../utils/supabase';

interface AuthState { 
    user: Profiles | null;
    loading: boolean; 
    error: string | null;   
}

const initialState: AuthState = {
    user: null, 
    loading: false,
    error: null
}

export const register = createAsyncThunk(
    'auth/register', 
    async({email, password, fullName}: {email: string; password: string; fullName: string}, { rejectWithValue }) => {
        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email, 
                password, 
                options: {
                    data: { full_name: fullName}
                }
            });

            if (authError) throw authError;

            const profileData: Profiles = {
                id: authData.user!.id,
                email: authData.user!.email!,
                full_name: fullName,
                role: 'client'
            }
            return profileData;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email, 
                password,
            });
            if (authError) throw authError;
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authData.user.id)
                .single();

            if (profileError) throw profileError;

            return profileData as Profiles;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue }) => {
        try { 
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        try {
            const { data: { user: authUser }} = await supabase.auth.getUser();

            if (!authUser) return null;

            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (profileError) throw profileError; 

            return profileData as Profiles;
        } catch (error: any) {
            return null;
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: { 
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => { 
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload as Profiles;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload as string;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false; 
                state.user = action.payload as Profiles;
                
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload as string; 
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload as Profiles;
            });
    }
})

export const { clearError } = authSlice.actions; 
export default authSlice.reducer