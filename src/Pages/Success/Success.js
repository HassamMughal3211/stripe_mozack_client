import React from 'react'
import { Button, Result } from 'antd';
import "./success.css"
import { brandName } from '../../Assets/Theme/ThemeColors';

const Success = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto mt-5">
          <div class="payment">
            <div class="payment_header">
              <div class="check"><i class="fa fa-check" aria-hidden="true"></i></div>
            </div>
            <div class="content">
              <h1><b>Payment Success !</b></h1>
              <p><b>Thank you for purchasing at {brandName}!</b> </p>
              <p>Your payment has been confirmed. </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
// <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
// 	<style type="text/css">


// 	</style>

// </head>




export default Success