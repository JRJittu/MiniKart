import Chart from 'react-apexcharts'
import { useState, useEffect } from 'react'
import AdminMenu from './adminMenu'
import Loader from '../../components/loader'
import Orderlist from './orderlist'
import { useGetUsersQuery } from '../../redux/api/userApiSlice'
import {
    useTotalOrdersQuery,
    useTotalSalesQuery,
    useTotalSalesPerDateQuery
} from '../../redux/api/orderApiSlice'


const AdminDashboard = () => {
    const { data: sales, isLoading: sailsLoading } = useTotalSalesQuery()
    const { data: orders, isLoading: ordersLoading } = useTotalOrdersQuery()
    const { data: salesByDate, isLoading: salesDateLoading } = useTotalSalesPerDateQuery()
    const { data: customers, isLoading: userLoading } = useGetUsersQuery()

    console.log(salesByDate)

    const [state, setState] = useState({
        options: {
            chart: { type: "line" },
            tooltip: { theme: "dark" },
            colors: ["#00E396"],
            dataLabels: { enabled: true },
            stroke: { curve: "smooth" },
            grid: { borderColor: "#ccc" },
            markers: { size: 1 },
            title: {
                text: "Sales Trend",
                align: "left"
            },
            xaxis: {
                categories: [],
                title: { text: "date" }
            },
            yaxis: {
                title: { text: "Sales" },
                min: 0
            },
            legend: {
                position: 'top',
                horizontalAlign: 'rigth',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        },
        series: {
            name: 'Sales',
            data: []
        }
    })

    useEffect(() => {
        if (salesByDate) {
            /* Format the data from salesByDate to match the chart's requirement */
            const formattedSalesDate = salesByDate.map((item) => ({
                x: item._id,
                y: item.totalSales
            }))

            setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formattedSalesDate.map((i) => i.x)
                    }
                },
                series: [
                    {
                        name: 'Sales',
                        data: formattedSalesDate.map((i) => i.y)
                    }
                ]
            }))
        }
    }, [salesByDate])

    return <>
        <AdminMenu />

        <section className='xl:ml-[4rem] md:ml-[10rem]'>

            <div className='w-[80%] flex flex-wrap justify-around'>

                <div className="rounded-lg bg-gray-200 p-5 w-[20rem] mt-5">
                    <div className="font-bold text-xl rounded-full w-[3rem] bg-pink-500 text-center p-3">₹</div>

                    <p className='mt-5'>Sales</p>
                    <h1 className="text-xl font-bold">
                        ₹ {sailsLoading ?  <Loader/> : sales?.totalSales.toFixed(2)}
                    </h1>
                </div>

                <div className="rounded-lg bg-gray-200 p-5 w-[20rem] mt-5">
                    <div className="font-bold text-xl rounded-full w-[3rem] bg-pink-500 text-center p-3">₹</div>

                    <p className='mt-5'>Customers</p>
                    <h1 className="text-xl font-bold">
                        {sailsLoading ?  <Loader/> : customers?.length}
                    </h1>
                </div>

                <div className="rounded-lg bg-gray-200 p-5 w-[20rem] mt-5">
                    <div className="font-bold text-xl rounded-full w-[3rem] bg-pink-500 text-center p-3">₹</div>

                    <p className='mt-5'>All Orders</p>
                    <h1 className="text-xl font-bold">
                        {sailsLoading ?  <Loader/> : orders?.totalOrders}
                    </h1>
                </div>

            </div>

            <div className='ml-[10rem] my-[8rem]'>
                <Chart options={state.options} series={state.series} type="line" width="70%" />
            </div>

            {/* <div className='ml-[10rem] mt-[8rem]'>
                <Chart options={state.options} series={state.series} type="bar" width="70%" />
            </div> */}

            <Orderlist />

        </section>
    </>
}

export default AdminDashboard