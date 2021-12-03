import axios from "axios";
import React, { useEffect, useState } from "react";
import { Flight, headers } from "../utils";
import FlightForm from "./FlightForm";

type FlightsProps = {
  token: string;
};

const Flights: React.FC<FlightsProps> = ({ token }) => {
  const [flights, setFlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dFlight, setdFlight] = useState<Flight>({
    id: 0,
    number: "",
    origin: "",
    arrival_date: "",
    destination: "",
    departure_date: "",
    seats: 0,
  });

  useEffect(() => {
    const getFlights = () => {
      fetchFlights();
    };
    getFlights();
    return () => {
      // cleanup
    };
  }, []);

  const fetchFlights = async () => {
    axios
      .get("http://localhost:9090/api/flights", { headers })
      .then((response) => setFlights(response.data));
  };

  const createFlight = (flight: Flight) => {
    axios
      .post("http://localhost:9090/api/flights", flight, { headers })
      .then((response) => {
        console.log(response.data);
        fetchFlights();
      });
  };

  const updateFlight = (flight: Flight, id: number) => {
    axios
      .put("http://localhost:9090/api/flights/" + id.toString(), flight, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        fetchFlights();
      });
  };

  const deleteFlight = (id: number) => {
    axios
      .delete("http://localhost:9090/api/flights/" + id.toString(), { headers })
      .then((response) => {
        console.log(response.data);
        fetchFlights();
      });
  };

  const addFlight = () => {
    setdFlight({
      id: 0,
      number: "",
      origin: "",
      arrival_date: "",
      destination: "",
      departure_date: "",
      seats: 0,
    });
    toggleModal();
  };

  const editFlight = (editFlight: any) => {
    setdFlight(editFlight);
    toggleModal();
  };

  const confirmDeleteFlight = (editFlight: Flight) => {
    if (
      window.confirm("Are you sure you want to delete " + editFlight.number)
    ) {
      deleteFlight(editFlight.id);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <h1>Flights</h1>
      <button className="btn btn-primary" onClick={addFlight}>
        +
      </button>
      <table className="table-responsive table-hover table">
        <thead>
          <tr>
            <td>Number</td>
            <td>Origin</td>
            <td>Arrives</td>
            <td>Destination</td>
            <td>Departs</td>
            <td>&nbsp;</td>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight: any) => (
            <tr key={flight.id}>
              <td>{flight.number}</td>
              <td>{flight.origin}</td>
              <td>{flight.arrival_date}</td>
              <td>{flight.destination}</td>
              <td>{flight.departure_date}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={(e) => editFlight(flight)}
                >
                  Edit
                </button>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={(e) => confirmDeleteFlight(flight)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FlightForm
        show={showModal}
        toggleModal={toggleModal}
        flight={dFlight}
        createFlight={createFlight}
        updateFlight={updateFlight}
      />
    </>
  );
};

export default Flights;
