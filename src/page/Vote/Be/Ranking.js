import { useEffect, useState } from "react";
import axios from "axios";
import "./Ranking.scss";
// import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";

// icon
import { FaMedal } from "react-icons/fa";

// 圖檔
import img1 from "../../../img/1.png";

function Ranking() {
  return (
    <div className="ranBg">
      {/* 標題 */}
      <nav
        className="row d-flex text-center text-nowrap align-items-center title mb-0 mx-0 "
        style={{ height: "60px" }}
      >
        <p className=" col-1  mb-0 pp"></p>
        <p className=" col-2  mb-0">排名</p>
        <p className=" col-2  mb-0">編號</p>
        <p className=" col-2  mb-0">姓名</p>
        <p className=" col-2  mb-0">黨派</p>
        <p className=" col-2  mb-0 ">得票數</p>
      </nav>
      {/* 排名 */}
      <div className="d-flex text-center text-nowrap pt-2 line1">
        <FaMedal size="20" className="d-flex justify-content-center col-2" />
        <p className="col-1  d-flex justify-content-center me-3 textColor-red">1</p>
        <nav className="row ww">
          <p className="lat col-3">10</p>
          <p className="lat col-3">宋小賀</p>
          <p className="lat col-3">民進黨</p>
          <p className="lat col-3 textColor-red">500</p>
        </nav>
      </div>
      {/* 詳細資訊 */}
      <div
        className="d-flex text-center text-nowrap line2 pt-2 "
        style={{ verticalAlign: "top" }}
      >
        <p className=" me-2 d-flex align-items-center p-1 textColor">得票詳細資訊</p>
        {/* <p>1</p> */}
        <nav className="row ww">
          <p className="lat col-3">
            北投
            <br />
            200
          </p>
          <p className="lat col-3">
            北投
            <br />
            200
          </p>
          <p className="lat col-3">
            北投
            <br />
            200
          </p>
          <p className="lat col-3">
            北投
            <br />
            200
          </p>
        </nav>
      </div>
      

      <img
        className=" img-fluid footerImg"
        src={require(`../../../img/1.png`)}
        alt={img1}
      />
      <div className="footerYellow"></div>
    </div>
  );
}

export default Ranking;
