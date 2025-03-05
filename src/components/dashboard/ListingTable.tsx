import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image';

const ListingTable = () => {

    const addressFormatter = (data: string) => {
        if (!data) return "";
        return `${data.slice(0, 6)}...${data.slice(data.length - 4)}`;
    }

    return (
        <div className="w-full overflow-x-scroll">
            <Table className='w-full'>
                <TableHeader className="bg-color2 hover:bg-color2">
                    <TableRow>
                        <TableHead className='text-color1'>Address</TableHead>
                        <TableHead className='text-color1'>ListingID</TableHead>
                        <TableHead className='text-color1'>Amount</TableHead>
                        <TableHead className='text-color1'>Desired Tokens</TableHead>
                        <TableHead className='text-color1'>Status</TableHead>
                        <TableHead className='text-color1 text-center'>TimeStamp</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listingTableData.map((item, i) => (
                        <TableRow key={i} className="font-light font-nunitoSans border-b border-opacity-10 border-color2 ">
                            <TableCell>{addressFormatter(item.address)}</TableCell>
                            <TableCell>{item.listingId}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>
                                <div className="flex -space-x-4 rtl:space-x-reverse">
                                    {
                                        item.desiredTokens.map((token, index) => (
                                            <div key={index} className="bg-color1 overflow-hidden w-8 h-8 p-[2px] rounded-full">
                                                <Image src={token} className='w-full h-full' alt="token icon" width={100} height={100} priority quality={100} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </TableCell>
                            <TableCell className="capitalize">{item.status}</TableCell>
                            <TableCell>
                                <div className="flex flex-col items-center">
                                    <span>{item.date}</span>
                                    <span>{item.time}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ListingTable

const listingTableData = [
    {
        address: "0xAbC1234567890DefABC1234567890DefABC12345",
        listingId: 101,
        amount: "1500",
        desiredTokens: [
            "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=013",
            "https://cryptologos.cc/logos/chainlink-link-logo.png?v=013",
            "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013",
        ],
        status: "pending",
        time: "12:43pm GMT+2",
        date: "12/03/2025",
    },
    {
        address: "0xBcd234567890DefABC1234567890DefABC12345",
        listingId: 102,
        amount: "2500",
        desiredTokens: [
            "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
            "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=013",
            "https://cryptologos.cc/logos/chainlink-link-logo.png?v=013",
            "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013",
        ],
        status: "pending",
        time: "1:15pm GMT+2",
        date: "12/03/2025",
    },
    {
        address: "0xCde34567890DefABC1234567890DefABC12345",
        listingId: 103,
        amount: "3200",
        desiredTokens: [
            "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013",
            "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
            "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=013",
        ],
        status: "pending",
        time: "2:30pm GMT+2",
        date: "12/03/2025",
    },
    {
        address: "0xDef4567890DefABC1234567890DefABC12345",
        listingId: 104,
        amount: "4200",
        desiredTokens: [
            "https://cryptologos.cc/logos/chainlink-link-logo.png?v=013",
            "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013",
            "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
        ],
        status: "pending",
        time: "10:00am GMT+2",
        date: "13/03/2025",
    },
    {
        address: "0xEfg567890DefABC1234567890DefABC12345",
        listingId: 105,
        amount: "980",
        desiredTokens: [
            "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013",
            "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=013",
            "https://cryptologos.cc/logos/chainlink-link-logo.png?v=013",
            "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
        ],
        status: "pending",
        time: "4:45pm GMT+2",
        date: "13/03/2025",
    },
    {
        address: "0xFgh67890DefABC1234567890DefABC12345",
        listingId: 106,
        amount: "2100",
        desiredTokens: [
            "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013",
            "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
            "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013",
        ],
        status: "pending",
        time: "11:30am GMT+2",
        date: "14/03/2025",
    },
    {
        address: "0xGhi7890DefABC1234567890DefABC12345",
        listingId: 107,
        amount: "3450",
        desiredTokens: [
            "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=013",
            "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013",
            "https://cryptologos.cc/logos/chainlink-link-logo.png?v=013",
        ],
        status: "pending",
        time: "9:15am GMT+2",
        date: "14/03/2025",
    },
    {
        address: "0xHij890DefABC1234567890DefABC12345",
        listingId: 108,
        amount: "1780",
        desiredTokens: [
            "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013",
            "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
            "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=013",
            "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013",
        ],
        status: "pending",
        time: "3:30pm GMT+2",
        date: "14/03/2025",
    },
    {
        address: "0xIJK890DefABC1234567890DefABC12345",
        listingId: 109,
        amount: "5600",
        desiredTokens: [
            "https://cryptologos.cc/logos/chainlink-link-logo.png?v=013",
            "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
            "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013",
        ],
        status: "pending",
        time: "5:00pm GMT+2",
        date: "15/03/2025",
    },
    {
        address: "0xJKL890DefABC1234567890DefABC12345",
        listingId: 110,
        amount: "4300",
        desiredTokens: [
            "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=013",
            "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013",
            "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013",
            "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
        ],
        status: "pending",
        time: "8:20am GMT+2",
        date: "15/03/2025",
    },
];

