import { Category, getCategoryName } from "@/types/category"
import { useCallback } from "react";
import styled from "styled-components";
import { useArticles } from "./ArticlesProvider";
import { useFiltering } from "./FilteringProvider";

const Title = styled.h1`
    line-height: 32px;
    padding: 12px;
    align-content: center;
    font-size: 24px;
`

const Header = styled.header`
    display: flex;
    justify-content: space-between;
`

const Categories = styled.ul`
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
`

const NavItem = styled.div`
    position: relative;

    line-height: 32px;
    padding: 8px 32px;
    align-content: center;
    border-radius: 0 0 12px 12px;

    text-align: center;

    &.selected {
        background-color: #84949a;
        color: white;
    }

    .show-on-hover {
        display: none;
    }

    &:hover .show-on-hover {
        display: initial;
    }
`

const Actions = styled.div`
    display: flex;
    gap: 16px;

    height: 32px;
    padding: 12px;
    
    align-items: center;

    & button {
        cursor: pointer;
    
        border: 1px solid red;
        border-radius: 12px;
        background-color: white;
        color: red;

        &:hover {
            background-color: #ffd4d4;
        }
    }
`

const RemoveCategory = styled.button`
    position: absolute;

    top: 14px;
    left: 6px;

    font-size: 14px;
    background: white;
    border: 1px solid silver;
    border-radius: 4px;
    padding: 0 4px;
    color: silver;
`

export const AppHeader: React.FC = () => {
    const { availableCategoryIds, resetArticles, deleteCategory } = useArticles();
    const { categoryId, selectCategory } = useFiltering();

    const handleSelectCategory = useCallback((id?: string) => {
            selectCategory(id);
    }, [selectCategory]);

    const handleRemoveCategory = useCallback((id: string) => {
        deleteCategory(id);
    }, [deleteCategory]);

    const handleRefreshArticles = useCallback(() => {
        resetArticles();
    }, [resetArticles])

    return (
        <Header>
            <Title>Articles</Title>
            <nav>
                <Categories>
                    <NavItem className={categoryId === undefined ? 'selected' : ''} onClick={() => handleSelectCategory()}>All Categories</NavItem>
                    {
                        availableCategoryIds.map((id) => (
                            <li key={id}>
                                <NavItem className={categoryId === id ? 'selected' : ''} onClick={() => handleSelectCategory(id)}>
                                    <RemoveCategory className="show-on-hover" onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveCategory(id)
                                    }}>X</RemoveCategory>
                                    {getCategoryName(id)}
                                </NavItem>
                            </li>
                        ))
                    }
                </Categories>
            </nav>
            <Actions>
                <button onClick={handleRefreshArticles}>Refresh articles</button>
            </Actions>
        </Header>
    )
}
