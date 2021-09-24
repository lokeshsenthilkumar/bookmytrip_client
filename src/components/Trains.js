import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Table from "react-bootstrap/Table";
import style from "./styles";
import ReactPaginate from "react-paginate";
import DeleteIcon from "@material-ui/icons/Delete";
import { CSVLink } from "react-csv";

export default function Trains(props) {
  const history = useHistory();

  var who = props.who;

  const url = "https://bookmytrippp.herokuapp.com/getTrains";
  const [res, setRes] = useState(null);
  const [sortName, setSortName] = useState(0);
  const [sortPrice, setSortPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [limit, setLimit] = useState(10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [docsCount, setDocsCount] = useState(0);

  useEffect(() => {
    const filter = {
      minPrice,
      maxPrice,
      limit,
      from,
      to,
      sortName,
      sortPrice,
      pageNumber,
      searchTerm
    };
    axios
      .post(url, filter, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setRes(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [minPrice, maxPrice, limit, from, to, sortName, sortPrice, pageNumber, searchTerm]);

  useEffect(() => {
    console.log("counting docs");
    axios
      .get("https://bookmytrippp.herokuapp.com/countdocs", { withCredentials: true })
      .then((response) => {
        console.log(response);
        setDocsCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddTrain = () => {
    history.push("/addtrain");
    // window.location = "/addtrain";
  };

  const handleMinPrice = (e) => {
    console.log(e.target.value);
    setMinPrice(e.target.value);
  };

  const handleMaxPrice = (e) => {
    console.log(e.target.value);
    setMaxPrice(e.target.value);
  };

  const handleLimit = (e) => {
    console.log(e.target.value);
    setLimit(parseInt(e.target.value));
  };

  const handleFrom = (e) => {
    console.log(e.target.value);
    setFrom(e.target.value);
  };

  const handleTo = (e) => {
    console.log(e.target.value);
    setTo(e.target.value);
  };

  const handleSortName = (e) => {
    setSortPrice(0);
    if (sortName == 0 || sortName == -1) setSortName(1);
    else setSortName(-1);
  };

  const handleSortPrice = (e) => {
    setSortName(0);
    if (sortPrice == 0 || sortPrice == -1) setSortPrice(1);
    else setSortPrice(-1);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (x) => {
    // window.location = 'user/book/'+x;
    history.push("/user/book/"+x);
  };

  const handleRemove = (x) => {
    const id = x._id;
    axios
      .post("https://bookmytrippp.herokuapp.com/cancelTrain", { id })
      .then(function (response) {
        console.log("Responded");
        //window.location.reload(false);
        console.log(response);
      })
      .catch(function (err) {
        console.log("No response");
        console.log(err);
      });

    window.location.reload(false);
    //alert('Booking Cancelled');
  };

  const headers = [
    { label: "Train No", key: "trainNo" },
    { label: "Train Name", key: "trainName" },
    { label: "From", key: "from" },
    { label: "To", key: "to" },
    { label: "Price", key: "price" },
  ];

  let csvReport = {};

  if (res) {
    csvReport = {
      filename: "Trains.csv",
      headers: headers,
      data: res.data,
    };
  }

  const displayTrains =
    res &&
    res.data.map((trains, index) => (
      <tr>
        <td>{index + 1}</td>
        <td>{trains.trainNo}</td>
        <td id="bookbtn" onClick={() => handleClick(trains.trainNo)}>
          {trains.trainName}
        </td>
        <td>{trains.from}</td>
        <td>{trains.to}</td>
        <td>{trains.price} ₹</td>
        {who === "admin" && (
          <td
            onClick={() => {
              handleRemove(trains);
            }}
          >
            {" "}
            &nbsp; &nbsp; <DeleteIcon style={{ color: "#DB4839" }}></DeleteIcon>
          </td>
        )}
      </tr>
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <nav
        id="userNavbar"
        className="navbar navbar-light bg-light"
        style={{ paddingLeft: "20px" }}
      >
        <Link id="furnitureHomeButton" className="navbar-brand" to="/">
          <span style={{ fontSize: 20, color: "grey" }}>
            <i class="fas fa-train"></i>{" "}
            <span className="navbar-brand mb-0 h1" style={{ color: "#B1BD5D" }}>
              bookmytrip
            </span>
          </span>
        </Link>

        <span>
          {who == "admin" ? (
            <Link
              className="navbar-brand"
              to="/admin"
            >
              <span style={{ fontSize: 20, color: "grey" }}>
                <i class="fas fa-subway"></i>
              </span>{" "}
              <p style={{ display: "inline", color: "#B1BD5D" }}>Trains</p>
            </Link>
          ) : (
            <>


            <Link
              className="navbar-brand"
              to="/user/mybookings"
            >
              <span style={{ fontSize: 20, color: "grey" }}>
                <i class="fas fa-ticket-alt"></i>
              </span>{" "}
              <p style={{ display: "inline", color: "#B1BD5D" }}>My Bookings</p>
            </Link>
          </>
          )}

          <span style={{ fontSize: 20, color: "grey" }}>
            <i class="fas fa-sign-out-alt"></i>
          </span>
          <Link
            className="navbar-brand"
            to="/logout"
            style={{ fontSize: 20, color: "#B1BD5D" }}
          >
            &nbsp;Logout
          </Link>
        </span>
      </nav>
      
      <div className="body">

      

      <div id="util">
        <input
          id="searchbar"
          placeholder="Search trains..."
          class="form-control"
          type="text"
          onChange = {handleSearchTerm}
          value = {searchTerm}
        ></input>
        {who === "admin" && (
        <span style={{marginLeft:20}}>
          <button className="btn btn-primary" onClick={handleAddTrain}>
            Add Train
          </button>
        </span>
      )}
      </div>
      <div id="priceFilter">
        <label for="minPrice">Min Price: &nbsp; </label>
        <input
          id="minPrice"
          placeholder="Min price"
          class="form-control"
          type="number"
          onChange={handleMinPrice}
          value={minPrice}
        ></input>
        <label for="minPrice">Max Price: &nbsp;</label>
        <input
          id="maxPrice"
          placeholder="Max price"
          class="form-control"
          type="number"
          onChange={handleMaxPrice}
          value={maxPrice}
        ></input>

        <select
          id="fromDD"
          class="form-select"
          aria-label="Default select example"
          style={{ width: "150px", display: "inline", marginRight: "20px" }}
          onChange={handleFrom}
        >
          <option selected value="">
            From
          </option>
          <option value="Chennai">Chennai</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>
        <select
          id="toDD"
          class="form-select"
          aria-label="Default select example"
          style={{ width: "150px", display: "inline" }}
          onChange={handleTo}
        >
          <option selected value="">
            To
          </option>
          <option value="Chennai">Chennai</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>

        {res && (
          <CSVLink
            {...csvReport}
            style={{ color: "white", textDecoration: "none" }}
          >
            {" "}
            <button
              className="btn btn-primary shadow-none"
              style={{
                marginLeft: "20px",
                marginBottom: "5px",
                backgroundColor: "#bdc767",
                border: "none",
              }}
            >
              {" "}
              <i class="fas fa-download" style={{ fontSize: "20px" }}></i>{" "}
            </button>
          </CSVLink>
        )}
      </div>

      <div style={style.tab}>
        <Table
          striped
          bordered
          hover
          style={{ width: "1000px", backgroundColor: "white" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Train No.</th>
              <th>
                Train Name &nbsp;
                <i class="fas fa-sort" onClick={handleSortName}></i>
              </th>
              <th>From</th>
              <th>To</th>
              <th>
                Price &nbsp;
                <i class="fas fa-sort" onClick={handleSortPrice}></i>
              </th>
              {who == "admin" && <th>Remove &nbsp;</th>}
            </tr>
          </thead>
          <tbody>{displayTrains}</tbody>
        </Table>

        <div style={{display:"flex",justifyContent:"space-between",width:"1010px",paddingBottom:"30px"}}>
          <select
            className="form-select"
            name="limit"
            id="limit"
            onChange={handleLimit}
            style={{ width: "130px", display: "inline", height:"40px" }}
          >
            <option value="10">10 / page</option>
            <option value="15">15 / page</option>
            <option value="100">All</option>
          </select>

          <div>
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={res && Math.ceil(docsCount / limit)}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
          
        </div>
      </div>
    </div>
  </div>
  );
}
