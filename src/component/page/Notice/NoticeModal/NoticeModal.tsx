import { useRecoilState } from 'recoil';
import { NoticeModalStyled } from './styled';
import { modalState } from '../../../../stores/modalState';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { loginInfoState } from '../../../../stores/userInfo';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import axios, { AxiosResponse } from 'axios';
import { IDetailResponse, INoticeDetail, IPostResponse } from '../../../../models/interface/INotice';
import { postNoticeApi } from '../../../../api/postNoticeApi';
import { Notice } from '../../../../api/api';

interface INoticeModalProps {
    onSuccess: () => void;
    noticeSeq: number;
    setNoticeSeq: (noticeSeq:number | undefined) => void;
}

export const NoticeModal: FC<INoticeModalProps> = ({ onSuccess, noticeSeq, setNoticeSeq }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState); // recoil에 저장된 state
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    const [noticeDetail, setNoticeDetail] = useState<INoticeDetail>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [fileData, setFileData] = useState<File>();
    // const [seq, setSeq] = useState<number>(noticeSeq);
    const title = useRef<HTMLInputElement>();
    const context = useRef<HTMLInputElement>();

    useEffect(() => {
        noticeSeq && searchDetail();
        
        return () => {
            noticeSeq && setNoticeSeq(undefined);
        } //클린업 함수
    },[noticeSeq])

    const searchDetail = async () => {
        const detail = await postNoticeApi<IDetailResponse>(Notice.getDetail,{ noticeSeq });
        if(detail){
            setNoticeDetail(detail.detail);
            const {fileExt, logicalPath} = detail.detail;
            if(fileExt ==='jpg'||fileExt ==='png'||fileExt ==='gif'){
                setImageUrl(logicalPath)
            }else{
                setImageUrl('');
            }
        }
        // if(detail.detail!==null){
        //     setNoticeDetail(detail.detail);
        // }
        // axios.post('/board/noticeDetailBody.do',{noticeSeq}).then((res: AxiosResponse<IDetailResponse>) => {
        //     setNoticeDetail(res.data.detail);
        // });
    }

    const handlerModal = () => {
        setModal(!modal);
    }    

    // const handlerSave = async () => {
    //     const param = {
    //         title: title.current.value,
    //         context: context.current.value,
    //         loginId: userInfo.loginId,
    //     };
    //     const save = await postNoticeApi<IPostResponse>(Notice.getSave,param);
    //     if(save){
    //         save.result === 'success' && onSuccess();
    //         alert('작성성공');
    //     }
    //     axios.post('/board/noticeSaveBody.do',param).then((res: AxiosResponse<IPostResponse>) => {
    //         res.data.result === 'success' && onSuccess();
    //     });
    // };

    const handlerFileSave = async () => {
        const fileForm = new FormData();
        const textData = {
            title: title.current.value,
            context: context.current.value,
            loginId: userInfo.loginId,
        };
        fileData && fileForm.append('file',fileData);
        fileForm.append('text', new Blob([JSON.stringify(textData)], {type: 'application/json' }));
        
        const save = await postNoticeApi<IPostResponse>(Notice.getSaveFile,fileForm);
        if(save){
            save.result === 'success' && onSuccess();
            alert('작성성공');
        }
    }

    // const handlerUpdata = async () => {
    //     const param = {
    //         title: title.current.value,
    //         context: context.current.value,
    //         noticeSeq,
    //     };
    //     const update = await postNoticeApi<IPostResponse>(Notice.getUpdate,param);
    //     if(update){
    //         if(update.result === 'success'){                
    //             alert('수정성공');
    //         }else if(update.result === 'fail'){
    //             alert('수정실패');
    //         }
    //         onSuccess();
    //     }
    //     // axios.post('/board/noticeUpdateBody.do',param).then((res: AxiosResponse<IPostResponse>) => {
    //     //     res.data.result === 'success' && onSuccess();
    //     // });
    // }

    const handlerFileUpdata = async () => {
        const fileForm = new FormData();
        const textData = {
            title: title.current.value,
            context: context.current.value,
            noticeSeq,
        };
        fileData && fileForm.append('file',fileData);
        fileForm.append('text', new Blob([JSON.stringify(textData)], {type: 'application/json' }));
        const update = await postNoticeApi<IPostResponse>(Notice.getFileUpdate,fileForm);
        if(update){
            if(update.result === 'success'){                
                alert('수정성공');
            }else if(update.result === 'fail'){
                alert('수정실패');
            }
            onSuccess();
        }
    }

    const handlerDelete = async () => {
        const noticedelete = await postNoticeApi<IPostResponse>(Notice.getDelete,{noticeSeq});
        // if(noticedelete){
        //     noticedelete.result === 'success' && onSuccess();
        //     alert('삭제성공');
        // }
        if(noticedelete.result === 'success'){
            onSuccess();
            alert('삭제성공');
        }
        if(noticedelete.result === 'fail'){
            alert('이미 삭제된 글입니다.');
            onSuccess();

        }

        // axios.post('/board/noticeDeleteBody.do',{noticeSeq}).then((res) => {
        //     res.data.result === 'success' && onSuccess();
        // });
    }

    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files;
        if(fileInfo?.length > 0){
            const fileInfoSplit = fileInfo[0].name.split('.');
            const fileExtension = fileInfoSplit[1].toLowerCase();
            if(fileExtension ==='jpg'||fileExtension ==='png'||fileExtension ==='gif'){
                setImageUrl(URL.createObjectURL(fileInfo[0]));
                console.log(fileInfo);
            }else {
                setImageUrl('');
            }
            setFileData(fileInfo[0]);
        }
        
    }

    return (
        <NoticeModalStyled>
            <div className="container">
                <label>
                    제목 :<input type="text" ref={title} defaultValue={noticeDetail?.title}></input>
                </label>
                <label>
                    내용 : <input type="text" ref={context} defaultValue={noticeDetail?.content}></input>
                </label>
                파일 :<input type="file" id="fileInput" style={{ display: 'none' }} onChange={handlerFile}></input>
                <label className="img-label" htmlFor="fileInput">
                    파일 첨부하기
                </label>
                <div>
                    {imageUrl ? <div>
                        <label>미리보기</label>
                        <img src={imageUrl} />
                        {fileData?.name || noticeDetail.fileName}
                    </div> : 
                    <div>
                        {fileData?.name}
                    </div>}
                    
                </div>
                <div className={'button-container'}>
                    <button onClick={noticeSeq ? handlerFileUpdata : handlerFileSave}>{noticeSeq ? '수정' : '등록'}</button>
                    {noticeSeq && <button onClick={handlerDelete}>삭제</button>}
                    <button onClick={handlerModal}>나가기</button>
                </div>
            </div>
        </NoticeModalStyled>
    );
};
