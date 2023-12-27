import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods
import {
    getTeam as getTeamApi,
    addNewMember as addNewMemberApi,
    updateMember as updateMemberApi,
    deleteMember as deleteMemberApi
} from "../../helpers/fakebackend_helper";

export const getTeam = createAsyncThunk("team/getTeams", async () => {
    try {
        const response = getTeamApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const addNewMember = createAsyncThunk("team/addNewMember", async (member: any) => {
    try {
        const response = addNewMemberApi(member);
        const data = await response;
        toast.success("Team Member Added Successfully", { autoClose: 3000 });
        return data;
    } catch (error) {
        toast.error("Team Member Added Failed", { autoClose: 3000 });
        return error;
    }
});

export const updateMember = createAsyncThunk("team/updateMember", async (member: any) => {
    try {
        const response = updateMemberApi(member);
        const data = await response;
        toast.success("Team Member Update Successfully", { autoClose: 3000 });
        return data;
    } catch (error) {
        toast.error("Team Member Update Failed", { autoClose: 3000 });
        return error;
    }
});

export const deleteMember = createAsyncThunk("team/deleteMember", async (member: any) => {
    try {
        const response = deleteMemberApi(member);
        toast.success("Team Member delete Successfully", { autoClose: 3000 });
        return response;
    } catch (error) {
        toast.error("Team Member delete Failed", { autoClose: 3000 });
        return error;
    }
});
