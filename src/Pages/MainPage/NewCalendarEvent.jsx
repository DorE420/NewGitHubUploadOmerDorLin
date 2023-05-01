import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataTable from "react-data-table-component";


const urlGetInventories = 'http://194.90.158.74/cgroup96/prod/api/inventoryItems/get?timestamp=' + Date.now();
const urlGetCustomers = 'http://194.90.158.74/cgroup96/prod/api/customers/get';
const username = 'cgroup96';
const password = 'your_password';

const headers = new Headers();
headers.append('Authorization','Basic' + btoa(username + ":" + password));

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("he-IL", options);
};

const NewCalendarEvent = ({trigger, setTrigger, date, onSave, children}) => {


  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  
  const [dataInfoCustomers, setDataInfoCustomers] = useState([]);
  const [dataInfoInventories, setDataInfoInventories] = useState([]);

  useEffect(() => {
    fetch(urlGetCustomers, {
      method: 'GET',
      headers: headers
    })
    .then(res => {
      console.log('res = ', res);
      console.log('res.status', res.status);
      console.log('res.ok', res.ok);
      return res.json()
    })
    .then(result => {
      console.log("fetch customer = ", result);
      const updatedDatainfo = result.map(st => {
        return{
          costumerNum: st.clientNumber,
          costumerName: st.clientName,
          costumerRepresentitveName: st.clientFirstName,
          costumerRepresentitveSurName: st.clientLastName,
          costumerRepresentitvePhone: st.clientPhoneNum,
          costumerRepresentitveEmail: st.representiveEmail,
        };
    });
    console.log(updatedDatainfo);
    setDataInfoCustomers(updatedDatainfo);
  })
  .catch(error => {
    console.log("Err post = ", error);
  });
  },[]);
  
  useEffect(() => {
    fetch(urlGetInventories, {
      method: 'GET',
      headers: headers
    })
    .then(res => {
      console.log('res=', res);
      console.log('res.status', res.status);
      console.log('res.ok', res.ok);
      return res.json()
    })
    .then( result => {
      console.log("fetch inventoryItems= ", result);
      result.map(st => console.log(st.itemAmount));
      const updatedDatainfo = result.map(st => {
        return{
          itemSerialNum: st.itemSerialNum,
          itemName: st.itemName,
          itemAmount: st.itemAmount,
        };
      });
      console.log(updatedDatainfo);
      setDataInfoInventories(updatedDatainfo);
    })
    .catch(error => {
      console.log("err post = ", error);
    });
  }, []);

  const columnsCustomers = [
    {
      name : "",
      selector : "checkcCostumer",
      sortable: false,
      right: true,
      width: '10%',
      cell: ((row) =>
       <input type="checkbox"
              checked={row.isSelected}/>),
    },
    {
      name : "שם חברה",
      selector : "costumerName",
      sortable: true,
      right: true,
      width: '30%',
    },
    {
      name : "פרטי איש קשר",
      selector : "costumerRepresentitvePhone",
      right: true,
      width: '60%',
      cell: (row) => (
        <div>
          <div>
            {row.costumerRepresentitveName}{" "}
            {row.costumerRepresentitveSurName}
          </div>
          <div>{row.costumerRepresentitvePhone}</div>
          <div>{row.costumerRepresentitveEmail}</div>
        </div>
      ),
      
    },
  ]
  const reversedColumnsCustomer = [...columnsCustomers].reverse();


  const handleRowSelectedCostumers = (rows) => {
    console.log('Selected Rows:', rows);
  };
  const conditionalRowStylesCustomers = [
    {
      when: (row) => row.isSelected,
      style: {
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
      },
    },
  ];

  const columnsInventories =[
    {
      name : "",
      selector : "checkcCostumer",
      sortable: false,
      right: true,
      width: '5%',
      cell: ((row) =>
       <input type="checkbox"
              checked={row.isSelected}/>),
    },
    {
      name: "מסד",
      selector: "itemSerialNum",
      sortable: true,
      center: true,
      width: '25%',
    },
    {
      name: "שם המוצר",
      selector: "itemName",
      sortable: true,
      right: true,
      width: '40%',
    },
    {
      name: "כמות",
      selector: "selectAmount",
      center: true,
      width: '25%',
      cell: ((row) => 
        <input type="text"
               className="textInputAmount"/>),
    },
  ]
  const reversedColumnsInventories = [...columnsInventories].reverse();




  const [currentStep, setCurrentStep] = useState(1);
  const handleNext = () => {
      setCurrentStep(prevStep => prevStep + 1);
  };
  const handlePrevious = () => {
      setCurrentStep(prevStep => prevStep - 1);
  };


  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
    console.log("Title:" + event.target.value);
  };
  const timeChangehandler = (event) => {
    setTime(event.target.value);
    console.log("Time:" + event.target.value);
  };
  const placeChangeHandler = (event) => {
    setPlace(event.target.value);
    console.log("Place:" + event.target.value);
  };
  const handleSave = (e) => {
    e.preventDefault();
      const newEvents = {
        event_name: title,
        event_startdate: time,
        event_address: place,
      };
      console.log("*************************");
      console.log(newEvents);
      onSave(newEvents);
      setTrigger(false);
      {/*console.log("New Event" + title, date, time, place);*/}
  };
  const closeForm = () => {
    setTrigger(false);
  };

  return(
    <div className="popUpEvents">
      <div className="innerPopUpEvents">

          <div className="innerEvents1">
            <HighlightOffIcon onClick={closeForm} />
          </div>

          <div className="innerEvents2">
            <h1>יצירת אירוע חדש</h1>
          </div>

          <div className="innerEvents3">

          {currentStep === 1 && (
            <>
              <div className="Step1Main">

                <div className="Step1MainInner1">
                  <h1>אנא מלא את פרטי האירוע</h1>
                </div>

                <div className="Step1MainInner2">

                  <div className="divInfoInput">
                    <input id="eventName"
                           type="text"
                           value={title}
                           placeholder="שם אירוע"
                           onChange={titleChangeHandler}
                           />
                  </div>

                  <div className="divInfoInput">
                    <input
                      id="time-input"
                      type="time"
                      value={time}
                      onChange={timeChangehandler}
                      placeholder="זמן תחילת אירוע"
                    />
                  </div>

                  <div className="divInfoInput">
                    <input
                      id="time-input"
                      type="time"
                      value={time}
                      onChange={""}
                      placeholder="הכנס זמן סיום אירוע"
                    />
                  </div>

                  <div className="divInfoInput">
                    <input
                      id="place-input"
                      type="text"
                      value={place}
                      onChange={placeChangeHandler}
                      placeholder="כתובת אירוע"
                    />
                  </div>
                </div>
              </div>

              <div className="Step1Bottum">
                <ArrowBackIcon onClick={handleNext}/>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="Step2Main">

                <div className="Step2MainInner1">
                  <h1>אנא בחר את לקוח האירוע</h1>
                </div>

                <div className="Step2MainInner2">
                  <DataTable columns={reversedColumnsCustomer}
                             data={dataInfoCustomers}
                             onSelectedRowsChange={handleRowSelectedCostumers}
                             conditionalRowStyles={conditionalRowStylesCustomers}
                             className="dataTableCustomers"
                             fixedHeader/>
                </div>
              </div>

              <div className="Step2Bottum">
                <ArrowBackIcon onClick={handleNext}/>
                <ArrowForwardIcon onClick={handlePrevious}/>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
            <div className="Step3Main">

              <div className="Step3MainInner1">
                <h1>אנא בחר מוצר/ים וכמות</h1>
              </div>

              <div className="Step3MainInner2">
                <DataTable columns={reversedColumnsInventories}
                           data={dataInfoInventories}
                           fixedHeader
                           className="dataTableCustomers"/>
              </div>
            </div>

            <div className="Step3Bottum">
              <Button type="button" onClick={handleSave}>שמירה</Button>
              <ArrowForwardIcon onClick={handlePrevious}/>
            </div>
            </>
          )}
          </div>
      </div>
    </div>
  );
};

export default NewCalendarEvent;





{/*          
            


              <label htmlFor="time-input">תאריך ושעת תחילת אירוע</label>
              <input
                id="time-input"
                type="time"
                value={time}
                onChange={timeChangehandler}
                placeholder="הכנס זמן תחילת אירוע"
              />
              <br />
              <label htmlFor="time-input">תאריך ושעת סיום אירוע</label>
              <input
                id="time-input"
                type="time"
                value={time}
                onChange={""}
                placeholder="הכנס זמן סיום אירוע"
              />
              <br />
              <label htmlFor="place-input">מקום:</label>
              <input
                id="place-input"
                type="text"
                value={place}
                onChange={placeChangeHandler}
                placeholder="הכנס מיקום לאירוע"
              />
              <br />
              <label htmlFor="place-input">שם לקוח</label>
              <input
                id="place-input"
                type="select"
                value={place}
                onChange={""}
                placeholder="הכנס מיקום לאירוע"
              />
              </div>

              <div className="innerEvents4">
              </div>
            
            
            { title, date, time, place }*/}
