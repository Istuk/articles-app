import { Article } from "@/types/article";
import { getFilteredArticles } from "@/utils/filters";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useArticles } from "./ArticlesProvider";
import { ArticlesVirtualized } from "./ArticlesVirtualized";
import { useFiltering } from "./FilteringProvider";
import { SearchBar } from "./SearchBar";

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    height: 100%;
`

const ListWrapper = styled.ul`
    flex-grow: 1;
`

export const ArticlesList: React.FC = (props) => {
    const [articleList, setArticleList] = useState<Article[]>([]);
    
    const { articles } = useArticles();
    const { query, categoryId, setQuery} = useFiltering();

    const hasNoArticles = !articles || articles.length === 0;
    const hasNoResults = articleList.length === 0;

    const handleSearch = useCallback((term: string) => {
        setQuery(term);
    }, [setQuery]);

    useEffect(() => {
        setArticleList(getFilteredArticles(articles ?? [], query, categoryId))
    }, [articles, query, categoryId])

    if (hasNoArticles) {
        return <span>No articles</span>;
    }

    return (
        <Content>
            <SearchBar onSearch={handleSearch} />
            <p>
                Displaying <strong>{articleList.length}</strong> out of total <strong>{articles.length} articles</strong>
            </p>
            {hasNoResults && <span>There are no results for given filters</span>}
            <ListWrapper>
                <ArticlesVirtualized articles={articleList} />
            </ListWrapper>
        </Content>
    )
}
