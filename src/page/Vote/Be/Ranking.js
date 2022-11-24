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
  const [data, setData] = useState([]);
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
          <article>
            <p>
              <FaMedal size="20" />
            </p>
            <p>1</p>
            <p>宋小賀</p>
            <p>民進黨</p>
            <p>500</p>
          </article>
          <article>
            <p>
              <FaMedal size="20" />
            </p>
            <p>1</p>
            <p>宋小賀</p>
            <p>民進黨</p>
            <p>500</p>
          </article>
        </div>
      </div>
      <div className="right ">
        <nav>
          <h3>12號 選舉人</h3>
          <div className="button">
            <button>選區</button>
            <button>次要區</button>
            <button>里別</button>
            <button>計票所</button>
          </div>
        </nav>
        <div className="section">
          <div className="lItem">
            <div className="area">
              <div className="areaItem">
                <div>北投區</div>
                <div>12332</div>
              </div>
            </div>
            <div className="sub">
              <div className="subItem">
                <div>石牌次分區</div>
                <div>1234</div>
              </div>
              <div className="subItem">
                <div>石牌次分區</div>
                <div>1234</div>
              </div>
            </div>
            <div className="third">
              <div className="thirdItem">
                <div>石牌次分區</div>
                <div>1234</div>
              </div>
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
