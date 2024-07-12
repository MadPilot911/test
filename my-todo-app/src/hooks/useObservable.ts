import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useObservable = <T>(observable: Observable<T>): T | null => {
	const [state, setState] = useState<T | null>(null);

	useEffect(() => {
		const subscription = observable.subscribe(setState);
		return () => subscription.unsubscribe();
	}, [observable]);

	return state;
};
