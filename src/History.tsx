import React from 'react';

const History:React.FC = () => {
  // @ts-ignore
  const history = JSON.parse(localStorage.getItem("result"))

  return (
      <div className="history">
        {history !== null && history.map((value:string)=>{
          return <div key={history.index}>{value}</div>
        })}
      </div>
  )
}

export default History;
