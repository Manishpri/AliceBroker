import React, { useState } from "react";
import copy from "copy-to-clipboard";  
import {
  Switch,
  Table,
  Select,
  Button,
  Input,
  InputNumber,
  Pagination,
} from "antd";
import action_2 from '../../Assets/Images/action_2.svg'
import copyicon from "../../Assets/Images/copyicon.png";
import "./ChartingApiKey.scss";

const { Option } = Select;

function ChartingApiKey(props) {
  const [page, setPage] = useState(1);
  const [copyText, setCopyText] = useState();
  const [generatekey,setGeneratekey] =useState("");
  const [pageSize, setPageSize] = useState(10);
  
 
  const copyToClipboard  =  () => {
  copy(copyText);
  alert(`You have copied "${copyText}"`);
    
  }

  const GenerateKey =()=>{
    setGeneratekey();
  }
  const columns = [
    {
      title: "#",
      dataIndex: "user_count",
      key: "user_count",
      align: "center",
      sortDirections:["ascend"],
      width:"30px",
      sorter: {
        compare: (a, b) => a.user_count - b.user_count,
        
      },
      
    },
    {
      title: "GROUP_NAME",
      dataIndex: "group_name",
      key: "group_name",
      align: "center",
      width:"70px",
      sorter: (a, b) => a.group_name.length - b.group_name.length
      
      
    },
    
    {
      title: "USER KEY",
      dataIndex: "user_kay",
      key: "user_kay",
      value:{copyText},
      align: "center",
      width:"100px",
    
      
      render: (text) => (
        <>
          <span>
            {text}
            <img  onClick={copyToClipboard  } 
              src={copyicon}
              alt=""
              style={{
                width: "8px",
                height: "8px",
                marginBottom:"5px",
               marginLeft:"3.5px",
               
              }}
            />
          </span>
        </>
      ),
    },
    {
      title: "EXCHANGE",
      dataIndex: "exchange",
      width:"50px",
      key: "exchange",
      align: "center",
     
      render: (_, record) => (
        <>
          <Select
            placeholder="Select Exchange"
            className="select-options"
            style={{ width: "5rem" }}
          >
            <Option className="options">HINDALCO</Option>
            <Option className="options">SBIN</Option>
            <Option className="options">TATAMOTORS</Option>
          </Select>
        </>
      ),
    },
    {
      title: "SYMBOL",
      dataIndex: "symbol",
      width:"80px",
      key: "symbol",
      align: "center",
      
     
      render: () => (
        <>
          <Input className="select-symbol" placeholder="Select Symbol"/>
        </>
      ),
    },
    {
      title: "LTP PRICE ",
      dataIndex: "ltp_price",
      width:"20px",
      key: "ltp_price",
      align: "center",
     
      
      sorter: (a, b) => a.ltp_price - b.ltp_price,
      render: (val, record) => <div title={'ltp_price: ' + val} style={{width:"5rem"}}>{val}
          </div>
    },
    {
      title: "ORDER TYPE",
      dataIndex: "order_type",
      width:"20px",
      key: "order_type",
      align: "center",
     
      render: (_, record) => (
        <>
          <Select
            className="charting-order-type"
            placeholder="Select Order"
            style={{ width: "5rem" }}
          >
            <Option className="options">Order1</Option>
            <Option className="options">Order2</Option>
            <Option className="options">Order3</Option>
          </Select>
        </>
      ),
    },
    {
      title: "ADD QTY",
      dataIndex: "add_qty",
      width:"20px",
      key: "add_qty",
      align: "center",
      render: () => (
        <>
          <InputNumber className="charting-add-qty" placeholder="Add qty" style={{width:"4rem"}}/>
        </>
      ),
    },
    {
      title: "BUY",
      dataIndex: "buy",
      width:"20px",
      key: "buy",
      align: "center",
      
      render: () => (
        <>
          <Button className="charting-buy">BUY</Button>
        </>
      ),
    },
    {
      title: "SELL",
      dataIndex: "sell",
      width:"20px",
      key: "sell",
      align: "center",
      
      render: () => (
        <>
          <Button className="charting-sell">SELL</Button>
        </>
      ),
    },
    {
      title: "P&L",
      dataIndex: "pandl",
      width:"100px",
      key: "pandl",
      align: "center",
      render: (text, record) => (
        <div className={`pl_cell ${text >= 0 ? "green" : "red"}`}>
          <span>{text > 0 ? `+${text}` : `${text}`}</span>
        </div>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
     width:"40px",
      key: "status",
      align: "center",
      

      render: () => (
        <>
          <Switch />
        </>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "action",
     width:"50px",
      key: "action",
      align: "center",
      render: () => (
        <>
         <button className="action_button">
            <img src={action_2} alt=""></img>
          </button>
        </>
      ),
    },
  ];

  const data = [
    {
      user_count: 1,
      group_name: "OPTION_TRADING1",
      ltp_price: 100,
      user_kay: "c988f5c736dfhhkuggdsfvh1",
      add_qty: 20,
      pandl: 20000000,
    },
    {
      user_count: 2,
      group_name: "OPTION_TRADING23",
      ltp_price: 1255,
      user_kay: "c988f5c7361c5363071f",
      add_qty: 2045696,
      pandl: 20,
    },
    {
      user_count: 3,
      group_name: "OPTION_2",
      ltp_price: 6345,
      user_kay: "c988f5c7361c5363071f",
      add_qty: 20122,
      pandl: 20,
    },
    {
      user_count: 4,
      group_name: "OPTION_TRAD",
      ltp_price: 345,
      user_kay: "c988f5c7361c5363071f",
      add_qty: 206548,
      pandl: 20,
    },
  ];
  return (
    <>
      <div className="charting-api-main">
      <div className="charting-api--main-wrap">
        <div className="table-top-panel-section">
          <div className="left-section"></div>
          <div className="right-section">
            <Select placeholder="Select Users Name" className="select-options">
              <Option className="options">User 1</Option>
              <Option className="options">User 2</Option>
              <Option className="options">User 3</Option>
            </Select>
            <Input className="select-options"   placeholder="Enter Group Name" />
            <Button className="genrate-key-button" onClick={GenerateKey}>Generate KEY</Button>
          </div>
          <div className="table-wrap">
            <Table pagination={false} columns={columns} dataSource={data}   />
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
                <Option className="options" value={10}>10</Option>
                <Option className="options" value={20}>20</Option>
                <Option className="options" value={50}>50</Option>
              </Select>
              <span className="page-range">
                {(page - 1) * pageSize + 1}-
                {(page - 1) * pageSize + pageSize > data?.length
                  ? data?.length
                  : (page - 1) * pageSize + pageSize}{" "}
                of {data?.length}
              </span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default ChartingApiKey;
