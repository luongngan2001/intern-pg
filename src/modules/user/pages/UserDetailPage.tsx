import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/reducer";

interface Props { }

const UserDetailPage = (props: Props) => {
    const user = useSelector((state: AppState) => state.profile.user);

    return (
        <div className="container mt-5">
            <div className="mb-5">
                <a href='/home'><i className="fa fa-arrow-circle-left"></i></a>
            </div>
            <div>
                <h5>User Detail</h5>
                {user?.avatar && <div>{user?.avatar}</div>}
                <div>Name: {user?.name}</div>
                <div>Email: {user?.email}</div>
                <div>Gender: {user?.gender}</div>
                <div>Region: {user?.region}</div>
                <div>State: {user?.state}</div>
                {user?.description && <div>Description: {user?.description}</div>}
                <div>Date Create: {user?.createdAt}</div>
            </div>
        </div>
    );
}

export default UserDetailPage;