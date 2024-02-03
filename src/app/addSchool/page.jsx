"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  contact: yup
    .number()
    .required("Contact is required")
    .positive("Contact must be a positive number"),
  email_id: yup
    .string()
    .required("Email ID is required")
    .email("Invalid email format")
 
});

const AddSchool = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [image, setImage] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", image);

      const response = await axios.post("/api/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      router.push("./getSchools");
    } catch (error) {
      console.error(error);                                                                   
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    
  };

  return (
    <div className="container w-25 mt-5 bg-dark">
      <h3 className="text-white text-center p-3">Add School</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="form-control mt-3"
          id="name"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}

        <input
          type="text"
          className="form-control mt-3"
          id="address"
          placeholder="Address"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-danger">{errors.address.message}</p>
        )}

        <input
          type="text"
          className="form-control mt-3"
          id="city"
          placeholder="City"
          {...register("city")}
        />
        {errors.city && <p className="text-danger">{errors.city.message}</p>}

        <input
          type="text"
          className="form-control mt-3"
          id="state"
          placeholder="State"
          {...register("state")}
        />
        {errors.state && <p className="text-danger">{errors.state.message}</p>}

        <input
          type="number"
          className="form-control mt-3"
          id="contact"
          placeholder="Contact"
          {...register("contact")}
        />
        {errors.contact && (
          <p className="text-danger">{errors.contact.message}</p>
        )}

        <input
          type="text"
          className="form-control mt-3"
          id="email_id"
          placeholder="Email ID"
          {...register("email_id")}
        />
        {errors.email_id && (
          <p className="text-danger">{errors.email_id.message}</p>
        )}

        <input
          type="file"
          className="form-control mt-3"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
        />
        

        <button type="submit" className="btn btn-primary my-3 w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSchool;
