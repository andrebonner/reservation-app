import React, { useEffect, useState } from "react";
import { Flight } from "../utils";

type FlightFormProps = {
  show: boolean;
  toggleModal: any;
  createFlight: any;
  updateFlight: any;
  flight?: Flight | undefined;
};

const FlightForm: React.FC<FlightFormProps> = ({
  show,
  toggleModal,
  createFlight,
  updateFlight,
  flight,
}) => {
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
    setdFlight(
      flight || {
        id: 0,
        number: "",
        origin: "",
        arrival_date: "",
        destination: "",
        departure_date: "",
        seats: 0,
      }
    );

    return () => {
      //cleanup
    };
  }, [flight]);

  const handleChange = (e: any) => {
    // need a way to update date inputs
    const name = e.target.name;
    const value = e.target.value;
    setdFlight({ ...dFlight, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(e);
    if (dFlight.id) {
      updateFlight(dFlight, dFlight.id);
    } else {
      createFlight(dFlight);
      toggleModal();
    }
  };

  return (
    <>
      <div
        className={"modal fade" + (show ? " show" : "")}
        style={{ display: show ? "block" : "" }}
        data-modal-color=""
        id="modalColor"
        data-backdrop="static"
        data-keyboard="false"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">
                  {dFlight.id ? "Edit" : "Add"} Flight
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="flight-number" className="col-form-label">
                    Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="flight-number"
                    name="number"
                    onChange={handleChange}
                    value={dFlight.number}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="flight-origin" className="col-form-label">
                    Origin:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="flight-origin"
                    name="origin"
                    onChange={handleChange}
                    value={dFlight.origin}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="flight-arrival" className="col-form-label">
                    Arrival Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="flight-arrival"
                    name="arrival_date"
                    onChange={handleChange}
                    value={dFlight.arrival_date}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="flight-destination"
                    className="col-form-label"
                  >
                    Destination:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="flight-destination"
                    name="destination"
                    onChange={handleChange}
                    value={dFlight.destination}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="flight-depart" className="col-form-label">
                    Departure Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="flight-depart"
                    name="departure_date"
                    onChange={handleChange}
                    value={dFlight.departure_date}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="flight-seats" className="col-form-label">
                    Seats:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="flight-seats"
                    name="seats"
                    onChange={handleChange}
                    value={dFlight.seats}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightForm;
