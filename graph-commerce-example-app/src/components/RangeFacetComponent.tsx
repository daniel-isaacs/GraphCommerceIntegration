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

    return (
    <div className="border-b border-gray-200 py-6">
        <div>
            <h3 className="-my-3 flow-root">{ headingText }: {currentLowValue} - {currentHighValue}</h3>
        </div>
        <div className="mt-6">
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