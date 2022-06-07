import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { Input, Select, Pagination } from "antd";
import squareoff from '../../Assets/Images/squareoff.png'
import "./OpenPositions.scss";
import { HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  getOpenPositions,
  squareOffOrder,
} from "../../Redux/Actions/positionsActions";
const { Option } = Select;

function OpenPositions(props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [symbolType, setSymbolType] = useState();
  const [postions, setPostions] = useState([]);
  const [positionsData, setPositionsData] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const positions = useSelector((state) => state.Positions.positions);
  const positionsLoading = useSelector(
    (state) => state.Positions.loadingGetPositions
  );

  const loadingSquareOffPosition = useSelector(
    (state) => state.Positions.loadingSquareOffPosition
  );
  const postionsOptionsData = useSelector(
    (state) => state?.DayTrading?.postionsOptions
  );

  useEffect(() => {
    dispatch(getOpenPositions());
  }, []);

  useEffect(() => {
    setPositionsData(positions || []);
  }, [positions]);

  const onSquareOfOrder = (record) => {
    const data = {
      Bqty: record?.Bqty,
      Sqty: record?.Sqty,
      PCode: record?.PCode,
      broker_client_id: record?.broker_client_id,
      Tsym: record?.Tsym,
      exchange: record?.exchange,
      entry_price: record?.entry_price,
    };
    dispatch(
      squareOffOrder(
        data,
        () => {
          message.success("Squred off successfully..");
          dispatch(getOpenPositions());
        },
        (error) => {
          message.error(error || "Failed to square off order..");
        }
      )
    );
  };

  const columns = [
    {
      title: "EXCHANGE",
      dataIndex: "exchange",
      key: "exchange",
      align: "center",
      
    },
    {
      title: "ORDER TYPE",
      dataIndex: "PCode",
      key: "PCode",
      align: "center",
      sortDirections: [ 'ascend','decend'],
      sorter: (a, b) => a.PCode.localeCompare(b.PCode),
      
    },
    {
      title: "SYMBOL NAME",
      dataIndex: "Tsym",
      key: "Tsym",
      align: "center",
      sortDirections: [ 'ascend','decend'],
      sorter: (a, b) => a.Tsym.localeCompare(b.Tsym),
    },
    {
      title: "BUY QTY",
      key: "Bqty",
      dataIndex: "Bqty",
      align: "center",
  
    },
    {
      title: "SELL QTY",
      key: "Sqty",
      dataIndex: "Sqty",
      align: "center",
     
    },
    {
      title: "LTP",
      key: "ltp",
      dataIndex: "ltp",
      align: "center",
      sorter: (a, b) => a.ltp - b.ltp,
      render: (val, record) => <div title={'ltp: ' + val} >{val}
          </div>
    },
    {
      title: "P&L",
      key: "MtoM",
      dataIndex: "MtoM",
      align: "center",
      render: (text, record) => (
        <div className={`pl_cell ${text >= 0 ? "green" : "red"}`}>
          <span>{text > 0 ? `+${text}` : `${text}`}</span>
        </div>
      ),
    },
    {
      title: "SQUARE OFF",
      key: "action",
      dataIndex:"action",
      align: "center",
      render: (text, record) =>
       (
          <img src={squareoff} alt=""
            onClick={() => onSquareOfOrder(record)}
            className="square-off-icon"
          />
        
        )
      
    },
  ];

  const data =[
    {
      exchange:"NSC",
      PCode:"NORMAL",
      Tsym:"HDFC BANK",
      Bqty:20,
      Sqty:20,
      ltp:2500,
      MtoM:25

    },
    {
      exchange:"NSC",
      PCode:"MIS",
      Tsym:"HDFC BANK",
      Bqty:20,
      Sqty:20,
      ltp:2000,
      MtoM:25

    },
    {
      exchange:"NSC",
      PCode:"MIS",
      Tsym:"HDFC BANK",
      Bqty:20,
      Sqty:20,
      ltp:3000,
      MtoM:25

    },
    {
      exchange:"NSC",
      PCode:"NORMAL",
      Tsym:"HDFC BANK",
      Bqty:20,
      Sqty:20,
      ltp:1000,
      MtoM:25

    }
  ]

  return (
    <div className="strategic-main-wrap">
      <div className="intraday-signal-scanner-main-wrap">
        <div className="table-top-panel-section">
          <div className="left-section">
            <Select
              className="options-select"
              value={positions}
              allowClear
              onClear={() => setPostions(undefined)}
              onChange={(value) => setPostions(value)}
              placeholder="Select User"
            >
              {postionsOptionsData?.map((item) => {
                return (
                  <Option key={item?.id} value={item?.UserName}>
                    {item?.UserName}
                  </Option>
                );
              })}
            </Select>
            <Select
              value={symbolType}
              onChange={(value) => setSymbolType(value)}
              className="buy-sell-select"
              placeholder="Select Symbols"
              allowClear
              onClear={() => setSymbolType(undefined)}
            >
              <Option value={"kotakbank-eq"}>KOTAKBANK-EQ</Option>
              <Option value={"infy-eq"}>INFY-EQ</Option>
              <Option value={"sbin-eq"}>SBIN-EQ</Option>
            </Select>
          </div>
          <div className="right-section">
            <Input
              className="search-input"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              suffix={<HiSearch />}
            />
          </div>
        </div>
        <div className="table-wrap">
          <Table
            loading={positionsLoading || loadingSquareOffPosition}
            columns={columns}
            dataSource={ data }
            pagination={false}
          />
       
        <div className="pagination-wrap">
        <Pagination
            pageSize={pageSize}
            current={page}
            showSizeChanger={false}
            onChange={(page) => setPage(page)}
            total={data?.length}
          />
          <span className="rows-per-page-title">Rows per page:</span>
          <Select
            className="page-select"
            value={pageSize}
            onChange={(value) => setPageSize(value)}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
          <span className="page-range">
            {(page - 1) * pageSize + 1}-
            {(page - 1) * pageSize + pageSize > data?.length
              ?data?.length
              : (page - 1) * pageSize + pageSize}{" "}
            of {data?.length}
          </span>
        </div>
        </div>
      </div>
    </div>
  );
}

export default OpenPositions;
