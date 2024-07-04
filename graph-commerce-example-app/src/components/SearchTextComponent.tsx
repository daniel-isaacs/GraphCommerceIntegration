import { Dispatch, FC, SetStateAction, useState } from "react"

interface SearchTextProps {
    searchText: string
    setSearchText: Dispatch<SetStateAction<string>>;
}

const SearchTextComponent: FC<SearchTextProps> = ({ searchText, setSearchText }) => {

    const [internalSearchText, setInternalSearchText] = useState(() => searchText);

    const handleSearchClick = (event: any) => {
        setSearchText(internalSearchText)
    };
  
    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInternalSearchText(event.target.value);
    };
  
    const handleSearchboxKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setSearchText(internalSearchText)  
      }
    };

    return (
      <div className="relative flex items-center w-full h-full lg:w-96 group">
          <input type="text" value={internalSearchText} onChange={handleSearchInput} onKeyDown={handleSearchboxKeyDown} className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input" placeholder="Search"/>
          <button type="submit" onClick={handleSearchClick} className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-blue-500 focus:outline-none">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
      </div>
    )
}

export default SearchTextComponent