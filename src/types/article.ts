
const ARTICLE_URL = 'https://react-challenge.human.hr/news';
const ARTICLE_IMAGES_URL = ' https://react-challenge.human.hr/assets/images/post_img';

export interface Article {
    title: string;
    slug: string;
    postCategoryId: string;
    postImage: string;
    postThumbnail: string;
    excerpt: string;
    date: string;
}

export function getArticleUrl(slug: string) {
    return `${ARTICLE_URL}/${slug}`;
}

export function getArticleImageUrl(slug: string) {
    return `${ARTICLE_IMAGES_URL}/${slug}`;
}
