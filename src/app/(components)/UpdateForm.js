"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const styles = `
.container {
  max-width: 500px;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.label {
  font-size: 1rem;
}

.input {
  padding: 0.5rem;
  width: 60%;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
`;

const UpdateForm = ({ person }) => {
  const router = useRouter();
  const defaultFormData = {
    email_id: person.email_id,
    person_name: person.person_name,
    mobile_number: person.mobile_number,
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/Persons/${person._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData }),
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const res = await axios.put(`/api/Persons/${id}`, formData);
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to update person.");
    }
    router.refresh();
    router.push("/inuse");
  };

  return (
    <div>
      <div className="container">
        <style>{styles}</style>
        <h2 className="title">Update Person Details</h2>
        <form className="form" method="post" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="mobile_number">
              Email ID
            </label>
            <input
              className="input"
              id="email_id"
              name="email_id"
              type="text"
              value={formData.email_id}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              className="input"
              id="person_name"
              name="person_name"
              type="text"
              value={formData.person_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="email">
              Mobile Number
            </label>
            <input
              className="input"
              id="email"
              name="mobile_number"
              type="text"
              value={formData.mobile_number}
              onChange={handleChange}
            />
          </div>
          <button className="button" type="submit">
            Update Person
          </button>
          {/* <input type="submit" value={"Add Person"} /> */}
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
