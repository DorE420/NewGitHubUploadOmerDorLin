import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VehiclesCss.css";

function NewVehicles({ trigger, setTrigger, addVehiclesItem, children }) {
  const [licensePlateNum, setLicensePlateNum] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState("");
  const [vehicleOwnership, setVehicleOwnership] = useState("");

  const licenseHandler = (e) => {
    setLicensePlateNum(e.target.value);
    console.log("setLicensePlateNum: " + e.target.value);
  };
  const vehicleHandler = (e) => {
    setVehicleType(e.target.value);
    console.log("vehicle Name: " + e.target.value);
  };

  const vehicleColorHandler = (e) => {
    setVehicleColor(e.target.value);
    console.log("Color: " + e.target.value);
  };
  const manufacturingYearHandler = (e) => {
    setManufacturingYear(e.target.value);
    console.log("Year: " + e.target.value);
  };
  const vehicleOwnershipHandler = (e) => {
    setVehicleOwnership(e.target.value);
    console.log("Ownership: " + e.target.value);
  };

  const saveHandler = (e) => {
    e.preventDefault();
    const newItemInput = {
      licensePlateNum: licensePlateNum,
      vehicleType: vehicleType,
      vehicleColor: vehicleColor,
      vehicleOwnership: vehicleOwnership,
      manufacturingYear: manufacturingYear,
      key: licensePlateNum,
    };

    console.log(newItemInput);
    addVehiclesItem(newItemInput);
    resetTextHandler();
    setTrigger(false);
  };
  const resetTextHandler = () => {
    setLicensePlateNum("");
    setVehicleType("");
    setVehicleColor("");
    setManufacturingYear("");
    setVehicleOwnership("");
  };
  const closeForm = () => {
    setTrigger(false);
  };

  return trigger ? (
    <div id="vehiclesPopUp">
      <div id="vehiclesInnerPopUp">
        <div className="headerInnerPopUp">
          <HighlightOffIcon onClick={closeForm} />
          <h1>הוספת רכב חדש</h1>
        </div>
        <div id="mainInfoPopUp">
          <div className="rightInnerPopUp">
            <div className="inputsInfo">
              <label>מספר רישוי רכב</label>
              <input
                placeholder="מספר רכב"
                type="text"
                value={licensePlateNum}
                onChange={licenseHandler}
              />
            </div>
            <div className="inputsInfo">
              <label>סוג רכב</label>
              <input
                placeholder="סוג רכב"
                type="text"
                value={vehicleType}
                onChange={vehicleHandler}
              />
            </div>
            <div className="inputsInfo">
              <label>שנת ייצור</label>
              <input
                placeholder="שנת יצור"
                type="text"
                value={manufacturingYear}
                onChange={manufacturingYearHandler}
              />
            </div>
            <div className="inputsInfo">
              <label>צבע רכב</label>
              <input
                placeholder="צבע רכב"
                type="text"
                value={vehicleColor}
                onChange={vehicleColorHandler}
              />
            </div>
            <div className="inputsInfo">
              <label>בעלות הרכב</label>
              <input
                placeholder="בעלות רכב"
                type="text"
                value={vehicleOwnership}
                onChange={vehicleOwnershipHandler}
              />
            </div>
            <div className="inputsInfo">
              <Button className="login_Button" onClick={saveHandler}>
                {" "}
                שמירת רכב חדש
              </Button>
            </div>
          </div>

          <div className="leftInnerPopUp">
            <label>העלאת מסמכים</label>

            <div className="inputsInfo">
              <label>רישיון רכב</label>
              <input type={"file"} />
            </div>

            <div className="inputsInfo">
              <label>ביטוח רכב</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default NewVehicles;