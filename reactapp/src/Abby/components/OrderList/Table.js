import React from 'react'
import Order from './Order'

const orderListArea = {
  margin: 'auto',
  borderRadius: '0px 10px 10px 10px',
  overflow: 'hidden',
  background: '#fff',
  paddingBottom: '30px',
  //   width: '1200px',
}

const orderContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '1rem',
}

const orderTable = {
  borderCollapse: 'collapse',
  width: '100%',
}

const ThTdTable = {
  border: '1px solid #ffffff',
  textAlign: 'left',
  padding: '20px',
  textAlign: 'center',
}
const th = {
  backgroundColor: '#E2E2E2',
  color: '#000',
}

const td = {
  backgroundColor: '#FFF5EA',
  color: '#000',
}

function Table({ orderList, header, sid }) {

  return (
    <div>
      <div style={orderListArea}>
        <div>
          {/* <div style={orderContainer}> */}
          <table style={orderTable}>
            <thead>
              <tr>
                <th style={{ ...ThTdTable, ...th }}>{header[0][0]}</th>
                <th style={{ ...ThTdTable, ...th }}>{header[1][0]}</th>
                <th style={{ ...ThTdTable, ...th }}>{header[2][0]}</th>
                <th style={{ ...ThTdTable, ...th }}>{header[3][0]}</th>
                <th style={{ ...ThTdTable, ...th }}>{header[4][0]}</th>
              </tr>
            </thead>
            <tbody>
              {!orderList.length ? (
                <tr>
                  <td style={{ ...ThTdTable, ...td }}>&nbsp;</td>
                  <td style={{ ...ThTdTable, ...td }}>&nbsp;</td>
                  <td style={{ ...ThTdTable, ...td }}>&nbsp;</td>
                  <td style={{ ...ThTdTable, ...td }}>&nbsp;</td>
                  <td style={{ ...ThTdTable, ...td }}>&nbsp;</td>
                </tr>
              ) : (
                orderList.map((order, idx) => (
                  <tr key={idx}>
                    <td style={{ ...ThTdTable, ...td }}>{order[header[0][1]]}</td>
                    {/* order[header[0][1]] = order['a_name'] =  "測試員阿比" */}
                    <td style={{ ...ThTdTable, ...td }}>{order[header[1][1]]}</td>
                    <td style={{ ...ThTdTable, ...td }}>{order[header[2][1]]}</td>
                    <td style={{ ...ThTdTable, ...td }}>{order[header[3][1]]}</td>
                    <td style={{ ...ThTdTable, ...td }}>{order[header[4][1]]}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}


export default Table
