import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useCallback, useContext } from "react";

interface FilteringValues {
    query?: string;
    categoryId?: string;
    selectCategory: (id?: string) => void;
    setQuery: (term: string) => void;
}

function generateQueryParams(input: {query?: string, filter?: string}) {
    let filters = [];

    if (input.query && input.query !== '') {
        filters.push(`query=${input.query}`);
    }

    if (input.filter) {
        filters.push(`filter=${input.filter}`);
    }

    return '?' + filters.join('&&');
}

export const FilteringContext = createContext<FilteringValues | null>(null);

export const FilteringProvider: React.FC<PropsWithChildren> = (props) => {
    const { children } = props;

    const router = useRouter();

    const { query, filter } = router.query;

    const normalizedQuery = !query || query === 'undefined' ? undefined : String(query); 
    const normalizedFilter = !filter || filter === 'undefined' ? undefined : String(filter); 

    const setQuery = useCallback((term: string) => {
        const queryParams = generateQueryParams({ query: term, filter: normalizedFilter });

        router.push('/' + queryParams);
    }, [router]);

    const selectCategory = useCallback((id?: string) => {
        const queryParams = generateQueryParams({ query: normalizedQuery, filter: id});

        router.push('/' + queryParams);
    }, [router]);

    const value = {
        query: normalizedQuery,
        categoryId: normalizedFilter,
        selectCategory,
        setQuery
    }

    return (
        <FilteringContext.Provider value={value}>
            {children}
        </FilteringContext.Provider>
    )
}

export function useFiltering() {
    return useContext(FilteringContext) ?? {} as FilteringValues;
}
