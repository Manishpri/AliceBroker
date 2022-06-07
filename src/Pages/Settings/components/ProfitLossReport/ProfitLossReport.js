import { Col, DatePicker, Row, Select,Table,Pagination } from "antd";
import React,{useState} from "react";
import "./ProfitLossReport.scss";

const { Option } = Select;

function ProfitLossReport(props) {

  const [page, setPage] = useState(1);
  
  const [pageSize, setPageSize] = useState(10);
    
  const columns =[
    {
      title: "#",
      dataIndex: "count",
      key: "count",
      align: "center",
      sortDirections: [ 'ascend','decend'],
      sorter: {
        compare: (a, b) => a.count - b.count,
        
      },
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      align: "center",
      sortDirections: [ 'ascend','decend'],
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      align: "center",
      sorter: (a, b) => new Date(a.expire_date) - new Date(b.expire_date)
    },
    {
      title: "CLIENT CODE",
      dataIndex: "client_code",
      key: "client_code",
      align: "center",
    },
    {
      title: "EXCHANGE",
      dataIndex: "exchange",
      key: "exchange",
      align: "center",
    },
    {
      title: "SYMBOL NAME",
      dataIndex: "symbol_name",
      key: "symbol_name",
      align: "center",
    },
    {
      title: "ORDER ID",
      dataIndex: "order_id",
      key: "order_id",
      align: "center",
      sortDirections: [ 'ascend','decend'],
      sorter: {
        compare: (a, b) => a.order_id - b.order_id,
        
      },
    },
    {
      title: "BUY QTY",
      dataIndex: "buy_qty",
      key: "buy_qty",
      align: "center",
    },
    {
      title: "SELL QTY",
      dataIndex: "sell_qty",
      key: "sell_qty",
      align: "center",
    },
    {
      title: "P&L",
      dataIndex: "pandl",
      key: "pandl",
      align: "center",
      sorter: (a, b) => a.pandl.localeCompare(b.pandl),
      render: (text, record) => (
        <span className={`status ${text >= 0 ? "green-status" : "red-status"}`}>
          {text}
        </span>
      ),
    },
  ];

  const data = [
    {
      count:1,
      name:"Deepak",
      date:"27/01/22",
      client_code:111,
      exchange:"NFO",
      symbol_name:"ADANIPORTS-EQ",
      order_id:2222,
      buy_qty:1,
      sell_qty:1,
      pandl:"+25"
    },
    {
      count:2,
      name:"Deepak",
      date:"27/01/22",
      client_code:111,
      exchange:"NFO",
      symbol_name:"ADANIPORTS-EQ",
      order_id:2222,
      buy_qty:1,
      sell_qty:1,
      pandl:"+25"
    },
    {
      count:3,
      name:"Deepak",
      date:"27/01/22",
      client_code:111,
      exchange:"NFO",
      symbol_name:"ADANIPORTS-EQ",
      order_id:2222,
      buy_qty:1,
      sell_qty:1,
      pandl:"+25"
    },
    {
      count:4,
      name:"Deepak",
      date:"27/01/22",
      client_code:111,
      exchange:"NFO",
      symbol_name:"ADANIPORTS-EQ",
      order_id:2222,
      buy_qty:1,
      sell_qty:1,
      pandl:"+25"
    },
    {
      count:5,
      name:"Deepak",
      date:"27/01/22",
      client_code:111,
      exchange:"NFO",
      symbol_name:"ADANIPORTS-EQ",
      order_id:2222,
      buy_qty:1,
      sell_qty:1,
      pandl:"+25"
    },
    {
      count:6,
      name:"Deepak",
      date:"27/01/22",
      client_code:111,
      exchange:"NFO",
      symbol_name:"ADANIPORTS-EQ",
      order_id:2222,
      buy_qty:1,
      sell_qty:1,
      pandl:"+25"
    },
  ]


  return (
    <>
    <div className="profit-loss-report-main">
    <div className="profit-loss-report-wrap">
      <Row gutter={16} align="bottom">
        <Col span={6}>
          <div className="single-field">
            <span className="field-label">From Date</span>
            <DatePicker
              size="large"
              className="date-select"
              placeholder="dd-mm-yy"
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="single-field">
            <span className="field-label">To Date</span>
            <DatePicker
              size="large"
              className="date-select"
              placeholder="dd-mm-yy"
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="single-field">
            <span className="field-label">Trading Type</span>
            <Select size="large" placeholder="Trading Type">
              <Option value="BANKNIFTY OPTION">BANKNIFTY OPTION</Option>
              <Option value="NIFTY OPTION">NIFTY OPTION</Option>
            </Select>
          </div>
        </Col>
        <Col span={6}>
          <div className="download-btn">
            <span>DOWNLOAD</span>
          </div>
        </Col>
      </Row>

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
    </>
  );
}

export default ProfitLossReport;
