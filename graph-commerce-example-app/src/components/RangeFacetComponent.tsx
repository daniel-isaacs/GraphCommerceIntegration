import { NumberFacet } from "@/graphql/graphql"
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { RangeSlider } from 'next-range-slider';
import 'next-range-slider/dist/main.css';

interface RangeFacetProps {
    headingText: string
    minValue: number
    maxValue: number
    currentLowValue: number
    currentHighValue: number
    facet: NumberFacet[] | null
    setLowValue: Dispatch<SetStateAction<number>>;
    setHighValue: Dispatch<SetStateAction<number>>;
}

const RangeFacetComponent: FC<RangeFacetProps> = ({ headingText, minValue, maxValue, currentLowValue, currentHighValue, facet, setLowValue, setHighValue }) => {

    const [localLowValue, setLocalLowValue] = useState(() => minValue);
    const [localHighValue, setHighLocalValue] = useState(() => maxValue)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          setLowValue(localLowValue)
          setHighValue(localHighValue)
        }, 500)
    
        return () => clearTimeout(delayDebounceFn)
      }, [localLowValue, localHighValue, setLowValue, setHighValue])

      const facetValues = Array.from(facet?.values() ?? []).map((x) => x.count!)
      const highestFacetCount = Math.max(...facetValues)
    return (
        <div className="border-b border-gray-200 py-6 dark:text-slate-800">
            <div className="flex flex-col items-center w-full max-w-screen-md p-6 pb-6 rounded-lg shadow-xl sm:p-1">
		        <div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3 h-16">
                {
                    facet?.map((x, index) => {
                        let hValue = Math.round((x.count! / highestFacetCount) * 12)
                        if(Math.abs(hValue % 2) == 1) {
                            hValue = hValue - 1
                        }
                        const className = "bg-indigo-200 relative flex justify-center w-full h-" + hValue
                        return (
                            <div className="relative flex flex-col items-center flex-grow pb-5 group" key={index}>
                                <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">{x?.count ?? '0'}</span>
                                <div className={className}></div>
                            </div>
                        )
                    })
                }
		        </div>
	        </div>
            <div>
                <RangeSlider
                    min={minValue}
                    max={maxValue}
                    step={10}
                    options={{
                        leftInputProps: {
                            value: currentLowValue,
                            onChange: (e) => setLocalLowValue(Number(e.target.value)),
                        },
                        rightInputProps: {
                            value: currentHighValue,
                            onChange: (e) => setHighLocalValue(Number(e.target.value)),
                        },
                        }
                    }
                />
            </div>
            <div className="text-center">{ headingText }: {currentLowValue} - {currentHighValue}</div>
        </div>
  );
}

export default RangeFacetComponent