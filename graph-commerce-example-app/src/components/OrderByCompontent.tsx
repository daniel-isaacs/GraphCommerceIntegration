import { OrderBy } from "@/graphql/graphql";
import { Dispatch, FC, SetStateAction, useState } from "react"

interface OrderByProps {
    orderBy: string
    setorderBy: Dispatch<SetStateAction<string>>;
    orderByDirection: OrderBy
    setorderByDirection: Dispatch<SetStateAction<OrderBy>>;
}

const OrderByComponent: FC<OrderByProps> = ({ orderBy, setorderBy, orderByDirection, setorderByDirection }) => {
    const [isOrderByInputOpen, setOrderByInputIsOpen] = useState(false);
    const [isOrderByDirectionOpen, setOrderByDirectionIsOpen] = useState(false);

    const toggleOrderByDirectionDropdown = () => {
        setOrderByDirectionIsOpen(!isOrderByDirectionOpen);
    };

    const toggleOrderByInputDropdown = () => {
        setOrderByInputIsOpen(!isOrderByInputOpen);
    };

    const orderByName = () => {
        setorderBy('Name')
        setOrderByInputIsOpen(false);
    };

    const orderByPrice = () => {
        setorderBy('DefaultMarketPrice')
        setOrderByInputIsOpen(false);
    };

    const orderByBrand = () => {
        setorderBy('Brand')
        setOrderByInputIsOpen(false);
    };

    const orderAsc = () => {
        setorderByDirection(OrderBy.Asc)
        setOrderByDirectionIsOpen(false);
    };

    const orderDesc = () => {
        setorderByDirection(OrderBy.Desc)
        setOrderByDirectionIsOpen(false);
    };

    return (
        <div className='w-full py-6 pb-8'>
            <div className="ml-2 relative inline-block">
                <button
                    type="button"
                    className="px-4 py-2 text-black bg-slate-400 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                    onClick={toggleOrderByInputDropdown}
                >
                    Order By: {orderBy}<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {isOrderByInputOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={orderByName}
                                >
                                    Name
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={orderByPrice}
                                >
                                    DefaultMarketPrice
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={orderByBrand}
                                >
                                    Brand
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="ml-2 relative inline-block">
                <button
                    type="button"
                    className="px-4 py-2 text-black bg-slate-400 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                    onClick={toggleOrderByDirectionDropdown}
                >
                    Direction: {orderByDirection} <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {isOrderByDirectionOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={orderAsc}
                                >
                                    Asc
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={orderDesc}
                                >
                                    Desc
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderByComponent