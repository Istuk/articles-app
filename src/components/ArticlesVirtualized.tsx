import { Article } from "@/types/article"
import { ComponentType, CSSProperties, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List, ListChildComponentProps} from 'react-window';
import { ArticleCard } from "./ArticleCard";

interface Props {
    articles: Article[];
}

export const ArticlesVirtualized: React.FC<Props> = (props) => {
    const { articles } = props;

    const listKey = useRef(0);

    const Cell: ComponentType<ListChildComponentProps<any>> = useCallback(({index, style}) => {
        return (
            <div style={style}>
                <ArticleCard article={articles[index]} />
            </div>
        )
    }, [articles]);

    useEffect(() => {
        if (articles) {
            listKey.current++;
        }
    }, [articles])

    return (
        <AutoSizer>
            {({width, height}) => (
                <List
                    key={listKey.current}
                    height={height ?? 0}
                    width={width ?? 0}
                    itemCount={articles.length}
                    itemSize={260}
                >
                    {Cell}
                </List>
            )}
        </AutoSizer>
    );
}
