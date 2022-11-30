import { useEffect, useState } from "react";
import axios from "axios";
import "./Ranking.scss";
// import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";

// icon
import { FaMedal } from "react-icons/fa";

// 圖檔
import img1 from "../../../img/1.png";
import context from "react-bootstrap/esm/AccordionContext";

// TODO:先取得編號 在把編號 POST 到後端 取的該編號的投票資料

function Ranking() {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState("1");
  const [numberData, setNumberData] = useState([]);
  //北投 士林區
  const [lConstituency, setLConstituency] = useState([]);
  //次分區
  const [lSub, setLSub] = useState([]);
  //鄰里別
  const [lNeighbor, setLNeighbor] = useState([]);

  useEffect(() => {
    // 1.選擇開票所
    let votePlace1 = async () => {
      try {
        let res = await axios.get("http://localhost:3001/api/vote/ranking");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    votePlace1();
  }, []);
  useEffect(() => {
    // 送出編號更新區域
    async function submit() {
      try {
        let response = await axios.post(
          "http://localhost:3001/api/vote/ranking/number",
          { number: number }
        );

        setNumberData(response.data.data);
        setLConstituency(response.data.lConstituency);
        setLSub(response.data.lSub);
        setLNeighbor(response.data.lNeighbor);
        console.log(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    }
    submit();
  }, [number]);

  return (
    <div className="top">
      {/* 標題 */}

      <div className="time">
        <div>鍾佩玲服務處開票中心系統</div>
        <div>更新時間:</div>
      </div>

      {/* 排名 */}
      <div className="left ">
        <nav>
          <div>
            <FaMedal size="20" />
          </div>
          <p>編號</p>
          <p>姓名</p>
          <p>黨派</p>
          <p>得票數</p>
        </nav>
        <div className="leftItems">
          {data.map((v, i) => {
            return (
              <article key={i}>
                <div>
                  <FaMedal size="20" />
                </div>
                <p>{v.number}</p>
                <p
                  onClick={() => {
                    setNumber(v.number);
                  }}
                >
                  {/*TODO: 可以試看看 class={`${]`} 分黨配顏色 */}
                  {v.name}
                </p>
                <p>{v.partisan}</p>
                <p>{v.total}</p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="right ">
        {numberData.map((v, i) => {
          return (
            <nav key={i}>
              <h3>{v.number}號 選舉人</h3>
              <div className="button">
                <button>選區</button>
                <button>次要區</button>
                <button>里別</button>
                <button>計票所</button>
              </div>
            </nav>
          );
        })}

        <div className="section">
          <div className="lItem">
            <div className="area">
              {lConstituency.map((v, i) => {
                return (
                  <div key={i} className="areaItem">
                    <div>北投區</div>
                    <div>{v.a}</div>
                  </div>
                );
              })}
            </div>
            <div className="sub">
              {lSub.map((v, i) => {
                return (
                  <div key={i} className="subItem">
                    <div>{v.sub}次分區</div>
                    <div>{v.vote}</div>
                  </div>
                );
              })}
            </div>

            <div className="third">
              {lNeighbor.map((v, i) => {
                return (
                  <div key={i} className="thirdItem">
                    <div>{v.neighbor}次分區</div>
                    <div>{v.vote}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rItem">
            <div className="area">
              <div className="areaItem">
                <div>士林區</div>
                <div>12332</div>
              </div>
            </div>
            <div className="sub">
              <div className="subItem">
                <div>石牌次分區</div>
                <div>1234</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="footerYellow"></div> */}
    </div>
  );
}

export default Ranking;
