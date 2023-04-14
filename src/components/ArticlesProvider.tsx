import { Article } from "@/types/article";
import { CategoryType, getCategoryName } from "@/types/category";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { ConfirmDialog, useConfirm } from "./common/ConfirmDialog";

export interface ArticleValues {
    articles: Article[];
    availableCategoryIds: string[];
    deleteArticle: (article: Article) => void;
    deleteCategory: (id: string) => void;
    resetArticles: () => void;
}

export const ArticleContext = createContext<ArticleValues | null>(null);

interface Props {
    initialArticles: Article[];
    children: ReactNode;
}

export const ArticlesProvider: React.FC<Props> = (props) => {
    const { initialArticles, children } = props;

    const [articles, setArticles] = useState<Article[]>(initialArticles);

    const [confirmDialog, confirm] = useConfirm();

    const availableCategoryIds = useMemo(() => {
        return articles.reduce<string[]>((prev, curr) => !prev.includes(curr.postCategoryId) ? prev.concat(curr.postCategoryId) : prev, [])
    }, [articles]);

    const deleteArticle = useCallback((article: Article) => {
        confirm({
            message: `Are you sure you want to delete "${article.title}"?`,
            onOk: () => {
                setArticles((prev) => {
                    return prev.filter(a => a.slug !== article.slug);
                })
            }
        })
    }, []);

    const deleteCategory = useCallback((id: string) => {
        confirm({
            message: `Are you sure you want to delete all articles from "${getCategoryName(id)}" category`,
            onOk: () => {
                setArticles((prev) => {
                    return prev.filter(a => a.postCategoryId !== id)
                })
            }
        })
    }, []);

    const resetArticles = useCallback(() => {
        confirm({
            message: "Are you sure you want to reload all articles?",
            onOk: () => {
                setArticles(initialArticles);
            }
        })
    }, [articles])

    const value = useMemo(() => ({
        articles,
        availableCategoryIds,
        deleteArticle,
        deleteCategory,
        resetArticles
    }), [
        articles,
        availableCategoryIds,
        deleteArticle,
        deleteCategory,
        resetArticles
    ])

    const memoChildren = useMemo(() => children, [children]);

    return (
        <ArticleContext.Provider value={value}>
            {memoChildren}
            {confirmDialog}
        </ArticleContext.Provider>
    )
}

export function useArticles() {
    return useContext(ArticleContext) ?? {} as ArticleValues;
}
