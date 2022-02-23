import { BehaviorSubject, Observable } from "rxjs";

interface IFetchStateModel<T> {
    loading: boolean;
    empty: boolean;
    error: boolean;
    data: T[];
    err: any;
}

const initialState = { loading: false, empty: true, error: false, data: [], err: null};

export class FetchStateModel<T> {
    private state = new BehaviorSubject<IFetchStateModel<T>> (initialState);

    constructor(private fetchFn: () => Observable<T[]>) {}
    
    public fetchData = () => {
        if (this.state.value.loading) {
            return;
        }
        this.state.next({ ...initialState, loading: true });
        this.fetchFn().subscribe({
            next: (data: T[]) => this.state.next({ ...initialState, data, empty: data.length === 0 }),
            error: (err: any) => this.state.next({ ...initialState, error: true, err })
        });
        
    };

    public getState = () => this.state.asObservable();
    public getValue = () => this.state.getValue();
}