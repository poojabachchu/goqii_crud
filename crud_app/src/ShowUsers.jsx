import React, { useState, useEffect } from "react";
// import "datatables.net-dt/css/jquery.dataTables.css"; // DataTables CSS
import $ from "jquery";
import { Link } from "react-router";
import "datatables.net";

export default function ShowUsers(props) {
    const [data, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState({});
    const [errors, setErrors] = useState({});

    //Get the list of users onload of the page
    const getUsersList = () => {
        $.ajax({
            url: props.apiBaseUrl + "/get_userslist",
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                $("#usertable").DataTable();
                setUserData(response.data);
                setLoading(false);
            },
            error: function (request, error) {
                console.log(request.responseText);
                setLoading(false);
            },
        });
    };

    useEffect(() => {
        getUsersList();
    }, []);

    function deleteUser(id) {
        if (confirm("Are you sure yo want to delete this user?")) {
            $.ajax({
                url: props.apiBaseUrl + "/delete_user",
                type: "POST",
                data: JSON.stringify({
                    id: id,
                }),
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    setSuccess(response);
                    const table = $("#usertable").DataTable();
                    table
                        .rows(
                            (idx, data, node) =>
                                $(node).find("[data-id]").data("id") == id
                        )
                        .remove()
                        .draw();
                },
                error: function (request, error) {
                    console.log(request.responseText);
                    setLoading(false);
                },
            });
        }
    }
    return loading ? (
        <div>Loading...</div>
    ) : (
        <>
            {success.msg && (
                <div className="alert alert-success" role="alert">
                    {success.msg}
                </div>
            )}
            <div className="button_container">
                <button className="btn btn-primary">
                    <a href="/create_user" id="create_user">
                        Create User
                    </a>
                </button>
            </div>
            <div className="container-fluid">
                <table className="table table-striped" id="usertable">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((user, index) => (
                                <tr key={user.id}>
                                    <th scope="row" data-id={user.id}>
                                        {user.name}
                                    </th>
                                    <td>{user.email}</td>
                                    <td>{user.dob}</td>
                                    <td>
                                        <Link to={`/modify_user/${user.id}`}>
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                        <i
                                            className="fa fa-trash-o"
                                            onClick={() => deleteUser(user.id)}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
