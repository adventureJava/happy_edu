import { ContentBox } from '../component/common/ContentBox/ContentBox';
import { NoticeMain } from '../component/page/Notice/NoticeMain/NoticeMain';
import { NoticeSearch } from '../component/page/Notice/NoticeSearch/NoticeSearch';
import { NoticeProvider } from '../api/provider/NoticeProvider';



export const Notice = () => {
    return (
        <>
        <NoticeProvider>
            <ContentBox>공지사항</ContentBox>
            <NoticeSearch />
            <NoticeMain />
        </NoticeProvider>
        </>
    );
};
