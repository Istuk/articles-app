import { Article } from "@/types/article";
import Fuse from "fuse.js";

export function getFilteredArticles(articles: Article[], term = '', categoryId?: string) {
    const options = {
        keys: ['title', 'excerpt'],
        threshold: 0.3
    }

    const articlesInCategory = categoryId ? articles.filter(article => article.postCategoryId == categoryId) : articles;

    if (term === '') {
        return articlesInCategory;
    }

    const fuse = new Fuse(articlesInCategory, options);

    const result = fuse.search(term);

    return result.map(item => item.item);
}
