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

      const defaultClassName = "relative flex justify-center w-fullbg-indigo-400 h-10"
    return (
        <div className="border-b border-gray-200 py-6">
            <div>
            <span className="text-sm font-semibold text-gray-500"></span>
            <div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
                <div className="relative flex flex-col items-center flex-grow pb-5 group">
                    <div className={defaultClassName}></div>
                </div>
                {
                    facet?.map((x, index) => {
                        const className = "relative flex justify-center w-full bg-indigo-400 h-" + (x?.count ?? 0)*10
                        return (
                            <div className="relative flex flex-col items-center flex-grow pb-5 group" key={index}>
				                <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">{x?.name} ({x?.count})</span>
				                <div className={className}></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className="text-center">{ headingText }: {currentLowValue} - {currentHighValue}</div>
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
        
    </div>
  );
}

export default RangeFacetComponent