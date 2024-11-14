export interface INotice {
    noticeIdx: number;
    title: string;
    content: string;
    author: string;
    createdDate: string;
    updatedDate: string | null;
    fileName: string | null;
    phsycalPath: string | null;
    logicalPath: string | null;
    fileSize: number;
    fileExt: string | null;
}

export interface IPostResponse {
    result: string;
}

export interface INoticeDetail extends INotice {    
    content: string;    
    createdDate: string;    
    fileName: string | null;
    phsycalPath: string | null;
    logicalPath: string | null;
    fileSize: number;
    fileExt: string | null;
}

export interface IDetailResponse {
    detail: INoticeDetail;
}

export interface INoticeListResponse {
    noticeCnt:number;
    notice: INotice[];
}