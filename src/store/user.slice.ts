import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { LoginResponse } from "../interfaces/Auth.interface";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/API";
import { RootState } from "./store";
import { Profile } from "../interfaces/Profile.interface";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
    jwt: string | null;
}

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string | null;
    registerErrorMessage?: string | null;
    profileData?: Profile | null;
    profileErrorMessage?: string | null;
}

const initialState: UserState = {
    loginErrorMessage: null,
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
    profileData: null,
    profileErrorMessage: null,
};

export const loadProfile = createAsyncThunk<
    Profile,
    void,
    { state: RootState }
>("user/loadProfile", async (_, thunkApi) => {
    try {
        const jwt = thunkApi.getState().user.jwt;
        const { data } = await axios.get(`${PREFIX}/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.message);
        }
    }
});

export const register = createAsyncThunk(
    "user/register",
    async (params: { email: string; password: string; name: string }) => {
        try {
            const { data } = await axios.post(`${PREFIX}/auth/register`, {
                email: params.email,
                password: params.password,
                name: params.name,
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    },
);

export const login = createAsyncThunk(
    "user/login",
    async (params: { email: string; password: string }) => {
        try {
            const { data } = await axios.post(`${PREFIX}/auth/login`, {
                email: params.email,
                password: params.password,
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    },
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
        },
        clearProfileError: (state) => {
            state.profileErrorMessage = undefined;
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined;
        },
        clearRegisterError: (state) => {
            state.registerErrorMessage = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            register.fulfilled,
            (state, action: PayloadAction<LoginResponse>) => {
                if (!action.payload) {
                    return;
                }
                state.jwt = action.payload.access_token;
            },
        );
        builder.addCase(register.rejected, (state, action) => {
            state.registerErrorMessage = action.error.message;
        });
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<LoginResponse>) => {
                if (!action.payload) {
                    return;
                }
                state.jwt = action.payload.access_token;
            },
        );
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message;
        });
        builder.addCase(
            loadProfile.fulfilled,
            (state, action: PayloadAction<Profile>) => {
                if (!action.payload) {
                    return;
                }
                state.profileData = { ...action.payload };
            },
        );
        builder.addCase(loadProfile.rejected, (state, action) => {
            state.profileErrorMessage = action.error.message;
        });
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
