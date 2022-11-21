import { useEffect, useState } from "react";
import axios from "axios";
import "./Login.scss";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// icons
import { IoIosArrowDropdownCircle } from "react-icons/io";

// 圖檔
import img2 from "../../../img/2.jpeg";

function Login({ name, setName, place }) {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   let candidate = async () => {
  //     try {
  //       let res = await axios.get("http://localhost:3001/api/vote/vote_place");

  //       setData(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   candidate();
  // }, []);

  async function submit(e) {
    // e.preventDefault();
    try {
      let response = await axios.post("http://localhost:3001/api/vote/login", {
        name: name,
        place: place,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  }
  return (
    <div className="logBg">
      <img
        className="loginImg "
        src={require(`../../../img/2.jpeg`)}
        alt={img2}
      />

      <Container className=" mt-5 d-flex justify-content-center align-items-center ">
        <form className="form mb-5">
          <div className="form-group mb-2">
            <label>計票人姓名</label>
            <input
              type="text"
              className="form-control"
              placeholder="請輸入姓名"
              style={{ borderRadius: "100px", width: "250px" }}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          {/* <div className="form-group ">
            <label>投票所</label>
            <div className="d-flex position-relative">
              <select
                className="form-control "
                style={{ borderRadius: "100px", width: "250px" }}
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                }}
              >
                <option>請選擇票所</option>
                {data.map((v, i) => {
                  return (
                    <option key={v.id} value={v.name}>
                      {v.name}
                    </option>
                  );
                })}
              </select>
              <div className="icon">
                <IoIosArrowDropdownCircle />
              </div>
            </div>
          </div> */}
          <div className="d-flex justify-content-center mt-4">
            <Link to="/vote">
              <button
                className="btn "
                style={{
                  borderRadius: "100px",
                  width: "200px",
                  backgroundColor: " #834D87",
                  color: "#fff",
                }}
                onClick={submit}
              >
                進入計票頁面
              </button>
            </Link>
          </div>
        </form>
      </Container>
      <Link to="/ranking">
        <button className=" btn btn-warning">查看排名</button>
      </Link>
      <div className="footerPink"></div>
    </div>
  );
}

export default Login;
