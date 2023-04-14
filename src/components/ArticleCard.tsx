import { Article, getArticleImageUrl, getArticleUrl } from "@/types/article"
import { getCategoryName } from "@/types/category";
import styled from 'styled-components';
import { useArticles } from "./ArticlesProvider";
import { Interweave } from 'interweave';

interface Props {
    article: Article;
}

const CardContainer = styled.li`
    position: relative;

    display: flex;
    padding: 12px;
    gap: 12px;

    border: 1px solid #a7a7a7;
    border-radius: 12px;

    .show-on-hover {
        display: none;
    }

    &:hover .show-on-hover {
        display: initial;
    }
`

const ImageContainer = styled.div`
    img {
        width: 280px;
        height: 220px;
        object-fit: cover;
    }
`

const Title = styled.h2`
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 16px;
`

const Info = styled.p`
    margin-bottom: 8px;
`

const RemoveButton = styled.button`
    cursor: pointer;

    position: absolute;

    top: 16px;
    right: 16px;
    
    border: 1px solid red;
    border-radius: 12px;
    background-color: white;
    color: red;

    &:hover {
        background-color: #ffd4d4;
    }
`

export const ArticleCard: React.FC<Props> = (props) => {
    const { article } = props;

    const { deleteArticle } = useArticles();

    const categoryName = getCategoryName(article.postCategoryId);

    const postUrl = getArticleUrl(article.slug);
    const thumbnailSrc = getArticleImageUrl(article.postThumbnail);

    const handleRemoveArticle = () => {
        deleteArticle(article)
    }

    return (
        <CardContainer>
            <ImageContainer>
                <img src={thumbnailSrc} alt={article.title} />
            </ImageContainer>
            <div>
                <Title>{article.title}</Title>
                <Info>Category: {categoryName}</Info>
                <Info>Date: {article.date}</Info>
                <Info>
                    <Interweave content={article.excerpt} />
                </Info>
                <a href={postUrl} target="_blank">Read more</a>
            </div>
            <RemoveButton onClick={handleRemoveArticle} className="show-on-hover">Remove</RemoveButton>
        </CardContainer>
    )
}
