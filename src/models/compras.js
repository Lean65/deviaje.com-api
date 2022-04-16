const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('compras', {
    citycodefrom: {
        type: DataTypes.STRING
    }, 
    citycodeto: {
        type: DataTypes.STRING
    },
    booking_token: {            //quizas este no
        type: DataTypes.STRING
    },
    local_departure: {
        type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
}


// "id": "22ee0f6b491e0000ef1e76ae_0",
// "cityCodeFrom": "NYC",
// "cityCodeTo": "MIA",
// "booking_token": "BiTAzdhwUGZ6R5VYLHvO5l34lkScwXC9h-Tj2rZqLeTwVVc_LpHGKclwYfsy19JqLjL3f-CcSRNSXL145yk0Q_odGBU76mHE4zI1N73KC-3MvM6uyscK8Bq3SB59wnmJidY7hYm9PyyI5662bt9t3kufAzD5T2zHPB6JH-iV0Lmc0NW2Eytb4k-USbQiKYxFoZczyFoP3doPbgZPgQZ2GRNU0RqTFRw1Oa1EQl6EG_yFGIELMmhXEPG2u9AgBa4XPNC_xTdO2DLhaOHLbxEbQHa77efL5-p7uwZqwNik0DscacNApVqawv5cM0EuWQsREhRKFTj3xiCwAtaAL2WLf0vVnKOFBgBgsZVIvWi35lKITMIszwqY-Odr1FNc1VKFMWlVoHtM7KxZDUT3foXdfi2X8BEmebMIIx2Wp_aOyyeQre4xhOaUdrc4RxKotU6IuXH1PagRanAzZnh60I4y7-ZJXDb--rjfacN31I17IlJ3ulj-kzXJ9q-fRjumHv6mfzySGf76bNgDa0SB7wgpfCCCzvyFGWp9b0TtOSASt95psQsLQlL0GKVLJK2W2lIwhGiAZU8vSvv88nHf8FWsM-3uX3lveB-FQrSmMhXcX8gHgaPwtSokvFzkZYiQH9NPefXcipoJJBM4c2_Z7Cy0IOQ==",
// "local_departure": "2021-04-01T19:59:00.000Z",