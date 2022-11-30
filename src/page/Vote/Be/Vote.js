import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Vote.scss";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputIME from "./InputIME";
import Swal from "sweetalert";

// icons
import { RiAddFill } from "react-icons/ri";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
// 圖檔
import img1 from "../../../img/1.png";

function Vote({ name }) {
  const [data, setData] = useState([]);
  // 2. 用於網頁上經過各種處理(排序、搜尋、過濾)後的資料
  const [displayProducts, setDisplayProducts] = useState([]);

  const [ticket, seTicket] = useState([]);

  const [input, setInput] = useState("");

  //開票所狀態
  const [votePlace, setVotePlace] = useState([]);

  const [pop, setPop] = useState(true);

  // 搜尋
  const [searchWord, setSearchWord] = useState("");

  // 確認
  const [count, setCount] = useState("");

  const [susses, setSusses] = useState(false);

  // 搜尋：處理方法
  const handleSearch = (data, searchWord) => {
    let newProducts = [...data];
    if (searchWord.length) {
      newProducts = data.filter((product) => {
        return product.vote_name.includes(searchWord);
      });
    }
    return newProducts;
  };

  useEffect(() => {
    // 1.選擇開票所
    let votePlace1 = async () => {
      try {
        let res = await axios.get("http://localhost:3001/api/vote/vote_place");
        setData(res.data);
        setDisplayProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    votePlace1();
  }, [susses]);

  useEffect(() => {
    let newProducts = [...data];

    // 處理搜尋
    newProducts = handleSearch(newProducts, searchWord);
    setDisplayProducts(newProducts);
  }, [searchWord]);

  // 2.列出該開票所的候選人
  async function candidate(e) {
    try {
      let res = await axios.post(`http://localhost:3001/api/vote/candidate`, {
        votePlace: searchWord,
      });
      seTicket(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // 送出票數更新
  async function submit(v, i) {
    try {
      let response = await axios.patch(
        "http://localhost:3001/api/vote/cnt/patch",
        ticket
      );
      setSusses(false);
      console.log(response.data);
      Swal("成功", "已上傳票數", "success");
    } catch (err) {
      console.log(err.response.data);
    }
  }

  return (
    <div className="bg">
      <div className="d-flex justify-content-around pt-1 align-items-center title1 ">
        <div className="hight">
          <div className=" d-flex justify-content-between">
            <h5>計票人 {localStorage.getItem("name")}</h5>
            <div className="d-flex ">
              <button
                className="mx-1 submit"
                onClick={() => {
                  setSusses(true);
                  submit();
                }}
              >
                上傳投票數
              </button>
              {/* <h5 className="mx-1">結束</h5> */}
            </div>
          </div>

          <h5 className="d-flex justify-content-around align-items-center ">
            開票所
            <button
              className="text-color hh"
              style={{
                borderRadius: "100px",
                width: "250px",
                borderColor: "#a3a3a3",
              }}
              onClick={() => {
                setPop(true);
              }}
            >
              {votePlace}
            </button>
          </h5>
        </div>
      </div>
      <div className="line"></div>
      <div className="container1">
        {ticket.map((v, i) => {
          return (
            <div key={i} className=" text-center list mt-2 pb-1 ">
              <div className=" mt-2 ">
                <h5 className=" text-nowrap ">
                  {v.number}.{v.name}
                </h5>
                <div className="text-center">
                  <input
                    type="number"
                    className=" text-center hide-arrows input"
                    value={v.number_of_votes} //預設空值才不會報錯
                    onChange={(e) => {
                      setInput((v.number_of_votes = e.target.value));
                      setCount((v.cnt = name));
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footerPink"></div>
      {pop ? (
        <div className="pop">
          <div className="pop-inner ">
            <AiOutlineClose
              className="close"
              onClick={() => {
                setPop(false);
              }}
            />
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control "
                placeholder="關鍵字搜尋"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
              />

              <div className="select">
                {displayProducts.map((v, i) => {
                  return (
                    <div
                      key={v.id}
                      className={`d-flex  ${v.vote === "0" ? "" : "select-s"}`}
                    >
                      <div className="ms-2">{v.id}</div>
                      <div
                        className="ps-2 "
                        onClick={(e) => {
                          setSearchWord(v.vote_name);
                        }}
                      >
                        {v.vote_name}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className=" chick  mt-auto">
                <button
                  style={{ borderRadius: "100px" }}
                  onClick={() => {
                    setPop(false);
                    setVotePlace(searchWord);
                    candidate();
                  }}
                >
                  確定
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pop d-none">
          <div className="pop-inner">
            <AiOutlineClose
              onClick={() => {
                setPop(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Vote;
