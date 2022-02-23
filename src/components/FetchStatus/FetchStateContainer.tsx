import { useEffect, useState } from 'react';
import { distinctUntilChanged, Observable, Subscription } from 'rxjs';

import { FetchStateEmpty } from './components/FetchStateEmpty';
import { FetchStateError } from './components/FetchStateError';
import { FetchStateLoading } from './components/FetchStateLoading';
import { FetchStateModel } from './model/FetchStateModel';

export interface FetchStateInput {
    fetchDataFn: () => Observable<any[]>,
    dataLoadedFn: (item: any[]) => void,
    emptyFn?: () => void,
    messages: {
        errorText: string;
        btnText?: string;
        emptyText: string;
        emptyBtnText?: string;
    }
    children?: any;
}

export const FetchStateContainer: React.FunctionComponent<FetchStateInput> = (props: FetchStateInput) => {

    const observer$ = new FetchStateModel(props.fetchDataFn);
    const [ requestState, setRequestState ] = useState(observer$.getValue());
    let subscription: Subscription;
    
    const loadData = () => {
        subscription = observer$.getState().pipe(
            distinctUntilChanged()
        ).subscribe(data => {
            setRequestState(data);
            if (data.data.length > 0) {
                props.dataLoadedFn(data.data);
            }
        });
        observer$.fetchData();
    }

    useEffect(() => loadData());
    useEffect(() => {
        if (subscription) {
            subscription.unsubscribe();
        }
    }, 
    // @ts-ignore
    [ subscription ]);

    if (requestState.loading) {
        return <FetchStateLoading isLoading={true} ></FetchStateLoading>;
    }

    if (requestState.error) {
        return <FetchStateError 
            hasError={true}  
            errorText={props.messages.errorText}
            btnText={props.messages.btnText}
            fetchDataFn={loadData}
        ></FetchStateError>;
    }

    if (requestState.empty) {
        return <FetchStateEmpty
            isEmpty={true}
            onEmptyData={() => props.emptyFn ? props.emptyFn() : null}
            emptyText={props.messages.emptyText}
            emptyBtnText={props.messages.emptyBtnText}
        ></FetchStateEmpty>;
    }

    return <>{props.children}</>;
}
