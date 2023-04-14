import { InputChangeEvent, InputKeyDownEvent } from "@/types/events";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useFiltering } from "./FilteringProvider";

interface Props {
    onSearch: (term: string) => void;
}

const InputGroup = styled.div`
    display: flex;
    width: 100%;

    border-radius: 12px;

    box-shadow: 0 4px 8px #00000033;
`

const Input = styled.input`
    font-size: 16px;
    padding: 16px;

    flex-grow: 1;
    
    border: 1px solid #ececec;
    border-radius: 12px 0 0 12px;
`

const SearchButton = styled.button`
    background-color: #5176aa;
    color: white;
    border-radius: 0 12px 12px 0;

    border: none;

    font-size: 16px;
    padding: 16px;

    &:disabled {
        background-color: #92a2af;
        color: black;
    }
`

export const SearchBar: React.FC<Props> = (props) => {
    const { onSearch } = props;

    const { query } = useFiltering();

    const [term, setTerm] = useState('');

    useEffect(() => {
        if (query) {
            setTerm(query);
        }
    }, [query])

    const handleSearch = () => {
        onSearch(term);
    }

    const handleKeyDown: InputKeyDownEvent = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleChange: InputChangeEvent = (e) => {
        setTerm(e.target.value);
    }

    return (
        <div>
            <InputGroup>
                <Input
                    placeholder="Search title or excerpt..."
                    value={term}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <SearchButton
                    onClick={handleSearch}
                >Search</SearchButton>
            </InputGroup>
        </div>
    );
}
