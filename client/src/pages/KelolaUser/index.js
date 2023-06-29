import React, { useState, useEffect } from "react";
import { Gap, SidebarRoot } from "../../components";

//bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

//api
import getData from "../../api/root/getUserReadOnly";
import delData from "../../api/root/deleteUser";
import postData from "../../api/root/addUser";
import putData from "../../api/root/editUser";
//styling
// import './kelolauser.scss'
// import MyPagination from "../../components/atoms/MyPagination";

function KelolaUser() {
    //post
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    //put
    const token = localStorage.getItem("token");
    const [updateState, setUpdateState] = useState(-1);
    //get
    const [data, setData] = useState([]);

    //Function : Add user as Admin (POST)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //--------- all the function below ----------
    function EditList({ admin }) {
        const [btnUpdate, setBtnUpdate] = useState(true);
        function handInputname(event) {
            const value = event.target.value;
            (value === admin.name) ? setBtnUpdate(true) : setBtnUpdate(false)
        }
        function handInputusername(event) {
            const value = event.target.value;
            (value === admin.username) ? setBtnUpdate(true) : setBtnUpdate(false)
        }
        function handInputpassword(event) {
            const value = event.target.value;
            (value === admin.password) ? setBtnUpdate(true) : setBtnUpdate(false)
        }
        return (
            <tr >
                <td><Form.Control type="text" name="name" onChange={handInputname} defaultValue={admin.name} /></td>
                <td><Form.Control type="text" name="username" onChange={handInputusername} defaultValue={admin.username} /></td>
                <td><Form.Control type="text" name="password" onChange={handInputpassword} defaultValue={admin.password} /></td>
                <td>
                    <Button variant="success" id="buttonUpdate" type='submit' disabled={btnUpdate}>Simpan</Button>
                    <Button variant="danger" type='submit' onClick={()=>{window.location="/kelolauser"}}>Cancel</Button>   
                </td>
            </tr>
        )
    }

    const renderTable = () => {
        return data.map((admin, key) => {
            return (
                updateState === admin.id ? <EditList admin={admin} /> :
                    <tr key={key}>
                        {/* <td>{key + 1}</td> */}
                        <td><Form.Control plaintext readOnly defaultValue={admin.name} /></td>
                        <td><Form.Control plaintext readOnly defaultValue={admin.username} /></td>
                        <td><Form.Control plaintext readOnly defaultValue={admin.password} /></td>
                        <td>
                            <Button variant="warning" onClick={() => handleEdit(admin.id)}>Perbarui</Button>
                            <Button variant="danger" onClick={(e) => handleDelete(admin.username, e)}>Hapus</Button>
                        </td>
                    </tr>
            )
        })
    }

    function handleEdit(id) {
        if (window.confirm("Apakah anda yakin untuk memperbarui data?")) {
            setUpdateState(id);
        }
        else {
            window.location = 'kelolauser'
        }
    }

    //function POST
    function handleAdd() {
        const saveAdmin = async (e) => {
            e.preventDefault();
            await postData(token, username, password, name);
            setUsername("");
            setPassword("");
            setName("")
            setShow(false)
            window.location = '/kelolauser'
        }

        return (
            <div>
                <Button onClick={handleShow} className="btn-primary">Tambah User</Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label name="password">Name</Form.Label>
                            <Form.Control
                                defaultValue={name}
                                onChange={(e) => { setName(e.target.value) }}
                                type="text"
                                placeholder="Masukkan nama"
                                autoFocus
                            />
                        </Form.Group>

                        <Form onSubmit={saveAdmin}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Group name="username" >Username</Form.Group>
                                <Form.Control
                                    // type="email"
                                    defaultValue={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Masukkan username"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label name="password">Password</Form.Label>
                                <Form.Control
                                    defaultValue={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    type="password"
                                    placeholder="Masukkan password"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Batal
                        </Button>
                        <Button variant="warning" onClick={saveAdmin}>
                            Tambah
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }

    //Function : Delete admin (DELETE)
    async function handleDelete(username) {
        await delData(token, username)
        window.location = '/kelolauser'
    }

    // function : Update admin datas (PUT)
    async function handleSubmit(event) {
        event.preventDefault()
        const username = event.target.elements.username.value
        const password = event.target.elements.password.value
        const name = event.target.elements.name.value
        await putData(token, updateState, username, password, name)
        window.location = '/kelolauser'
        setUpdateState(-1)
    }

    //Function : Get all admin (GET)
    useEffect(() => {
        async function dataFetch() {
            const response = await getData(token);
            if (response.data?.message !== "success") {
                localStorage.removeItem("token");
                window.location = '/';
            }
            else {
                setData(response.data.data);
            };
        };
        dataFetch();
    }, [token]);


    //Main UI
    return (
        <div>
            {/* SIDEBAR */}
            <SidebarRoot />

            {/* KONTEN */}
            <div className="container-root">
                <h1 style={{ fontSize: "35px" }}>Kelola User</h1>
                <Gap height={15} />
                {handleAdd()}
                <Gap height={20} />
                <form onSubmit={handleSubmit}>
                    <Table id="table-adm" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                {/* <th>No</th> */}
                                <th>Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="users-table">
                            {renderTable()}
                        </tbody>
                    </Table>
                </form>
            </div>
        </div>
    );
};

export default KelolaUser;