import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Vote.scss";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputIME from "./InputIME";

// icons
import { RiAddFill } from "react-icons/ri";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
// 圖檔
import img1 from "../../../img/1.png";

function Vote({ name, place, setPlace }) {
  const [data, setData] = useState([]);

  // 2. 用於網頁上經過各種處理(排序、搜尋、過濾)後的資料
  const [displayProducts, setDisplayProducts] = useState([]);

  const [ticket, seTicket] = useState([
    { count: name, votePlace: place, name: "", vote: 0 },
    // { count: name, votePlace: place, name: "候選人2", vote: 0 },
    // { count: name, votePlace: place, name: "候選人3", vote: 0 },
  ]);

  const [input, setInput] = useState("");

  const [votePlace, setVotePlace] = useState([]);

  const [pop, setPop] = useState(false);

  const [select, setSelect] = useState(true);

  // 搜尋
  const [searchWord, setSearchWord] = useState("");
  console.log("searchWord,", searchWord);

  // 搜尋：處理方法
  const handleSearch = (products, searchWord) => {
    let newProducts = [...products];
    if (searchWord.length) {
      newProducts = products.filter((product) => {
        return product.name.includes(searchWord);
      });
    }

    return newProducts;
  };

  useEffect(() => {
    // 1.選擇開票所
    let votePlace = async () => {
      try {
        let res = await axios.get("http://localhost:3001/api/vote/vote_place");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    // 2.列出該開票所的候選人
    let candidate = async () => {
      try {
        let res = await axios.get("http://localhost:3001/api/vote/candidate");
        seTicket(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    candidate();
    votePlace();
  }, []);

  useEffect(() => {
    let newProducts = [...data];

    // 處理搜尋
    newProducts = handleSearch(newProducts, searchWord);
    setDisplayProducts(newProducts);
  }, [searchWord]);

  async function submit(v, i) {
    try {
      let response = await axios.patch(
        "http://localhost:3001/api/vote/cnt/patch",
        ticket
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  return (
    <div className="bg">
      <div className="d-flex justify-content-around pt-1 align-items-center title1 ">
        <div className=" mt-4 hight">
          <h5 className="">計票人 : {name}</h5>

          <h5 className="d-flex justify-content-around align-items-center ">
            開票所 :
            <button
              className="text-color hh"
              style={{ borderRadius: "100px", width: "250px" }}
              onClick={() => {
                setPop(true);
              }}
            >
              {votePlace}
            </button>
          </h5>
        </div>

        {/* <button className=" vote text-nowrap px-3">計票開始</button>
        <button className=" vote text-nowrap px-3" onClick={submit}>
          計票結束
        </button> */}
      </div>

      <div className="line"></div>
      {ticket.map((v, i) => {
        return (
          <Item
            key={i}
            seTicket={seTicket}
            setInput={setInput}
            v={v}
            i={i}
            input={input}
            ticket={ticket}
          />
        );
      })}

      {/* <img className="img img-fluid footerImg"  src={require(`../../../img/1.png`)} alt={img1} /> */}
      <div className="footerPink"></div>
      {pop ? (
        <div className="pop">
          <div className="pop-inner">
            <AiOutlineClose
              onClick={() => {
                setPop(false);
              }}
            />
            <div className="form-group ">
              <input
                type="text"
                className="form-control"
                placeholder="關鍵字搜尋"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                onClick={() => {
                  setSelect(true);
                }}
              />



              {select ? (
                <div className="select">
                  {displayProducts.map((v, i) => {
                    return (
                      <div
                        key={v.id}
                        className="ps-3 select-h"
                        onClick={(e) => {
                          setSearchWord(v.vote_name);
                        }}
                      >
                        {v.vote_name}
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-center align-items-center mt-3">
                <button
                  style={{ borderRadius: "100px" }}
                  onClick={() => {
                    setPop(false);
                    setVotePlace(place);
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
//1
function Item({ seTicket, v, i, setInput, input, ticket }) {
  return (
    <div className="row align-items-center list mx-0">
      <div className="col-3">
        <h3 className="p text-nowrap text-center">{v.name}</h3>
        <div className="text-center">
          <h3 className="text-nowrap p">計票數</h3>
          <p className="text-nowrap p text-color count">{v.vote}</p>
        </div>
      </div>
    </div>
  );
}
//2
function Items({ seTicket, v, i, setInput, input }) {
  return (
    <div className="row align-items-center list mx-0">
      {/* <input
        type="number"
        className="col-3 me-md-5 "
        value={v.input || ""} //預設空值才不會報錯
        onChange={(e) => {
          setInput((v.input = e.target.value));
        }}
      /> */}

      <RiAddFill
        size="15"
        className="col px-0 voteBox mx-1"
        onClick={() => {
          seTicket((prev) => {
            const newState = [...prev];
            newState[i].vote = Number(v.vote) + 1;
            return newState;
          });
        }}
      />
      <input
        type="number"
        className="col"
        value={v.input || ""} //預設空值才不會報錯
        onChange={(e) => {
          setInput((v.input = e.target.value));
        }}
      />

      <AiOutlineMinus
        size="15"
        className="col px-0 voteBox mx-1"
        onClick={() => {
          seTicket((prev) => {
            const newState = [...prev];
            if (newState[i].vote > 0) {
              newState[i].vote = Number(v.vote) - 1;
            } else {
              newState[i].vote = Number(v.vote);
            }
            return newState;
          });
        }}
      />
      {/* 撈資料庫id 再送出 */}
      <button
        className="col voteBox mx-1 text-nowrap"
        onClick={() => {
          seTicket((current) => {
            const newState = [...current]; //淺拷貝陣列 初始型態是陣列
            newState[i].vote += Number(input);
            return newState;
          });
          setInput((v.input = ""));
        }}
      >
        送出
      </button>
      <div className="col text-center">
        <p className="text-nowrap p">計票數</p>
        <p className="text-nowrap p text-color count">{v.vote}</p>
      </div>
    </div>
  );
}

// function SearchBar({ setSelect }) {
//   const { searchWord, setSearchWord } = useState("");
//   return (
//     <div
//       className="input-group bg-main-light-color searchBar-box"
//       onClick={() => {
//         setSelect(true);
//       }}
//     >
//       {/* 桌機、手機的輸入會無法同步 要用input*/}
//       <input
//         type="text"
//         className="form-control"
//         placeholder="關鍵字搜尋"
//         value={searchWord}
//         onChange={(e) => setSearchWord(e.target.value)}
//       />
//       <span className="search-btn position-relative cursor-pointer">
//         {/* <Search className="search-icon-color position-absolute top-50 start-50 translate-middle" /> */}
//       </span>
//     </div>
//   );
// }

export default Vote;
