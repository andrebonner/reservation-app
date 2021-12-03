import React, { useEffect, useState } from "react";
import { Hotel } from "../utils";

type HotelFormProps = {
  show: boolean;
  toggleModal: any;
  createHotel: any;
  updateHotel: any;
  hotel?: Hotel | undefined;
};

const HotelForm: React.FC<HotelFormProps> = ({
  show,
  toggleModal,
  createHotel,
  updateHotel,
  hotel,
}) => {
  const [dHotel, setdHotel] = useState<Hotel>({
    id: 0,
    name: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    setdHotel(
      hotel || {
        id: 0,
        name: "",
        location: "",
        status: "",
      }
    );

    return () => {
      //cleanup
    };
  }, [hotel]);

  const handleChange = (e: any) => {
    // need a way to update date inputs
    const name = e.target.name;
    const value = e.target.value;
    setdHotel({ ...dHotel, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(e);
    if (dHotel.id) {
      updateHotel(dHotel, dHotel.id);
    } else {
      createHotel(dHotel);
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
                  {dHotel.id ? "Edit" : "Add"} Hotel
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
                  <label htmlFor="hotel-name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="hotel-name"
                    name="name"
                    onChange={handleChange}
                    value={dHotel.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="hotel-location" className="col-form-label">
                    Location:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="hotel-location"
                    name="location"
                    onChange={handleChange}
                    value={dHotel.location}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="hotel-status" className="col-form-label">
                    Status:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="hotel-status"
                    name="status"
                    onChange={handleChange}
                    value={dHotel.status}
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

export default HotelForm;
