import React, { useState } from 'react';
import './wallets_table.css'

const WalletItem = ({
    wallet_address,
    tx_count
}) => {
    return (
        <div className='table-content'>
            <div className='wallet-column'>
                {wallet_address}
            </div>
            <div className='tx-column'>
                {tx_count}
            </div>
        </div>
    )
}


const WalletsTable = ({
    data
}) => {
    console.log(data)
    return (
        <div className='black-table'>
            <div className='table-header'>
                <div className='first-header'>
                    Wallet address
                </div>
                <div className='second-header'>
                    Tx count
                </div>
            </div>
            {
                Object.keys(data).map((key, index) => {
                    return (
                        <WalletItem
                            wallet_address={key}
                            tx_count={data[key]}
                        />
                    )
                })
            }
        </div>
    )
}

export default WalletsTable
