import React from 'react'
import { Button, Result } from 'antd';

const Success = () => {
  return (
    <Result
      status="success"
      title="PAYMENT SUCCESFULL"
      subTitle="configuration takes 1-5 minutes, please wait."
    // extra={[
    //   <Button type="primary" key="console">
    //     Go Console
    //   </Button>,
    //   <Button key="buy">Buy Again</Button>,
    // ]}
    />
  )
}

export default Success