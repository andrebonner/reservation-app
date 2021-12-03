import axios from "axios";
import React, { useEffect, useState } from "react";
import { headers, Hotel } from "../utils";
import HotelForm from "./HotelForm";

type HotelsProps = {
  token: string;
};

const Hotels: React.FC<HotelsProps> = ({ token }) => {
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dHotel, setdHotel] = useState<Hotel>({
    id: 0,
    name: "",
    location: "",
    status: "",
  });
  console.log(hotels);
  useEffect(() => {
    const getHotels = () => {
      fetchHotels();
    };
    getHotels();
    return () => {
      // cleanup
    };
  }, []);

  const fetchHotels = async () => {
    axios
      .get("http://localhost:9090/api/hotels", { headers })
      .then((response) => setHotels(response.data));
  };

  const createHotel = (hotel: Hotel) => {
    axios
      .post("http://localhost:9090/api/hotels", hotel, { headers })
      .then((response) => {
        console.log(response.data);
        fetchHotels();
      });
  };

  const updateHotel = (hotel: Hotel, id: number) => {
    axios
      .put("http://localhost:9090/api/hotels/" + id.toString(), hotel, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        fetchHotels();
      });
  };

  const deleteHotel = (id: number) => {
    axios
      .delete("http://localhost:9090/api/hotels/" + id.toString(), { headers })
      .then((response) => {
        console.log(response.data);
        fetchHotels();
      });
  };

  const addHotel = () => {
    setdHotel({
      id: 0,
      name: "",
      location: "",
      status: "",
    });
    toggleModal();
  };

  const editHotel = (editHotel: any) => {
    setdHotel(editHotel);
    toggleModal();
  };

  const confirmDeleteHotel = (editHotel: Hotel) => {
    if (window.confirm("Are you sure you want to delete " + editHotel.name)) {
      deleteHotel(editHotel.id);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <h1>Hotels</h1>
      <button className="btn btn-primary" onClick={addHotel}>
        +
      </button>
      <table className="table-responsive table-hover table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Location</td>
            <td>Status</td>
            <td>Rooms</td>
            <td>&nbsp;</td>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel: any) => (
            <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.location}</td>
              <td>{hotel.status}</td>
              <td>
                <span className="badge bg-success">{hotel.rooms.length}</span>
              </td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={(e) => editHotel(hotel)}
                >
                  Edit
                </button>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={(e) => confirmDeleteHotel(hotel)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <HotelForm
        show={showModal}
        toggleModal={toggleModal}
        hotel={dHotel}
        createHotel={createHotel}
        updateHotel={updateHotel}
      />
    </>
  );
};

export default Hotels;
