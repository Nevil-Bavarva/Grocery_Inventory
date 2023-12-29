import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import './homepage.css';

const Home = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        pname: '',
        pcategory: '',
        pquantity: '',
        pprice: '',
        pdesc: '',
    });
    const [editMode, setEditMode] = useState(false); // Track whether editing mode is active
    const [editProductId, setEditProductId] = useState(null); // Track the ID of the product being edited

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleInsert = async (e) => {
        if (editMode) {
            // Update existing product
            await axios.patch(`/api/product/${editProductId}`, formData);
        } else {
            // Insert new product
            await axios.post("/api/product/create", formData);
        }
        resetForm();
        getProducts();
    };

    const handleDeletion = async (_id) => {
        await axios.delete(`/api/product/${_id}`);
        getProducts();
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditMode(true);
        setEditProductId(product._id);
    };

    const resetForm = () => {
        setFormData({
            pname: '',
            pcategory: '',
            pquantity: '',
            pprice: '',
            pdesc: '',
        });
        setEditMode(false);
        setEditProductId(null);
    };

    const handleLogout = async () => {
        await axios.get("/api/users/logout");
        navigate("/login");
        
    }

    const getProducts = async () => {
        const response = await axios.post("/api/product");
        setProducts(response.data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="home-container">
            <section className="dash-title">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h2 className="text">Grocery Inventory</h2>
                    </div>
                    <div className="col-2" onClick={handleLogout}>
                        <h4 className="text">Logout</h4>
                    </div>
                </div>

            </section>
            <section className="dash-table">
                <div className="container">
                    <form onSubmit={handleInsert}>
                        <table id="products" className="add-product-table">
                            <tbody>
                                <tr>
                                    <td><input type="text" name="pname" placeholder="Name" onChange={handleChange} value={formData.pname} className="input" required /></td>
                                    <td><input type="number" name="pquantity" placeholder="Quantity" onChange={handleChange} value={formData.pquantity} className="input" required /></td>
                                    <td><input type="number" name="pprice" placeholder="Price" onChange={handleChange} value={formData.pprice} className="input" required /></td>
                                    <td><input type="text" name="pcategory" placeholder="Category" onChange={handleChange} value={formData.pcategory} className="input" required /></td>
                                    <td><input type="text" name="pdesc" placeholder="Description" onChange={handleChange} value={formData.pdesc} className="input" required /></td>
                                    <td className="button-td"><button type="submit" className="edit-btn">{editMode ? 'Save' : 'Add Product'}</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <table id="products">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td><input type="text" className="input" value={product._id} disabled /></td>
                                    <td><input type="text" className="input" value={product.pname} disabled={!editMode} /></td>
                                    <td><input type="text" className="input" value={product.pquantity} disabled={!editMode} /></td>
                                    <td><input type="text" className="input" value={product.pprice} disabled={!editMode} /></td>
                                    <td><input type="text" className="input" value={product.pcategory} disabled={!editMode} /></td>
                                    <td><input type="text" className="input" value={product.pdesc} disabled={!editMode} /></td>
                                    <td className="edit-page">

                                        <button onClick={() => handleEdit(product)} className="icon">
                                            <FontAwesomeIcon icon={faPenToSquare} className="i" />
                                        </button>
                                        <button onClick={() => handleDeletion(product._id)} className="icon">
                                            <FontAwesomeIcon icon={faTrash} className="i" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Home;
