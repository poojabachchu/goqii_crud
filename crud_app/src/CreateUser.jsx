import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";

export default function createUser(props) {
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});
    const { id } = useParams();
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        dob: "",
    });

    //create a new user
    function createUser() {
        $.ajax({
            url: props.apiBaseUrl + "/create_user",
            type: "POST",
            data: JSON.stringify({
                name: user.name,
                email: user.email,
                dob: user.dob,
                password: user.password,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                setSuccess(data);
                setUser({
                    name: "",
                    email: "",
                    password: "",
                    dob: "",
                });
                setErrors({});
            },
            error: function (request, error) {
                let response = JSON.parse(request.responseText);
                setErrors(response.errors);
            },
        });
    }

    //update the existing user by id
    function updateUser() {
        $.ajax({
            url: props.apiBaseUrl + "/update_user",
            type: "POST",
            data: JSON.stringify({
                id: id,
                name: user.name,
                email: user.email,
                dob: user.dob,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                setSuccess(data);

                setErrors({});
            },
            error: function (request, error) {
                let response = JSON.parse(request.responseText);
                setErrors(response.errors);
            },
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //If id is found then update the user or create a new user
        if (id) {
            updateUser();
        } else {
            createUser();
        }
    };

    //get all user details on edit page
    const getUserDetails = (id) => {
        $.ajax({
            url: props.apiBaseUrl + "/edit_user/" + id,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                setUser(data.data[0]);
            },
            error: function (request, error) {
                let response = JSON.parse(request.responseText);
                setErrors(response.errors);
            },
        });
    };

    useEffect(() => {
        if (id) {
            getUserDetails(id);
        }
    }, [id]);

    return (
        <>
            {success.msg && (
                <div className="alert alert-success" role="alert">
                    {success.msg}
                </div>
            )}

            <div className="button_container">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>

            <div className="container">
                <form id="user_form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="name"
                            className="form-control"
                            id="name"
                            value={user.name}
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                            aria-describedby="nameHelp"
                            placeholder="Enter name"
                        />
                        {errors.name && (
                            <p className="text-danger">{errors.name[0]}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        {errors.email && (
                            <p className="text-danger">{errors.email[0]}</p>
                        )}
                    </div>

                    {!id && (
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={user.password}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        password: e.target.value,
                                    })
                                }
                                placeholder="Password"
                            />
                            {errors.password && (
                                <p className="text-danger">
                                    {errors.password[0]}
                                </p>
                            )}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="dob">Dob</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dob"
                            value={user.dob}
                            onChange={(e) =>
                                setUser({ ...user, dob: e.target.value })
                            }
                            aria-describedby="dobHelp"
                            placeholder="Enter dob"
                        />
                        {errors.dob && (
                            <p className="text-danger">{errors.dob[0]}</p>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}
