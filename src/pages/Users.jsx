import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";

import { getUsers, getUserById } from "../service/userService";

import "datatables.net-dt/css/dataTables.dataTables.css";
import "../css/dataTable.css";

DataTable.use(DT);

function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getUsers();

                setUsers(data);

            } catch (error) {

                console.error(error);
                setError("Failed to load users.");

            } finally {

                setLoading(false);

            }
        };

        fetchUsers();

    }, []);


    const handleFirstNameClick = (e, rowData, table) => {

        const tr = e.target.closest("tr");

        if (!tr) {
            return;
        }

        const row = table.row(tr);

        // Close if already open
        if (row.child.isShown()) {

            row.child.hide();
            tr.classList.remove("shown");

            return;
        }

        // Get attributes directly from DataTable row
        const attributes = rowData.attributes || [];

        // No attributes
        if (attributes.length === 0) {

            row.child(`
                <div class="user-attributes-container">
                    <div class="user-attributes-title">
                        User Attributes
                    </div>

                    <div class="text-muted">
                        No user attributes available.
                    </div>
                </div>
            `).show();

            tr.classList.add("shown");

            return;
        }

        // Build attributes dynamically
        const attributesHtml = attributes
            .map(attribute => `
                <div class="col-md-2">

                    <span class="attribute-label fw-bold">
                        ${attribute.name}: 
                    </span>
                    <span class="attribute-value">
                        ${attribute.value ?? "-"}
                    </span>
                </div>
            `)
            .join("");

        // Child row
        const attributeHtml = `
            <div class="user-attributes-container">

                <div class="user-attributes-title">
                    User Attributes
                </div>

                <div class="row g-3">
                    ${attributesHtml}
                </div>

            </div>
        `;

        row.child(attributeHtml).show();

        tr.classList.add("shown");
    };


    if (loading) {

        return (
            <div className="container-fluid">

                <div className="text-center mt-4">
                    Loading users...
                </div>

            </div>
        );
    }


    if (error) {

        return (
            <div className="container-fluid">

                <div className="alert alert-danger mt-3">
                    {error}
                </div>

            </div>
        );
    }


    const columns = [

        /*
         * Action
         */
        {
            title: "Action",
            data: null,
            orderable: false,
            searchable: false,
            className: "action-column",
            width: "3%",

            render: function (_data, _type, row) {

                const userId = row.id;

                return `
                    <div class="d-flex justify-content-center">

                        <button
                            type="button"
                            class="btn btn-sm edit-user p-0"
                            data-user-id="${userId}"
                            title="Edit user"
                            aria-label="Edit user">

                            <img
                                src="/images/edit.png"
                                alt=""
                                width="12"
                                height="12"
                            >

                        </button>

                        <button
                            type="button"
                            class="btn btn-sm delete-user p-0"
                            data-user-id="${userId}"
                            title="Delete user"
                            aria-label="Delete user">

                            <img
                                src="/images/trash.png"
                                alt=""
                                width="12"
                                height="12"
                            >

                        </button>

                    </div>
                `;
            }
        },


        /*
         * First Name
         */
        {
            title: "First Name",
            width: "15%",
            data: "firstName",

            render: function (data) {

                return `
                    <span
                        class="user-first-name fw-bold"
                        style="cursor: pointer;"
                        title="Click to view attributes">

                        ${data ?? ""}

                    </span>
                `;
            }
        },


        /*
         * Last Name
         */
        {
            title: "Last Name",
            width: "15%",
            data: "lastName"
        },


        /*
         * Email
         */
        {
            title: "Email",
            width: "15%",
            data: "mailAddress"
        },


        /*
         * Phone
         */
        {
            title: "Phone",
            width: "15%",
            data: "phoneNumber"
        },


        /*
         * Status
         */
        {
            title: "Status",
            data: "active",
            width: "3%",

            render: function (data, type) {

                const isActive =
                    data === true ||
                    data === 1 ||
                    data === "1" ||
                    String(data).toLowerCase() === "true" ||
                    String(data).toLowerCase() === "active";


                if (type === "sort" || type === "type") {

                    return isActive ? 1 : 0;
                }


                return isActive

                    ? `
                        <span class="d-flex justify-content-center align-items-center w-100">

                            <i
                                class="bi bi-circle-fill"
                                style="color: #00e600"
                                title="Active"
                                aria-label="Active">
                            </i>

                        </span>
                    `

                    : `
                        <span class="d-flex justify-content-center align-items-center w-100">

                            <i
                                class="bi bi-circle-fill"
                                style="color: #ff5050"
                                title="Inactive"
                                aria-label="Inactive">
                            </i>

                        </span>
                    `;
            }
        }
    ];


    return (

        <div className="container-fluid users-page">


            {/* Header */}

            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">

                <h2>
                    Users
                </h2>


                <div className="d-flex gap-2">

                    <div className="dropdown">

                        <button
                            type="button"
                            className="dropdown-toggle btn button-style"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">

                            More Actions

                        </button>


                        <ul className="dropdown-menu dropdown-menu-end shadow-sm mt-2 p-1 small-dropdown">

                            <li>

                                <button
                                    type="button"
                                    className="dropdown-item">

                                    Bulk Upload

                                </button>

                            </li>


                            <li>

                                <button
                                    type="button"
                                    className="dropdown-item">

                                    User Attributes

                                </button>

                            </li>

                        </ul>

                    </div>


                    <button
                        type="button"
                        className="btn button-style">

                        Add User

                    </button>

                </div>

            </div>


            {/* DataTable */}

            <div className="table-responsive">

                <DataTable

                    data={users}

                    columns={columns}

                    className="display table table-bordered table-hover"

                    options={{

                        pageLength: 10,

                        lengthMenu: [10, 25, 50, 100],

                        searching: true,

                        ordering: true,

                        paging: true,

                        info: true,

                        autoWidth: false,


                        /*
                         * Handle First Name click
                         */
                        createdRow: function (row, rowData) {

                            const firstNameElement =
                                row.querySelector(".user-first-name");


                            if (firstNameElement) {

                                firstNameElement.addEventListener(
                                    "click",
                                    function (e) {

                                        /*
                                         * DataTables instance
                                         */
                                        const table =
                                            new DT.Api(row.closest("table"));


                                        handleFirstNameClick(
                                            e,
                                            rowData,
                                            table
                                        );

                                    }
                                );
                            }
                        },


                        language: {

                            search: "Search:",

                            lengthMenu:
                                "Record to display _MENU_",

                            emptyTable:
                                "No users found",

                            zeroRecords:
                                "No matching users found"
                        }

                    }}

                />

            </div>

        </div>
    );
}

export default Users;