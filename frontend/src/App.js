import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [editableRow, setEditableRow] = useState(null);

  const [editableFormData, setEditableFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  const [newRecordFormData, setNewRecordFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecordFormData({ ...newRecordFormData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/data",
        newRecordFormData
      );
      setData([...data, response.data]);
      setNewRecordFormData({ name: "", age: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };

  const handleUpdate = async (id) => {
    if (editableRow === id) {
      try {
        await axios.put(
          `http://localhost:3002/api/data/${id}`,
          editableFormData
        );
        const updatedData = data.map((record) =>
          record.id === id ? { ...record, ...editableFormData } : record
        );
        setData(updatedData);
        setEditableFormData({ name: "", age: "", email: "", phone: "" });
        setEditableRow(null);
      } catch (error) {
        console.error("Error updating record:", error);
      }
    } else {
      const editableRecord = data.find((record) => record.id === id);
      setEditableFormData(editableRecord);
      setEditableRow(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/data/${id}`);
      const filteredData = data.filter((record) => record.id !== id);
      setData(filteredData);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>
                {editableRow === record.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editableFormData.name}
                    onChange={(e) =>
                      setEditableFormData({
                        ...editableFormData,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  record.name
                )}
              </td>
              <td>
                {editableRow === record.id ? (
                  <input
                    type="number"
                    name="age"
                    value={editableFormData.age}
                    onChange={(e) =>
                      setEditableFormData({
                        ...editableFormData,
                        age: e.target.value,
                      })
                    }
                  />
                ) : (
                  record.age
                )}
              </td>
              <td>
                {editableRow === record.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editableFormData.email}
                    onChange={(e) =>
                      setEditableFormData({
                        ...editableFormData,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  record.email
                )}
              </td>
              <td>
                {editableRow === record.id ? (
                  <input
                    type="text"
                    name="phone"
                    value={editableFormData.phone}
                    onChange={(e) =>
                      setEditableFormData({
                        ...editableFormData,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  record.phone
                )}
              </td>
              <td>
                {editableRow === record.id ? (
                  <>
                    <button
                      className="update-button"
                      onClick={() => handleUpdate(record.id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setEditableRow(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(record.id)}
                  >
                    Update
                  </button>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(record.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create New Record</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newRecordFormData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={newRecordFormData.age}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={newRecordFormData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={newRecordFormData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="buttons-container">
        <button className="create-button" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default App;
